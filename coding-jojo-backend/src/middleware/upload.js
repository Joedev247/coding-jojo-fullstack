const { 
  uploadImage, 
  uploadVideo, 
  uploadThumbnail, 
  uploadAvatar, 
  uploadResource,
  deleteFile,
  getVideoMetadata,
  generateVideoThumbnail 
} = require('../config/cloudinary');

// Middleware for course thumbnail upload
const uploadCourseThumbnail = (req, res, next) => {
  const upload = uploadThumbnail.single('thumbnail');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    next();
  });
};

// Middleware for course images upload (multiple)
const uploadCourseImages = (req, res, next) => {
  const upload = uploadImage.array('images', 10); // Max 10 images
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    next();
  });
};

// Middleware for lesson video upload
const uploadLessonVideo = (req, res, next) => {
  const upload = uploadVideo.single('video');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    next();
  });
};

// Middleware for course resources upload (multiple)
const uploadCourseResources = (req, res, next) => {
  const upload = uploadResource.array('resources', 20); // Max 20 resources
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    next();
  });
};

// Middleware for user avatar upload
const uploadUserAvatar = (req, res, next) => {
  const upload = uploadAvatar.single('avatar');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    next();
  });
};

// Middleware for multiple file types (course creation/update)
const uploadCourseFiles = (req, res, next) => {
  const upload = uploadImage.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 },
    { name: 'resources', maxCount: 20 }
  ]);
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    next();
  });
};

// Helper function to process uploaded files
const processUploadedFiles = async (files) => {
  const processedFiles = {};
  
  try {
    // Process thumbnail
    if (files.thumbnail && files.thumbnail[0]) {
      const thumbnail = files.thumbnail[0];
      processedFiles.thumbnail = {
        url: thumbnail.path,
        publicId: thumbnail.filename,
        width: thumbnail.width,
        height: thumbnail.height
      };
    }
    
    // Process images
    if (files.images && files.images.length > 0) {
      processedFiles.images = files.images.map(image => ({
        url: image.path,
        publicId: image.filename,
        width: image.width,
        height: image.height,
        description: '' // Can be added later
      }));
    }
    
    // Process video
    if (files.video && files.video[0]) {
      const video = files.video[0];
      const videoMetadata = await getVideoMetadata(video.filename);
      const videoThumbnail = generateVideoThumbnail(video.filename);
      
      processedFiles.video = {
        url: video.path,
        publicId: video.filename,
        duration: videoMetadata.duration,
        format: videoMetadata.format,
        size: videoMetadata.bytes,
        width: videoMetadata.width,
        height: videoMetadata.height,
        thumbnail: videoThumbnail
      };
    }
    
    // Process resources
    if (files.resources && files.resources.length > 0) {
      processedFiles.resources = files.resources.map(resource => ({
        title: resource.originalname.split('.')[0],
        url: resource.path,
        publicId: resource.filename,
        type: getResourceType(resource.mimetype),
        size: resource.size,
        format: resource.originalname.split('.').pop()
      }));
    }
    
    return processedFiles;
  } catch (error) {
    console.error('Error processing uploaded files:', error);
    throw error;
  }
};

// Helper function to determine resource type from mimetype
const getResourceType = (mimetype) => {
  if (mimetype.includes('pdf')) return 'pdf';
  if (mimetype.includes('zip') || mimetype.includes('compressed')) return 'archive';
  if (mimetype.includes('word') || mimetype.includes('document')) return 'document';
  if (mimetype.includes('text')) return 'document';
  return 'document';
};

// Helper function to clean up files on error
const cleanupFiles = async (files) => {
  const promises = [];
  
  for (const fileArray of Object.values(files)) {
    if (Array.isArray(fileArray)) {
      for (const file of fileArray) {
        if (file.filename) {
          promises.push(deleteFile(file.filename, file.resource_type || 'image'));
        }
      }
    } else if (fileArray && fileArray.filename) {
      promises.push(deleteFile(fileArray.filename, fileArray.resource_type || 'image'));
    }
  }
  
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
};

// Helper function to delete old files when updating
const deleteOldFiles = async (oldData, newData) => {
  const promises = [];
  
  // Delete old thumbnail if new one is uploaded
  if (oldData.thumbnail && oldData.thumbnail.publicId && 
      newData.thumbnail && newData.thumbnail.publicId !== oldData.thumbnail.publicId) {
    promises.push(deleteFile(oldData.thumbnail.publicId, 'image'));
  }
  
  // Delete old images that are not in the new set
  if (oldData.images && oldData.images.length > 0) {
    const newPublicIds = newData.images ? newData.images.map(img => img.publicId) : [];
    for (const oldImage of oldData.images) {
      if (oldImage.publicId && !newPublicIds.includes(oldImage.publicId)) {
        promises.push(deleteFile(oldImage.publicId, 'image'));
      }
    }
  }
  
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('Error deleting old files:', error);
  }
};

module.exports = {
  uploadCourseThumbnail,
  uploadCourseImages,
  uploadLessonVideo,
  uploadCourseResources,
  uploadUserAvatar,
  uploadCourseFiles,
  processUploadedFiles,
  cleanupFiles,
  deleteOldFiles,
  deleteFile,
  getVideoMetadata,
  generateVideoThumbnail
};
