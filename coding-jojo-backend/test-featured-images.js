#!/usr/bin/env node

const axios = require('axios');

async function testFeaturedCoursesImageDisplay() {
  try {
    const baseURL = 'http://localhost:5000';
    
    console.log('🎯 Testing featured courses image display...');
    
    // Fetch featured courses
    const response = await axios.get(`${baseURL}/api/courses/featured`);
    
    if (response.data.success) {
      console.log('✅ Featured courses fetched successfully!');
      console.log(`📊 Total featured courses: ${response.data.data.length}`);
      
      if (response.data.data.length === 0) {
        console.log('⚠️  No featured courses found. Creating one first...');
        // Run the create featured course script
        const createScript = require('./create-featured-course.js');
        return;
      }
      
      console.log('\n📋 Featured Courses Details:');
      response.data.data.forEach((course, index) => {
        console.log(`\n${index + 1}. ${course.title}`);
        console.log(`   📁 Category: ${course.category}`);
        console.log(`   💰 Price: $${course.price}`);
        console.log(`   👨‍🏫 Instructor: ${course.instructor.name}`);
        console.log(`   🖼️  Thumbnail: ${course.thumbnail}`);
        console.log(`   ⭐ Rating: ${course.rating}/5 (${course.ratingCount} reviews)`);
        console.log(`   👥 Students: ${course.studentsEnrolled}`);
        
        // Check if thumbnail is a valid URL
        if (course.thumbnail) {
          if (course.thumbnail.startsWith('http')) {
            console.log(`   ✅ Valid image URL`);
          } else {
            console.log(`   ❌ Invalid image URL format`);
          }
        } else {
          console.log(`   ⚠️  No thumbnail URL`);
        }
      });
      
    } else {
      console.error('❌ Failed to fetch featured courses:', response.data.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testFeaturedCoursesImageDisplay();
