const axios = require('axios');

// Test the instructor login endpoint
async function testInstructorLogin() {
  console.log('🚀 Testing Instructor Login API');
  
  try {
    const response = await axios.post('http://localhost:5000/api/teacher/login', {
      email: 'test@example.com', // Replace with actual credentials
      password: 'testpassword'
    });

    console.log('✅ Login successful!');
    console.log('📦 Response data structure:', {
      success: response.data.success,
      hasToken: !!response.data.data?.token || !!response.data.token,
      hasUser: !!response.data.data?.user || !!response.data.data,
      dataKeys: Object.keys(response.data.data || {}),
      fullResponse: response.data
    });

    // Show what should be stored
    const token = response.data.data?.token || response.data.token;
    const user = response.data.data?.user || response.data.data;
    
    console.log('🔐 Token to store:', token ? `${token.substring(0, 20)}...` : 'NO TOKEN');
    console.log('👤 User data to store:', user);
    
  } catch (error) {
    console.error('❌ Login failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      error: error.response?.data?.error || error.message,
      fullError: error.response?.data
    });
  }
}

if (require.main === module) {
  testInstructorLogin();
}

module.exports = testInstructorLogin;
