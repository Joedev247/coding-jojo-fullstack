const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'senderModel'
  },
  senderModel: {
    type: String,
    enum: ['User', 'Instructor', 'System']
  },
  type: {
    type: String,
    enum: [
      'course_update',
      'new_lesson',
      'assignment_due',
      'certificate_earned',
      'message_received',
      'course_enrollment',
      'payment_received',
      'live_session_starting',
      'course_completed',
      'review_received',
      'system_announcement',
      'discount_available',
      'course_approved',
      'course_rejected'
    ],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  data: {
    courseId: mongoose.Schema.Types.ObjectId,
    lessonId: mongoose.Schema.Types.ObjectId,
    assignmentId: mongoose.Schema.Types.ObjectId,
    certificateId: mongoose.Schema.Types.ObjectId,
    chatId: mongoose.Schema.Types.ObjectId,
    paymentId: mongoose.Schema.Types.ObjectId,
    liveSessionId: mongoose.Schema.Types.ObjectId,
    url: String,
    action: String,
    metadata: mongoose.Schema.Types.Mixed
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'archived'],
    default: 'unread'
  },
  readAt: Date,
  scheduledFor: Date,
  expiresAt: Date,
  channels: [{
    type: String,
    enum: ['in_app', 'email', 'sms', 'push'],
    default: 'in_app'
  }],
  deliveryStatus: {
    in_app: {
      delivered: { type: Boolean, default: false },
      deliveredAt: Date
    },
    email: {
      delivered: { type: Boolean, default: false },
      deliveredAt: Date,
      emailId: String
    },
    sms: {
      delivered: { type: Boolean, default: false },
      deliveredAt: Date,
      messageId: String
    },
    push: {
      delivered: { type: Boolean, default: false },
      deliveredAt: Date,
      pushId: String
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
notificationSchema.index({ recipient: 1, status: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ scheduledFor: 1 });
notificationSchema.index({ expiresAt: 1 });

// TTL for expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Methods
notificationSchema.methods.markAsRead = async function() {
  this.status = 'read';
  this.readAt = new Date();
  return await this.save();
};

notificationSchema.methods.archive = async function() {
  this.status = 'archived';
  return await this.save();
};

// Static methods
notificationSchema.statics.createNotification = async function(notificationData) {
  const notification = new this(notificationData);
  await notification.save();
  
  // Emit real-time notification
  try {
    const io = require('../socket');
    if (io) {
      io.to(`user_${notification.recipient}`).emit('new_notification', {
        id: notification._id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data,
        priority: notification.priority,
        createdAt: notification.createdAt
      });
    }
  } catch (error) {
    console.log('Socket not available for real-time notification');
  }
  
  return notification;
};

notificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({
    recipient: userId,
    status: 'unread'
  });
};

notificationSchema.statics.markAllAsRead = async function(userId) {
  return await this.updateMany(
    { recipient: userId, status: 'unread' },
    { status: 'read', readAt: new Date() }
  );
};

module.exports = mongoose.model('Notification', notificationSchema);
