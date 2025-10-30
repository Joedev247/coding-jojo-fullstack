const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Chat = require('./models/Chat');
const Notification = require('./models/Notification');

let io;

// Socket authentication middleware
const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return next(new Error('Authentication token required'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return next(new Error('User not found'));
    }

    socket.userId = user._id.toString();
    socket.userType = user.role;
    socket.user = user;
    
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
};

// Online users tracking
const onlineUsers = new Map();

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "https://codingjojo.vercel.app",
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  // Authentication middleware
  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.userId})`);
    
    // Join user to their personal room
    socket.join(`user_${socket.userId}`);
    
    // Track online status
    onlineUsers.set(socket.userId, {
      socketId: socket.id,
      user: socket.user,
      lastSeen: new Date(),
      status: 'online'
    });

    // Broadcast online status
    socket.broadcast.emit('user_online', {
      userId: socket.userId,
      userName: socket.user.name,
      status: 'online'
    });

    // Handle joining chat rooms
    socket.on('join_chat', async (chatId) => {
      try {
        const chat = await Chat.findById(chatId)
          .populate('participants.user', 'name email avatar');
        
        if (!chat) {
          return socket.emit('error', { message: 'Chat not found' });
        }

        // Check if user is participant
        const isParticipant = chat.participants.some(p => 
          p.user._id.toString() === socket.userId
        );

        if (!isParticipant) {
          return socket.emit('error', { message: 'Not authorized to join this chat' });
        }

        socket.join(`chat_${chatId}`);
        socket.currentChat = chatId;
        
        // Mark messages as read
        await chat.markAsRead(socket.userId);
        
        socket.emit('chat_joined', {
          chatId,
          messages: chat.messages.slice(-50), // Last 50 messages
          participants: chat.participants
        });

      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Handle leaving chat rooms
    socket.on('leave_chat', (chatId) => {
      socket.leave(`chat_${chatId}`);
      socket.currentChat = null;
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
      try {
        const { chatId, content, messageType = 'text', attachments = [] } = data;
        
        const chat = await Chat.findById(chatId);
        if (!chat) {
          return socket.emit('error', { message: 'Chat not found' });
        }

        // Check if user is participant
        const isParticipant = chat.participants.some(p => 
          p.user.toString() === socket.userId
        );

        if (!isParticipant) {
          return socket.emit('error', { message: 'Not authorized to send messages' });
        }

        const message = await chat.addMessage({
          sender: socket.userId,
          senderModel: socket.userType === 'instructor' ? 'Instructor' : 'User',
          content,
          messageType,
          attachments
        });

        // Emit to chat participants
        io.to(`chat_${chatId}`).emit('new_message', {
          chatId,
          message: {
            ...message.toObject(),
            sender: {
              _id: socket.userId,
              name: socket.user.name,
              avatar: socket.user.avatar
            }
          }
        });

        // Send notifications to offline participants
        const offlineParticipants = chat.participants.filter(p => 
          p.user.toString() !== socket.userId && 
          !onlineUsers.has(p.user.toString())
        );

        for (const participant of offlineParticipants) {
          await Notification.createNotification({
            recipient: participant.user,
            sender: socket.userId,
            senderModel: socket.userType === 'instructor' ? 'Instructor' : 'User',
            type: 'message_received',
            title: 'New Message',
            message: `${socket.user.name}: ${content.substring(0, 100)}...`,
            data: {
              chatId,
              url: `/chat/${chatId}`
            },
            channels: ['in_app', 'email', 'push']
          });
        }

      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', (chatId) => {
      socket.to(`chat_${chatId}`).emit('user_typing', {
        userId: socket.userId,
        userName: socket.user.name,
        isTyping: true
      });
    });

    socket.on('typing_stop', (chatId) => {
      socket.to(`chat_${chatId}`).emit('user_typing', {
        userId: socket.userId,
        userName: socket.user.name,
        isTyping: false
      });
    });

    // Handle video comments
    socket.on('join_video_room', (videoId) => {
      socket.join(`video_${videoId}`);
    });

    socket.on('leave_video_room', (videoId) => {
      socket.leave(`video_${videoId}`);
    });

    socket.on('video_comment', async (data) => {
      const { videoId, lessonId, timestamp, comment } = data;
      
      // Broadcast comment to video room
      io.to(`video_${videoId}`).emit('new_video_comment', {
        id: `comment_${Date.now()}`,
        videoId,
        lessonId,
        timestamp,
        comment,
        user: {
          _id: socket.userId,
          name: socket.user.name,
          avatar: socket.user.avatar
        },
        createdAt: new Date()
      });
    });

    // Handle live session events
    socket.on('join_live_session', (sessionId) => {
      socket.join(`live_${sessionId}`);
      
      // Notify others about new participant
      socket.to(`live_${sessionId}`).emit('participant_joined', {
        userId: socket.userId,
        userName: socket.user.name,
        avatar: socket.user.avatar,
        joinedAt: new Date()
      });
    });

    socket.on('leave_live_session', (sessionId) => {
      socket.leave(`live_${sessionId}`);
      
      // Notify others about participant leaving
      socket.to(`live_${sessionId}`).emit('participant_left', {
        userId: socket.userId,
        userName: socket.user.name,
        leftAt: new Date()
      });
    });

    // Handle course progress updates
    socket.on('progress_update', (data) => {
      const { courseId, lessonId, progress } = data;
      
      // Broadcast progress to instructors
      socket.to(`course_instructors_${courseId}`).emit('student_progress', {
        studentId: socket.userId,
        studentName: socket.user.name,
        lessonId,
        progress,
        timestamp: new Date()
      });
    });

    // Handle notifications
    socket.on('mark_notification_read', async (notificationId) => {
      try {
        await Notification.findByIdAndUpdate(notificationId, {
          status: 'read',
          readAt: new Date()
        });
        
        socket.emit('notification_marked_read', notificationId);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('get_unread_notifications', async () => {
      try {
        const unreadCount = await Notification.getUnreadCount(socket.userId);
        socket.emit('unread_notifications_count', unreadCount);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.name} (${socket.userId})`);
      
      // Update online status
      onlineUsers.set(socket.userId, {
        ...onlineUsers.get(socket.userId),
        status: 'offline',
        lastSeen: new Date()
      });

      // Broadcast offline status
      socket.broadcast.emit('user_offline', {
        userId: socket.userId,
        userName: socket.user.name,
        status: 'offline',
        lastSeen: new Date()
      });

      // Remove from typing indicators
      if (socket.currentChat) {
        socket.to(`chat_${socket.currentChat}`).emit('user_typing', {
          userId: socket.userId,
          userName: socket.user.name,
          isTyping: false
        });
      }

      // Clean up after 5 minutes
      setTimeout(() => {
        if (onlineUsers.get(socket.userId)?.socketId === socket.id) {
          onlineUsers.delete(socket.userId);
        }
      }, 5 * 60 * 1000);
    });

    // Send initial data
    socket.emit('connected', {
      userId: socket.userId,
      message: 'Connected successfully'
    });

    // Send unread notifications count
    Notification.getUnreadCount(socket.userId).then(count => {
      socket.emit('unread_notifications_count', count);
    });
  });

  return io;
};

// Helper functions
const getOnlineUsers = () => {
  return Array.from(onlineUsers.values());
};

const getOnlineUserIds = () => {
  return Array.from(onlineUsers.keys());
};

const emitToUser = (userId, event, data) => {
  if (io) {
    io.to(`user_${userId}`).emit(event, data);
  }
};

const emitToChat = (chatId, event, data) => {
  if (io) {
    io.to(`chat_${chatId}`).emit(event, data);
  }
};

const emitToLiveSession = (sessionId, event, data) => {
  if (io) {
    io.to(`live_${sessionId}`).emit(event, data);
  }
};

module.exports = {
  initializeSocket,
  getOnlineUsers,
  getOnlineUserIds,
  emitToUser,
  emitToChat,
  emitToLiveSession,
  io: () => io
};
