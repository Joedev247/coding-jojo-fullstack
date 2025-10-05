#!/usr/bin/env node

const mongoose = require('mongoose');
const Course = require('./src/models/Course');
require('dotenv').config();

async function fixFeaturedCourseThumbnails() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('✅ Connected to MongoDB');

    // Find featured courses without proper thumbnails
    const featuredCourses = await Course.find({
      isFeatured: true,
      $or: [
        { thumbnailUrl: { $exists: false } },
        { thumbnailUrl: null },
        { thumbnailUrl: '' },
        { thumbnailUrl: /no-thumbnail/ }
      ]
    });

    console.log(`📋 Found ${featuredCourses.length} featured courses needing thumbnail fixes`);

    // Sample Cloudinary URLs for different categories
    const categoryImages = {
      'Web Development': 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
      'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
      'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
      'Programming Languages': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
      'Databases': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80',
      'Default': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450&q=80'
    };

    // Update each course
    for (let i = 0; i < featuredCourses.length; i++) {
      const course = featuredCourses[i];
      const imageUrl = categoryImages[course.category] || categoryImages['Default'];
      
      console.log(`🔄 Updating ${course.title} (${course.category})`);
      
      await Course.findByIdAndUpdate(course._id, {
        thumbnailUrl: imageUrl,
        thumbnail: {
          url: imageUrl,
          publicId: null, // External image
          width: 800,
          height: 450
        }
      });
      
      console.log(`   ✅ Updated with image: ${imageUrl}`);
    }

    console.log('🎉 All featured course thumbnails updated successfully!');
    
    // Test the API to verify
    console.log('\n🔍 Verifying update...');
    const updatedCourses = await Course.find({ isFeatured: true })
      .select('title category thumbnailUrl thumbnail')
      .limit(3);
      
    updatedCourses.forEach(course => {
      console.log(`📸 ${course.title}: ${course.thumbnailUrl}`);
    });

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.disconnect();
  }
}

fixFeaturedCourseThumbnails();
