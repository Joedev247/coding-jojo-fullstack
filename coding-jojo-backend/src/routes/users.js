const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  upgradeToPremium,
  getUserCourses,
  getNotifications,
  markNotificationRead
} = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// All user routes require authentication
router.use(auth);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/upload-profile-picture', uploadProfilePicture);
router.post('/upgrade-premium', upgradeToPremium);
router.get('/courses', getUserCourses);
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationRead);

module.exports = router;
