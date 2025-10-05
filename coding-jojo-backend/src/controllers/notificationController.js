const Notification = require('../models/Notification');
const { emitToUser } = require('../socket');

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      page = 1, 
      limit = 20, 
      status, 
      type, 
      priority 
    } = req.query;

    const query = { recipient: userId };
    
    if (status) query.status = status;
    if (type) query.type = type;
    if (priority) query.priority = priority;

    const notifications = await Notification.find(query)
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.getUnreadCount(userId);

    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        },
        unreadCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get notification by ID
const getNotificationById = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId
    }).populate('sender', 'name avatar');

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.markAsRead();

    // Emit real-time update
    emitToUser(userId, 'notification_read', {
      notificationId,
      unreadCount: await Notification.getUnreadCount(userId)
    });

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    await Notification.markAllAsRead(userId);

    // Emit real-time update
    emitToUser(userId, 'all_notifications_read', {
      unreadCount: 0
    });

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Archive notification
const archiveNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: userId
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.archive();

    res.json({
      success: true,
      message: 'Notification archived'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id;

    const result = await Notification.deleteOne({
      _id: notificationId,
      recipient: userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await Notification.getUnreadCount(userId);

    res.json({
      success: true,
      data: { unreadCount: count }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create notification (admin/system only)
const createNotification = async (req, res) => {
  try {
    // Check if user has permission (admin/instructor)
    if (req.user.role !== 'admin' && req.user.role !== 'instructor') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create notifications'
      });
    }

    const {
      recipients, // Array of user IDs or 'all'
      type,
      title,
      message,
      data,
      priority = 'medium',
      scheduledFor,
      expiresAt,
      channels = ['in_app']
    } = req.body;

    let recipientIds = [];

    if (recipients === 'all') {
      const User = require('../models/User');
      const allUsers = await User.find({ role: 'student' }, '_id');
      recipientIds = allUsers.map(u => u._id);
    } else if (Array.isArray(recipients)) {
      recipientIds = recipients;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid recipients format'
      });
    }

    const notifications = [];

    for (const recipientId of recipientIds) {
      const notification = await Notification.createNotification({
        recipient: recipientId,
        sender: req.user.id,
        senderModel: req.user.role === 'instructor' ? 'Instructor' : 'User',
        type,
        title,
        message,
        data,
        priority,
        scheduledFor,
        expiresAt,
        channels
      });

      notifications.push(notification);
    }

    res.status(201).json({
      success: true,
      data: notifications,
      message: `${notifications.length} notifications created`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get notification stats (admin only)
const getNotificationStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const stats = await Notification.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const typeStats = await Notification.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Notification.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        statusStats: stats,
        typeStats,
        priorityStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getUserNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  archiveNotification,
  deleteNotification,
  getUnreadCount,
  createNotification,
  getNotificationStats
};
