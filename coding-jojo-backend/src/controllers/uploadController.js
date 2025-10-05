const Course = require('../models/Course');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary (ensure these env vars are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Add your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Add your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Add your Cloudinary API secret
});

// Storage configuration for course thumbnails
const thumbnailStorage = new CloudinaryStorage({
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

// Storage configuration for course videos
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

// Multer configurations
const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP files are allowed.'), false);
    }
  },
}).single('thumbnail');

const uploadVideo = multer({
  storage: videoStorage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP4, MOV, AVI, and WebM files are allowed.'), false);
    }
  },
}).single('video');

// @desc    Upload course thumbnail
// @route   POST /api/upload/course-thumbnail
// @access  Private (Instructor)
const uploadCourseThumbnail = async (req, res) => {
  uploadThumbnail(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No thumbnail file provided'
      });
    }

    try {
      console.log('Cloudinary upload result:', req.file);

      // FIXED: Use secure_url from Cloudinary response
      const thumbnailData = {
        url: req.file.path, // This is the secure_url from Cloudinary
        publicId: req.file.filename, // Public ID for deletion
        width: req.file.width,
        height: req.file.height
      };

      res.status(200).json({
        success: true,
        message: 'Thumbnail uploaded successfully',
        data: {
          thumbnailUrl: req.file.path, // Direct secure_url for frontend
          thumbnail: thumbnailData
        }
      });

    } catch (error) {
      console.error('Error processing thumbnail upload:', error);
      res.status(500).json({
        success: false,
        error: 'Error processing thumbnail upload'
      });
    }
  });
};

// @desc    Upload course video
// @route   POST /api/upload/course-video
// @access  Private (Instructor)
const uploadCourseVideo = async (req, res) => {
  uploadVideo(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No video file provided'
      });
    }

    try {
      console.log('Cloudinary video upload result:', req.file);

      // Get video metadata from Cloudinary
      const videoData = {
        url: req.file.path, // This is the secure_url from Cloudinary
        publicId: req.file.filename,
        duration: req.file.duration || 0,
        format: req.file.format,
        size: req.file.bytes,
        width: req.file.width,
        height: req.file.height,
        // Generate thumbnail from video
        thumbnail: cloudinary.url(req.file.filename, {
          resource_type: 'video',
          transformation: [
            { width: 400, height: 225, crop: 'fill' },
            { start_offset: '10%' },
            { format: 'jpg' }
          ]
        })
      };

      res.status(200).json({
        success: true,
        message: 'Video uploaded successfully',
        data: {
          videoUrl: req.file.path, // Direct secure_url for frontend
          videoData: videoData
        }
      });

    } catch (error) {
      console.error('Error processing video upload:', error);
      res.status(500).json({
        success: false,
        error: 'Error processing video upload'
      });
    }
  });
};

// @desc    Create course with uploaded files
// @route   POST /api/upload/create-course
// @access  Private (Instructor)
const createCourseWithFiles = async (req, res) => {
  try {
    const courseData = req.body;
    
    // Add instructor ID
    courseData.instructor = req.user.id;
    
    // FIXED: Ensure thumbnailUrl uses secure_url
    if (courseData.thumbnail && courseData.thumbnail.url) {
      courseData.thumbnailUrl = courseData.thumbnail.url;
    }
    
    // FIXED: Ensure video URLs use secure_url
    if (courseData.courseContent) {
      courseData.courseContent.forEach(section => {
        if (section.lessons) {
          section.lessons.forEach(lesson => {
            if (lesson.videoData && lesson.videoData.url) {
              lesson.videoUrl = lesson.videoData.url; // Set direct video URL
            }
          });
        }
      });
    }

    // Generate slug from title
    if (courseData.title) {
      courseData.slug = courseData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/\s+/g, '-');
    }

    // Create course with proper URL fields
    const course = await Course.create(courseData);
    await course.populate('instructor', 'name email avatar');

    // Debug: Log created course to verify URLs
    console.log('Created course with URLs:', {
      thumbnailUrl: course.thumbnailUrl,
      thumbnail: course.thumbnail,
      courseContent: course.courseContent.map(section => ({
        sectionTitle: section.sectionTitle,
        lessons: section.lessons.map(lesson => ({
          title: lesson.title,
          videoUrl: lesson.videoUrl,
          videoData: lesson.videoData
        }))
      }))
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error creating course'
    });
  }
};

// @desc    Delete uploaded file from Cloudinary
// @route   DELETE /api/upload/delete/:publicId
// @access  Private
const deleteUploadedFile = async (req, res) => {
  try {
    const { publicId } = req.params;
    const { resourceType = 'image' } = req.query; // 'image' or 'video'

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });

    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Failed to delete file'
      });
    }

  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({
      success: false,
      error: 'Error deleting file'
    });
  }
};

module.exports = {
  uploadCourseThumbnail,
  uploadCourseVideo,
  createCourseWithFiles,
  deleteUploadedFile
};
