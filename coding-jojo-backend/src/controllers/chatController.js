const Chat = require('../models/Chat');
const User = require('../models/User');
const Course = require('../models/Course');
const Notification = require('../models/Notification');
const { emitToChat, emitToUser } = require('../socket');

// Get all chats for a user
const getUserChats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const chats = await Chat.find({
      'participants.user': userId,
      isActive: true
    })
    .populate('participants.user', 'name email avatar lastSeen')
    .populate('course', 'title thumbnail')
    .populate({
      path: 'messages',
      options: { sort: { timestamp: -1 }, limit: 1 },
      populate: {
        path: 'sender',
        select: 'name avatar'
      }
    })
    .sort({ lastActivity: -1 });

    // Calculate unread counts
    const chatsWithUnread = chats.map(chat => {
      const unreadCount = chat.metadata.unreadCount.get(userId) || 0;
      return {
        ...chat.toObject(),
        unreadCount
      };
    });

    res.json({
      success: true,
      data: chatsWithUnread
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get chat by ID with messages
const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;
    const { page = 1, limit = 50 } = req.query;

    const chat = await Chat.findById(chatId)
      .populate('participants.user', 'name email avatar lastSeen')
      .populate('course', 'title thumbnail');

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(p => 
      p.user._id.toString() === userId
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this chat'
      });
    }

    // Get paginated messages
    const skip = (page - 1) * limit;
    const messages = chat.messages
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(skip, skip + parseInt(limit))
      .reverse();

    // Mark chat as read
    await chat.markAsRead(userId);

    res.json({
      success: true,
      data: {
        ...chat.toObject(),
        messages,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: chat.messages.length,
          pages: Math.ceil(chat.messages.length / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create new chat
const createChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { participantIds, chatType, courseId, title, description } = req.body;

    // Validate participants
    const participants = await User.find({ 
      _id: { $in: participantIds } 
    });

    if (participants.length !== participantIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Some participants not found'
      });
    }

    // Create participant objects
    const chatParticipants = [
      {
        user: userId,
        userModel: req.user.role === 'instructor' ? 'Instructor' : 'User',
        role: req.user.role === 'instructor' ? 'instructor' : 'student'
      },
      ...participants.map(p => ({
        user: p._id,
        userModel: p.role === 'instructor' ? 'Instructor' : 'User',
        role: p.role === 'instructor' ? 'instructor' : 'student'
      }))
    ];

    const chat = new Chat({
      participants: chatParticipants,
      chatType,
      course: courseId,
      title,
      description
    });

    await chat.save();
    await chat.populate('participants.user', 'name email avatar');
    
    // Notify participants
    for (const participant of participantIds) {
      if (participant !== userId) {
        await Notification.createNotification({
          recipient: participant,
          sender: userId,
          senderModel: req.user.role === 'instructor' ? 'Instructor' : 'User',
          type: 'message_received',
          title: 'New Chat Created',
          message: `${req.user.name} started a new ${chatType} chat`,
          data: {
            chatId: chat._id,
            url: `/chat/${chat._id}`
          }
        });
      }
    }

    res.status(201).json({
      success: true,
      data: chat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send message to chat
const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;
    const { content, messageType = 'text', attachments = [] } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(p => 
      p.user.toString() === userId
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send messages'
      });
    }

    const message = await chat.addMessage({
      sender: userId,
      senderModel: req.user.role === 'instructor' ? 'Instructor' : 'User',
      content,
      messageType,
      attachments
    });

    // Emit real-time message
    emitToChat(chatId, 'new_message', {
      chatId,
      message: {
        ...message.toObject(),
        sender: {
          _id: userId,
          name: req.user.name,
          avatar: req.user.avatar
        }
      }
    });

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark chat as read
const markChatAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    await chat.markAsRead(userId);

    res.json({
      success: true,
      message: 'Chat marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get course-specific chats
const getCourseChats = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    // Check if user has access to course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const chats = await Chat.find({
      course: courseId,
      'participants.user': userId,
      isActive: true
    })
    .populate('participants.user', 'name email avatar')
    .populate({
      path: 'messages',
      options: { sort: { timestamp: -1 }, limit: 1 },
      populate: {
        path: 'sender',
        select: 'name avatar'
      }
    })
    .sort({ lastActivity: -1 });

    res.json({
      success: true,
      data: chats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search messages in chat
const searchMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { query, messageType, dateFrom, dateTo } = req.query;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(p => 
      p.user.toString() === userId
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to search this chat'
      });
    }

    let messages = chat.messages;

    // Filter by search query
    if (query) {
      messages = messages.filter(msg => 
        msg.content.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by message type
    if (messageType) {
      messages = messages.filter(msg => msg.messageType === messageType);
    }

    // Filter by date range
    if (dateFrom) {
      messages = messages.filter(msg => 
        msg.timestamp >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      messages = messages.filter(msg => 
        msg.timestamp <= new Date(dateTo)
      );
    }

    res.json({
      success: true,
      data: messages.slice(0, 100) // Limit results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete chat
const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant and has permission to delete
    const participant = chat.participants.find(p => 
      p.user.toString() === userId
    );

    if (!participant || (participant.role !== 'instructor' && participant.role !== 'admin')) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this chat'
      });
    }

    chat.isActive = false;
    await chat.save();

    res.json({
      success: true,
      message: 'Chat deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUserChats,
  getChatById,
  createChat,
  sendMessage,
  markChatAsRead,
  getCourseChats,
  searchMessages,
  deleteChat
};
