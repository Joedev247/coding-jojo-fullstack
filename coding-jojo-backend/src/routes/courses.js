const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadLessonVideo,
  enrollInCourse,
  getFeaturedCourses,
  getCategories,
  rateCourse,
  likeCourse,
  addComment,
  getCourseComments,
  likeComment,
  addReply,
  shareCourse
} = require('../controllers/courseController');
const { auth, authorize } = require('../middleware/auth');
const {
  uploadCourseFiles,
  uploadLessonVideo: uploadLessonVideoMiddleware
} = require('../middleware/upload');

// Public routes
router.get('/', getCourses);
router.get('/featured', getFeaturedCourses);
router.get('/categories', getCategories);
router.get('/:id', getCourse);

// Private routes - Course Management (Instructor/Admin only)
router.post('/', auth, authorize('instructor', 'admin'), uploadCourseFiles, createCourse);
router.put('/:id', auth, authorize('instructor', 'admin'), uploadCourseFiles, updateCourse);
router.delete('/:id', auth, authorize('instructor', 'admin'), deleteCourse);

// Private routes - Video Upload
router.post('/:courseId/lessons/:lessonId/video', 
  auth, 
  authorize('instructor', 'admin'), 
  uploadLessonVideoMiddleware, 
  uploadLessonVideo
);

// Private routes - Student enrollment
router.post('/:id/enroll', auth, enrollInCourse);

// Private route - Rate a course
router.post('/:id/rate', auth, rateCourse);

// Social interaction routes
router.post('/:id/like', auth, likeCourse);
router.post('/:id/share', shareCourse); // Public route for sharing
router.post('/:id/comments', auth, addComment);
router.get('/:id/comments', getCourseComments);
router.post('/:id/comments/:commentId/like', auth, likeComment);
router.post('/:id/comments/:commentId/reply', auth, addReply);

module.exports = router;
