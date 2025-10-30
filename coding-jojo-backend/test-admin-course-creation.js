#!/usr/bin/env node

const axios = require('axios');

async function testAdminCourseCreation() {
  try {
    const baseURL = 'https://codingjojo-backend.onrender.com';
    
    // First, login as admin to get token
    console.log('🔐 Logging in as admin...');
    const loginResponse = await axios.post(`${baseURL}/api/auth/login`, {
      email: 'admin@codingjojo.com',
      password: 'admin123'
    });
    
    if (!loginResponse.data.success) {
      throw new Error('Admin login failed');
    }
    
    const token = loginResponse.data.token;
    console.log('✅ Admin login successful');
    
    // Create a test course
    console.log('📚 Creating test course...');
    const courseData = {
      title: 'Test Course - Admin Created',
      description: 'This is a test course created by admin',
      longDescription: 'A comprehensive test course to verify admin course creation functionality',
      category: 'Web Development',
      level: 'Beginner',
      price: 99,
      originalPrice: 149,
      duration: { hours: 10, minutes: 30 },
      totalLessons: 15,
      tags: ['javascript', 'web', 'test'],
      prerequisites: ['Basic HTML/CSS'],
      learningObjectives: ['Learn testing', 'Understand course creation'],
      targetAudience: ['Developers', 'Students'],
      isPremium: true,
      isFeatured: true,
      instructor: 'Admin' // This should be handled properly now
    };
    
    const createResponse = await axios.post(
      `${baseURL}/api/admin/courses`,
      courseData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (createResponse.data.success) {
      console.log('✅ Course created successfully!');
      console.log('📋 Course Details:');
      console.log(`   ID: ${createResponse.data.data._id}`);
      console.log(`   Title: ${createResponse.data.data.title}`);
      console.log(`   Instructor: ${createResponse.data.data.instructor.name} (ID: ${createResponse.data.data.instructor._id})`);
      console.log(`   Category: ${createResponse.data.data.category}`);
      console.log(`   Price: $${createResponse.data.data.price}`);
      console.log(`   Featured: ${createResponse.data.data.isFeatured}`);
    } else {
      console.error('❌ Course creation failed:', createResponse.data.message);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data?.error) {
      console.error('📄 Full error:', error.response.data.error);
    }
  }
}

// Run the test
testAdminCourseCreation();
