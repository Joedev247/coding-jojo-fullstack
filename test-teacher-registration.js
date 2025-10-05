// Test Teacher Registration Flow
const axios = require('axios');

const testRegistration = async () => {
  try {
    console.log('🧪 Testing Teacher Registration Flow...\n');

    const testData = {
      name: 'John Doe',
      email: 'john.test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      bio: 'Experienced software engineer with 10+ years of experience in web development.',
      experience: 'Senior Software Engineer at multiple tech companies, specialized in JavaScript, React, and Node.js.',
      expertise: ['JavaScript', 'React', 'Node.js', 'Web Development'],
      teachingExperience: {
        years: 5,
        description: 'University teaching and online course creation'
      },
      dateOfBirth: '1990-01-01',
      phoneNumber: '+1-555-123-4567',
      agreeToTerms: true,
      agreeToVerification: true
    };

    console.log('📝 Attempting to register teacher...');
    const response = await axios.post('http://localhost:5000/api/teacher/register', testData);
    
    if (response.data.success) {
      console.log('✅ Teacher registration successful!');
      console.log('📧 Teacher Email:', response.data.data?.email);
      console.log('👤 Teacher Name:', response.data.data?.name);
      console.log('🎯 Role:', response.data.data?.role);
      console.log('🔐 Token received:', response.data.token ? 'Yes' : 'No');
      
      // Test if verification status is set
      if (response.data.data?.teacherProfile?.verification) {
        console.log('🔍 Verification Status:', response.data.data.teacherProfile.verification.status);
      }
    } else {
      console.log('❌ Registration failed:', response.data.message);
    }

  } catch (error) {
    console.log('❌ Registration test failed:');
    if (error.response) {
      console.log('📟 Status:', error.response.status);
      console.log('📝 Error:', error.response.data.message || error.response.data);
    } else {
      console.log('🔌 Network Error:', error.message);
    }
  }
};

// Test login flow
const testLogin = async () => {
  try {
    console.log('\n🔐 Testing Teacher Login...');
    
    const loginData = {
      email: 'john.test@example.com',
      password: 'password123'
    };

    const response = await axios.post('http://localhost:5000/api/teacher/login', loginData);
    
    if (response.data.success) {
      console.log('✅ Teacher login successful!');
      console.log('👤 Welcome:', response.data.data?.name);
      console.log('🔐 Token received:', response.data.data?.token ? 'Yes' : 'No');
    } else {
      console.log('❌ Login failed:', response.data.message);
    }

  } catch (error) {
    console.log('❌ Login test failed:');
    if (error.response) {
      console.log('📟 Status:', error.response.status);
      console.log('📝 Error:', error.response.data.message || error.response.data);
    } else {
      console.log('🔌 Network Error:', error.message);
    }
  }
};

// Run tests
const runTests = async () => {
  await testRegistration();
  await testLogin();
  console.log('\n🏁 Tests completed!');
};

runTests();
