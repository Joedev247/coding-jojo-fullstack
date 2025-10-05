const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  getAllCourses,
  updateUserStatus,
  updateCourseStatus,
  createCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getUser,
  updateUser,
  deleteUser,
  bulkPublishCourses,
  debugGetAllCourses,
  // Community management
  createAdminPost,
  createAdminEvent,
  getAdminCommunityStats,
  // Instructor management
  getAllInstructors,
  getInstructorDetails,
  getInstructorTransactions,
  getAllInstructorEarnings,
  getInstructorMonthlyEarnings,
  processInstructorPayout,
  getInstructorPayoutHistory,
  // Education certificate verification
  getAllInstructorVerifications,
  getInstructorVerificationDetails,
  verifyEducationCertificate,
  requestAdditionalEducationCertificates,
  approveInstructorVerification
} = require('../controllers/adminController');

// Teacher verification functions
const {
  getPendingApplications,
  getTeacherVerification,
  reviewTeacherApplication
} = require('../controllers/teacherController');

// Admin verification functions
const {
  getAllVerifications,
  getVerificationById,
  approveVerification,
  rejectVerification,
  requestMoreInfo,
  getVerificationStats,
  suspendVerification
} = require('../controllers/adminVerificationController');

const { adminAuth } = require('../middleware/auth');

// Add upload middleware for admin course creation
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage for admin course thumbnails
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'coding-jojo/admin-course-thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 800, height: 450, crop: 'fill' },
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ],
  },
});

// Create multer instance for images
const imageUpload = multer({ 
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// All admin routes require admin authentication
router.use(adminAuth);

// Dashboard stats
router.get('/stats', getAdminStats);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.put('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

// Course management routes
router.get('/courses', getAllCourses);
router.get('/courses/debug', debugGetAllCourses);
router.post('/courses', imageUpload.single('thumbnail'), createCourse);
router.post('/courses/bulk-publish', bulkPublishCourses);
router.get('/courses/:id', getCourse);
router.put('/courses/:id', imageUpload.single('thumbnail'), updateCourse);
router.put('/courses/:id/status', updateCourseStatus);
router.delete('/courses/:id', deleteCourse);

// Instructor Verification Management Routes
router.get('/verifications/stats', getVerificationStats);
router.get('/verifications', getAllVerifications);
router.get('/verifications/:id', getVerificationById);
router.put('/verifications/:id/approve', approveVerification);
router.put('/verifications/:id/reject', rejectVerification);
router.put('/verifications/:id/request-info', requestMoreInfo);
router.put('/verifications/:id/suspend', suspendVerification);

// Legacy teacher application routes (keep for backward compatibility)
router.get('/teacher/applications', getPendingApplications);
router.get('/teacher/applications/:id', getTeacherVerification);
router.put('/teacher/applications/:id', reviewTeacherApplication);

// Community management routes
router.get('/community/stats', getAdminCommunityStats);
router.post('/community/posts', createAdminPost);
router.post('/community/events', createAdminEvent);

// Instructor Management Routes
router.get('/instructors', getAllInstructors);
router.get('/instructors/:id', getInstructorDetails);
router.get('/instructors/:id/transactions', getInstructorTransactions);
router.post('/instructors/:id/payout', processInstructorPayout);
router.get('/instructors/:id/payouts', getInstructorPayoutHistory);

// Earnings Management Routes
router.get('/earnings', getAllInstructorEarnings);
router.get('/earnings/monthly', getInstructorMonthlyEarnings);

// Teacher verification routes
router.get('/teachers/pending', getPendingApplications);
router.get('/teachers/:id/verification', getTeacherVerification);
router.put('/teachers/:id/review', reviewTeacherApplication);

// Education Certificate Verification Routes
router.get('/instructor-verifications', getAllInstructorVerifications);
router.get('/instructor-verifications/:id', getInstructorVerificationDetails);
router.put('/instructor-verifications/:verificationId/certificates/:certificateId/verify', verifyEducationCertificate);
router.post('/instructor-verifications/:verificationId/request-additional-certificates', requestAdditionalEducationCertificates);
router.put('/instructor-verifications/:id/approve', approveInstructorVerification);

module.exports = router;
