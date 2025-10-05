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
        console.log('⚠️  No featured courses found. Run create-featured-course.js first.');
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
      
      // Test individual course details to check consistency
      if (response.data.data.length > 0) {
        const firstCourse = response.data.data[0];
        console.log(`\n🔍 Testing individual course details for: ${firstCourse.title}`);
        
        try {
          const courseResponse = await axios.get(`${baseURL}/api/courses/${firstCourse.id}`);
          if (courseResponse.data.success) {
            console.log('✅ Individual course fetch successful');
            console.log(`🖼️  Individual course thumbnail: ${courseResponse.data.data.thumbnail}`);
            
            if (firstCourse.thumbnail === courseResponse.data.data.thumbnail) {
              console.log('✅ Thumbnail consistency verified');
            } else {
              console.log('❌ Thumbnail inconsistency detected:');
              console.log(`   Featured API: ${firstCourse.thumbnail}`);
              console.log(`   Individual API: ${courseResponse.data.data.thumbnail}`);
            }
          }
        } catch (error) {
          console.log('⚠️  Could not fetch individual course details');
        }
      }
      
    } else {
      console.error('❌ Failed to fetch featured courses:', response.data.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

async function testAdminCoursesImageDisplay() {
  try {
    console.log('\n🔧 Testing admin courses API (without authentication)...');
    const baseURL = 'http://localhost:5000';
    
    const response = await axios.get(`${baseURL}/api/admin/courses/debug`);
    
    if (response.data.success) {
      console.log('✅ Debug admin courses fetched successfully!');
      console.log(`📊 Total courses in admin view: ${response.data.totalCourses}`);
      
      console.log('\n📋 Admin Course List:');
      response.data.courses.slice(0, 5).forEach((course, index) => {
        console.log(`${index + 1}. ${course.title} (${course.category}) - Featured: ${course.isFeatured}`);
      });
    }
    
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('🔐 Admin courses require authentication (expected)');
    } else {
      console.error('❌ Admin test failed:', error.response?.data || error.message);
    }
  }
}

// Run the tests
async function runAllTests() {
  await testFeaturedCoursesImageDisplay();
  await testAdminCoursesImageDisplay();
}

runAllTests();
