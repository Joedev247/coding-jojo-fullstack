const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderModel: {
    type: String,
    enum: ['User', 'Instructor'],
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'video', 'audio'],
    default: 'text'
  },
  attachments: [{
    filename: String,
    url: String,
    size: Number,
    mimeType: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
});

const chatSchema = new mongoose.Schema({
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participants.userModel',
      required: true
    },
    userModel: {
      type: String,
      enum: ['User', 'Instructor'],
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      required: true
    }
  }],
  chatType: {
    type: String,
    enum: ['direct', 'group', 'course', 'support'],
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  title: String,
  description: String,
  messages: [messageSchema],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metadata: {
    totalMessages: {
      type: Number,
      default: 0
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: new Map()
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
chatSchema.index({ participants: 1 });
chatSchema.index({ course: 1 });
chatSchema.index({ chatType: 1 });
chatSchema.index({ lastActivity: -1 });
chatSchema.index({ 'messages.timestamp': -1 });

// Virtual for unread messages count
chatSchema.virtual('unreadMessagesCount').get(function() {
  return this.metadata.unreadCount || new Map();
});

// Methods
chatSchema.methods.addMessage = async function(messageData) {
  const message = {
    ...messageData,
    timestamp: new Date()
  };
  
  this.messages.push(message);
  this.lastMessage = message._id;
  this.lastActivity = new Date();
  this.metadata.totalMessages += 1;
  
  // Update unread counts for other participants
  this.participants.forEach(participant => {
    if (participant.user.toString() !== messageData.sender.toString()) {
      const currentCount = this.metadata.unreadCount.get(participant.user.toString()) || 0;
      this.metadata.unreadCount.set(participant.user.toString(), currentCount + 1);
    }
  });
  
  await this.save();
  return message;
};

chatSchema.methods.markAsRead = async function(userId) {
  this.metadata.unreadCount.set(userId.toString(), 0);
  
  // Mark messages as read
  this.messages.forEach(message => {
    const readIndex = message.readBy.findIndex(r => r.user.toString() === userId.toString());
    if (readIndex === -1) {
      message.readBy.push({ user: userId, readAt: new Date() });
    }
  });
  
  await this.save();
};

module.exports = mongoose.model('Chat', chatSchema);
