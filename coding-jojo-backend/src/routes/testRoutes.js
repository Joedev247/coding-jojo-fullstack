const express = require('express');
const router = express.Router();

// Test endpoint to verify Cloudinary configuration
router.get('/cloudinary-test', (req, res) => {
  const cloudinary = require('cloudinary').v2;
  
  try {
    const config = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***configured***' : 'NOT_SET'
    };

    // Test if we can get API info (this doesn't require uploading anything)
    const apiTest = cloudinary.config();
    
    res.json({
      success: true,
      message: 'Cloudinary configuration test',
      data: {
        configuredValues: config,
        cloudinaryConfig: {
          cloud_name: apiTest.cloud_name,
          api_key: apiTest.api_key ? '***configured***' : 'NOT_SET'
        },
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'NOT_SET',
          CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? 'SET' : 'NOT_SET',
          CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT_SET'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Cloudinary configuration error',
      message: error.message
    });
  }
});

module.exports = router;
