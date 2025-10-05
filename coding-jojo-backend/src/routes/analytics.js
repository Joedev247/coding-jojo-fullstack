const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getTeacherAnalytics,
  getCourseAnalytics,
  getTeacherGamification
} = require('../controllers/analyticsController');

// Teacher analytics and reporting
router.get('/teacher-overview', protect, authorize('instructor'), getTeacherAnalytics);
router.get('/course/:courseId', protect, authorize('instructor'), getCourseAnalytics);

// Gamification and progress tracking
router.get('/gamification', protect, authorize('instructor'), getTeacherGamification);

module.exports = router;
