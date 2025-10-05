const express = require('express');
const router = express.Router();
const {
  uploadCourseThumbnail,
  uploadCourseVideo,
  createCourseWithFiles,
  deleteUploadedFile
} = require('../controllers/uploadController');
const { protect, authorize } = require('../middleware/auth');

// @desc    Upload course thumbnail
// @route   POST /api/upload/course-thumbnail
// @access  Private (Instructor)
router.post('/course-thumbnail', protect, authorize('instructor'), uploadCourseThumbnail);

// @desc    Upload course video
// @route   POST /api/upload/course-video
// @access  Private (Instructor)
router.post('/course-video', protect, authorize('instructor'), uploadCourseVideo);

// @desc    Create course with uploaded files
// @route   POST /api/upload/create-course
// @access  Private (Instructor)
router.post('/create-course', protect, authorize('instructor'), createCourseWithFiles);

// @desc    Delete uploaded file
// @route   DELETE /api/upload/delete/:publicId
// @access  Private
router.delete('/delete/:publicId', protect, deleteUploadedFile);

module.exports = router;
