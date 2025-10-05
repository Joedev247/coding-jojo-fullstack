const Course = require('../models/Course');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary with extended timeout and retry settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  timeout: 600000, // 10 minute timeout for extra large files
});

console.log('☁️ Cloudinary configured with extended timeout (10min) for video uploads');

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

// Custom video storage that handles timeouts better
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'coding-jojo/course-videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
    // Remove automatic transformations that can cause timeouts
    transformation: [
      { quality: 'auto:good' }
    ],
    // Add timeout handling
    timeout: 600000, // 10 minutes
    chunk_size: 6000000, // 6MB chunks for better handling of large files
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

// @desc    Upload course video (Enhanced with direct Cloudinary upload)
// @route   POST /api/upload/course-video
// @access  Private (Instructor)
const uploadCourseVideo = async (req, res) => {
  console.log('🎬 Video upload request received');
  console.log('👤 User:', req.user ? `${req.user.id} (${req.user.role})` : 'No user');
  console.log('📄 Headers:', {
    'content-type': req.headers['content-type'],
    'authorization': req.headers.authorization ? 'Bearer [PRESENT]' : 'No auth header'
  });

  // Use memory storage for better timeout control
  const memoryUpload = multer({
    storage: multer.memoryStorage(),
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

  // Enhanced upload handling with direct Cloudinary upload
  const handleDirectUpload = () => {
    return new Promise((resolve, reject) => {
      console.log('🔄 Starting direct upload with memory storage...');
      
      memoryUpload(req, res, async (err) => {
        if (err) {
          console.error('❌ Multer upload error:', err);
          return reject(err);
        }

        if (!req.file || !req.file.buffer) {
          console.log('❌ No file received from multer');
          return reject(new Error('No video file provided'));
        }

        console.log('📁 File received in memory:', {
          fieldname: req.file.fieldname,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size
        });

        try {
          console.log('☁️ Starting direct Cloudinary upload...');
          
          // Direct upload to Cloudinary with enhanced options
          const uploadResult = await new Promise((cloudinaryResolve, cloudinaryReject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'coding-jojo/course-videos',
                resource_type: 'video',
                chunk_size: 6000000, // 6MB chunks
                timeout: 600000, // 10 minutes
                quality: 'auto:good',
                format: 'mp4', // Standardize format
                eager: [
                  { 
                    width: 1280, 
                    height: 720, 
                    crop: 'limit',
                    quality: 'auto:good',
                    format: 'mp4'
                  }
                ],
                eager_async: true, // Process transformations in background
              },
              (error, result) => {
                if (error) {
                  console.error('☁️ Cloudinary upload error:', error);
                  cloudinaryReject(error);
                } else {
                  console.log('☁️ Cloudinary upload success:', {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                    duration: result.duration,
                    format: result.format
                  });
                  cloudinaryResolve(result);
                }
              }
            );

            // Upload the buffer
            uploadStream.end(req.file.buffer);
          });

          resolve(uploadResult);

        } catch (uploadError) {
          console.error('☁️ Direct Cloudinary upload failed:', uploadError);
          reject(uploadError);
        }
      });
    });
  };

  try {
    console.log('🔄 Attempting direct video upload...');
    const uploadResult = await handleDirectUpload();

    console.log('✅ Video upload completed successfully');

    // Process the Cloudinary response
    const videoData = {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      duration: uploadResult.duration || 0,
      format: uploadResult.format || 'mp4',
      size: uploadResult.bytes || 0,
      width: uploadResult.width || 0,
      height: uploadResult.height || 0,
      bitRate: uploadResult.bit_rate || 0,
      frameRate: uploadResult.frame_rate || 0,
    };

    // Generate thumbnail from video
    let thumbnailUrl;
    try {
      if (uploadResult.public_id) {
        thumbnailUrl = cloudinary.url(uploadResult.public_id, {
          resource_type: 'video',
          transformation: [
            { width: 400, height: 225, crop: 'fill' },
            { start_offset: '10%' },
            { format: 'jpg' }
          ]
        });
      }
    } catch (thumbnailError) {
      console.warn('Could not generate video thumbnail:', thumbnailError.message);
      thumbnailUrl = null;
    }

    if (thumbnailUrl) {
      videoData.thumbnail = thumbnailUrl;
    }

    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        videoUrl: uploadResult.secure_url,
        videoData: videoData
      }
    });

  } catch (error) {
    console.error('❌ Video upload failed:', error);

    // Provide specific error messages
    let errorMessage = 'Error processing video upload';
    let statusCode = 500;

    if (error.message) {
      if (error.message.includes('File too large')) {
        errorMessage = 'File too large. Maximum size is 500MB.';
        statusCode = 413;
      } else if (error.message.includes('Invalid file type')) {
        errorMessage = 'Invalid file type. Only MP4, MOV, AVI, and WebM files are allowed.';
        statusCode = 400;
      } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        errorMessage = 'Upload timeout. Please try with a smaller file or check your connection.';
        statusCode = 408;
      } else if (error.message.includes('No video file')) {
        errorMessage = 'No video file provided';
        statusCode = 400;
      } else {
        errorMessage = error.message;
      }
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};
      format: file.format || 'mp4',
      size: file.bytes || file.size || 0,
      width: file.width || 0,
      height: file.height || 0,
    };

    // FIXED: Safe thumbnail generation with error handling
    let thumbnailUrl;
    try {
      if (file.filename) {
        thumbnailUrl = cloudinary.url(file.filename, {
          resource_type: 'video',
          transformation: [
            { width: 400, height: 225, crop: 'fill' },
            { start_offset: '10%' },
            { format: 'jpg' }
          ]
        });
      }
    } catch (thumbnailError) {
      console.warn('Could not generate video thumbnail:', thumbnailError.message);
      thumbnailUrl = null;
    }

    if (thumbnailUrl) {
      videoData.thumbnail = thumbnailUrl;
    }

    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        videoUrl: file.path, // Direct secure_url for frontend
        videoData: videoData
      }
    });

  } catch (error) {
    console.error('Video upload error:', error);
    
    // Handle different types of errors
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File size too large. Maximum size is 500MB.'
      });
    }
    
    if (error.message && error.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Error processing video upload: ' + (error.message || 'Unknown error')
    });
  }
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
