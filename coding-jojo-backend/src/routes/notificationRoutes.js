const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  getNotificationById,
  markAsRead,
  markAllAsRead,
  archiveNotification,
  deleteNotification,
  getUnreadCount,
  createNotification,
  getNotificationStats
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

// Apply authentication to all routes
router.use(protect);

// Get user notifications
router.get('/', getUserNotifications);

// Get unread count
router.get('/unread-count', getUnreadCount);

// Get notification stats (admin only)
router.get('/stats', getNotificationStats);

// Get specific notification
router.get('/:notificationId', getNotificationById);

// Create notification (admin/instructor only)
router.post('/', createNotification);

// Mark notification as read
router.put('/:notificationId/read', markAsRead);

// Mark all notifications as read
router.put('/read-all', markAllAsRead);

// Archive notification
router.put('/:notificationId/archive', archiveNotification);

// Delete notification
router.delete('/:notificationId', deleteNotification);

module.exports = router;
