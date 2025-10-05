const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getTeacherMessages,
  sendMessage,
  sendBulkMessage,
  createCourseDiscussion,
  scheduleLiveSession,
  createAssignment,
  sendStudentFeedback
} = require('../controllers/communicationController');

// Messaging and communication
router.get('/messages', protect, authorize('instructor'), getTeacherMessages);
router.post('/messages', protect, authorize('instructor'), sendMessage);
router.post('/messages/bulk', protect, authorize('instructor'), sendBulkMessage);

// Course collaboration features
router.post('/courses/:courseId/discussions', protect, authorize('instructor'), createCourseDiscussion);
router.post('/courses/:courseId/live-sessions', protect, authorize('instructor'), scheduleLiveSession);
router.post('/courses/:courseId/assignments', protect, authorize('instructor'), createAssignment);

// Student feedback and engagement
router.post('/students/:studentId/feedback', protect, authorize('instructor'), sendStudentFeedback);

module.exports = router;
