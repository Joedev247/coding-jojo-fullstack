const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../uploads/verification');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for verification files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create user-specific directory
    const userDir = path.join(uploadDir, req.user.id);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp and UUID
    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

// File filter for security
const fileFilter = (req, file, cb) => {
  // Check file type based on field name
  if (file.fieldname === 'selfie' || file.fieldname === 'frontImage' || file.fieldname === 'backImage') {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      // Additional security: check file extension
      const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const extension = path.extname(file.originalname).toLowerCase();
      
      if (allowedExtensions.includes(extension)) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`), false);
      }
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  } else if (file.fieldname === 'certificateDocument') {
    // Allow images and PDFs for certificate documents
    const allowedMimeTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf'
    ];
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'];
    const extension = path.extname(file.originalname).toLowerCase();
    
    if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for certificate. Allowed: ${allowedExtensions.join(', ')}`), false);
    }
  } else {
    cb(new Error('Unexpected field name'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files per request
  },
  fileFilter: fileFilter
});

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        return res.status(400).json({
          success: false,
          error: 'File too large. Maximum size is 10MB.'
        });
      case 'LIMIT_FILE_COUNT':
        return res.status(400).json({
          success: false,
          error: 'Too many files. Maximum 5 files allowed.'
        });
      case 'LIMIT_UNEXPECTED_FILE':
        return res.status(400).json({
          success: false,
          error: 'Unexpected field name or too many files for this field.'
        });
      default:
        return res.status(400).json({
          success: false,
          error: `Upload error: ${error.message}`
        });
    }
  } else if (error) {
    return res.status(400).json({
      success: false,
      error: error.message
    });
  }
  next();
};

// Cleanup uploaded files on error
const cleanupFiles = (req, res, next) => {
  res.on('error', () => {
    if (req.files) {
      // Handle both single file and multiple files
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      files.forEach(file => {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    } else if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  });
  next();
};

// Validate image dimensions and quality
const validateImage = async (req, res, next) => {
  console.log('🖼️ === IMAGE VALIDATION MIDDLEWARE ===');
  console.log('Files received:', req.files ? Object.keys(req.files) : 'none');
  
  if (!req.files && !req.file) {
    console.log('✅ No files to validate, skipping...');
    return next();
  }

  try {
    // Try to load sharp, but make it optional for development
    let sharp;
    try {
      sharp = require('sharp');
      console.log('✅ Sharp loaded successfully');
    } catch (sharpError) {
      console.log('⚠️ Sharp not installed, skipping image validation for development');
      return next();
    }

    const files = req.files ? 
      (Array.isArray(req.files) ? req.files : Object.values(req.files).flat()) :
      [req.file];

    console.log('📁 Processing', files.length, 'files');

    for (const file of files) {
      if (file && file.path) {
        console.log('🔍 Validating file:', file.path);
        const metadata = await sharp(file.path).metadata();
        console.log('📊 Image metadata:', { width: metadata.width, height: metadata.height });
        
        // Validate minimum dimensions
        const minWidth = 200;
        const minHeight = 200;
        
        if (metadata.width < minWidth || metadata.height < minHeight) {
          console.log('❌ Image too small');
          // Cleanup file
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          return res.status(400).json({
            success: false,
            error: `Image too small. Minimum dimensions: ${minWidth}x${minHeight}px`
          });
        }

        // Validate maximum dimensions for performance
        const maxWidth = 4000;
        const maxHeight = 4000;
        
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          console.log('❌ Image too large');
          // Cleanup file
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          return res.status(400).json({
            success: false,
            error: `Image too large. Maximum dimensions: ${maxWidth}x${maxHeight}px`
          });
        }
        
        console.log('✅ Image validation passed for:', file.path);
      }
    }
    
    console.log('✅ All images validated successfully');
    next();
  } catch (error) {
    console.error('❌ Image validation error:', error.message);
    console.error('Stack trace:', error.stack);
    // Cleanup files on error
    if (req.files) {
      const files = Array.isArray(req.files) ? req.files : Object.values(req.files).flat();
      files.forEach(file => {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    } else if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      error: 'Error validating image'
    });
  }
};

module.exports = {
  upload,
  handleMulterError,
  cleanupFiles,
  validateImage
};
