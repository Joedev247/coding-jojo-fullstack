const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  type: {
    type: String,
    enum: ['direct', 'course_announcement', 'assignment_feedback', 'system'],
    default: 'direct'
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: Date,
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'archived'],
    default: 'sent'
  },
  attachments: [{
    name: String,
    url: String,
    size: Number,
    type: String
  }],
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }
}, {
  timestamps: true
});

// Indexes
MessageSchema.index({ sender: 1, createdAt: -1 });
MessageSchema.index({ recipient: 1, createdAt: -1 });
MessageSchema.index({ course: 1, createdAt: -1 });
MessageSchema.index({ read: 1, recipient: 1 });
MessageSchema.index({ thread: 1, createdAt: 1 });

// Methods
MessageSchema.methods.markAsRead = function() {
  this.read = true;
  this.readAt = new Date();
  this.status = 'read';
  return this.save();
};

module.exports = mongoose.model('Message', MessageSchema);
