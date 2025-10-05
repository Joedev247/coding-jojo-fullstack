const express = require('express');
const router = express.Router();
const {
  registerTeacher,
  uploadVerificationDocuments,
  loginTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  uploadDocuments,
  getTeacherDashboard,
  getTeacherCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
  getCourseStudents,
  getCourseAnalytics,
  getEarnings,
  updateBankDetails,
  requestPayout,
  getPayoutHistory,
  updateAvailability,
  getTeacherReviews,
  respondToReview,
  getCommunications,
  sendMessage,
  scheduleSession,
  getUpcomingSessions,
  bulkUploadCourses,
  exportCourseData,
  getTeacherStats,
  updateTeacherSettings,
  getStudentFeedback,
  createAssignment,
  gradeAssignment,
  createQuiz,
  createCertificate,
  uploadVideo,
  uploadImage,
  approveTeacher,
  rejectTeacher,
  verifyTeacher
} = require('../controllers/teacherController');

// Import verification controller
const {
  initializeVerification,
  sendEmailVerificationCode,
  verifyEmailCode,
  sendPhoneVerificationCode,
  verifyPhoneCode,
  submitPersonalInfo,
  uploadIdDocuments,
  uploadSelfie,
  submitProfessionalInfo,
  getVerificationStatus,
  submitForReview,
  resetVerificationLimits,
  uploadEducationCertificate,
  getEducationCertificates,
  removeEducationCertificate,
  updateEducationCertificate
} = require('../controllers/verificationController');

// Import verification upload middleware
const {
  upload: verificationUpload,
  handleMulterError,
  cleanupFiles,
  validateImage
} = require('../middleware/verificationUpload');

const { auth: protect, authorize } = require('../middleware/auth');

// Minimal multer setup for file handling
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tempDir = path.join(__dirname, '../../uploads/tmp');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, tempDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

// FIXED: Use proper Cloudinary multer storage instead of local storage
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage for images (thumbnails)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'coding-jojo/course-thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 800, height: 450, crop: 'fill' },
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ],
  },
});

// Cloudinary storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'coding-jojo/course-videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ],
  },
});

// Cloudinary storage for documents
const documentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'coding-jojo/teacher-documents',
    resource_type: 'auto', // Handles images and raw files
    allowed_formats: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  },
});

// Create separate multer instances for images, videos, and documents
const imageUpload = multer({ 
  storage: imageStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const videoUpload = multer({ 
  storage: videoStorage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});

const documentsUpload = multer({ 
  storage: documentStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB per document
});

// Keep the old multer for backward compatibility (but it won't be used for uploads)
const upload = multer({ storage });

// Remove the dummy middleware - we'll use Cloudinary storage directly

// Public routes
router.post('/register', registerTeacher);
router.post('/login', loginTeacher);

// Protected routes (require authentication)
router.use(protect); // All routes below this require authentication

// Verification routes
router.post('/verification/upload', uploadVerificationDocuments);

// Profile management
router.get('/profile', getTeacherProfile);
router.put('/profile', updateTeacherProfile);
router.post('/documents', documentsUpload.array('documents', 10), uploadDocuments);

// Dashboard and analytics
router.get('/dashboard', getTeacherDashboard);
router.get('/stats', getTeacherStats);
router.get('/analytics', getCourseAnalytics);

// Course management
router.get('/courses', getTeacherCourses);
router.post('/courses', imageUpload.single('thumbnail'), createCourse); // FIXED: Use Cloudinary storage
router.put('/courses/:id', imageUpload.single('thumbnail'), updateCourse); // FIXED: Use Cloudinary storage
router.delete('/courses/:id', deleteCourse);
router.get('/courses/:id/students', getCourseStudents);
router.get('/courses/:id/analytics', getCourseAnalytics);
router.put('/courses/:id/publish', publishCourse);
router.put('/courses/:id/unpublish', unpublishCourse);
router.post('/courses/bulk-upload', upload.single('courseData'), bulkUploadCourses);
router.get('/courses/:id/export', exportCourseData);

// Financial management
router.get('/earnings', getEarnings);
router.put('/bank-details', updateBankDetails);
router.post('/payout-request', requestPayout);
router.get('/payout-history', getPayoutHistory);

// Availability and scheduling
router.put('/availability', updateAvailability);
router.get('/sessions/upcoming', getUpcomingSessions);
router.post('/sessions/schedule', scheduleSession);

// Reviews and feedback
router.get('/reviews', getTeacherReviews);
router.post('/reviews/:id/respond', respondToReview);
router.get('/feedback', getStudentFeedback);

// Communications
router.get('/communications', getCommunications);
router.post('/communications/message', sendMessage);

// Content creation
router.post('/assignments', createAssignment);
router.post('/assignments/:id/grade', gradeAssignment);
router.post('/quizzes', createQuiz);
router.post('/certificates', createCertificate);

// Settings
router.put('/settings', updateTeacherSettings);

// Video upload for course creation
router.post('/upload/video', videoUpload.single('video'), uploadVideo); // FIXED: Use Cloudinary storage

// Image upload for course thumbnails  
router.post('/upload/image', imageUpload.single('image'), uploadImage); // FIXED: Use Cloudinary storage

// Instructor Verification Routes
router.post('/verification/initialize', initializeVerification);
router.get('/verification/status', getVerificationStatus);
router.post('/verification/reset-limits', resetVerificationLimits); // Development only

// Email verification
router.post('/verification/email/send-code', sendEmailVerificationCode);
router.post('/verification/email/verify', verifyEmailCode);

// Phone/SMS verification
router.post('/verification/phone/send-code', sendPhoneVerificationCode);
router.post('/verification/phone/verify', verifyPhoneCode);

// Personal information
router.post('/verification/personal-info', submitPersonalInfo);

// ID document upload (front and back)
router.post('/verification/id-documents', 
  verificationUpload.fields([
    { name: 'frontImage', maxCount: 1 },
    { name: 'backImage', maxCount: 1 }
  ]),
  handleMulterError,
  cleanupFiles,
  validateImage,
  uploadIdDocuments
);

// Selfie upload
router.post('/verification/selfie', 
  verificationUpload.single('selfie'),
  handleMulterError,
  cleanupFiles,
  validateImage,
  uploadSelfie
);

// Professional information (optional)
router.post('/verification/professional-info', submitProfessionalInfo);

// Education certificate routes
router.post('/verification/education-certificate', 
  verificationUpload.single('certificateDocument'),
  handleMulterError,
  cleanupFiles,
  uploadEducationCertificate
);

router.get('/verification/education-certificates', getEducationCertificates);

router.delete('/verification/education-certificate/:certificateId', removeEducationCertificate);

router.put('/verification/education-certificate/:certificateId', updateEducationCertificate);

// Submit for admin review
router.post('/verification/submit', submitForReview);

// Admin only routes
router.put('/:id/approve', authorize('admin'), approveTeacher);
router.put('/:id/reject', authorize('admin'), rejectTeacher);
router.put('/:id/verify', authorize('admin'), verifyTeacher);

module.exports = router;
