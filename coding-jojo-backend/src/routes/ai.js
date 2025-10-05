const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  generateCourseOutline,
  generateLessonContent,
  generateQuizQuestions,
  analyzeCoursePerformance,
  generateStudentFeedback,
  generateMarketingContent
} = require('../controllers/aiController');

// AI-powered course creation and optimization
router.post('/course-outline', protect, authorize('instructor'), generateCourseOutline);
router.post('/lesson-content', protect, authorize('instructor'), generateLessonContent);
router.post('/quiz-questions', protect, authorize('instructor'), generateQuizQuestions);
router.post('/course-analysis', protect, authorize('instructor'), analyzeCoursePerformance);
router.post('/student-feedback', protect, authorize('instructor'), generateStudentFeedback);
router.post('/marketing-content', protect, authorize('instructor'), generateMarketingContent);

module.exports = router;
