const axios = require('axios');

async function testServerDatabase() {
  try {
    console.log('🔍 Testing server database connection...');
    
    // Test basic API health
    const healthResponse = await axios.get('https://codingjojo-backend.onrender.com/api/courses?limit=1');
    console.log('✅ API Response Status:', healthResponse.status);
    console.log('📊 Total courses from API:', healthResponse.data.pagination.totalCourses);
    
    // Also try to test different endpoints
    try {
      const featuredResponse = await axios.get('https://codingjojo-backend.onrender.com/api/courses/featured');
      console.log('📊 Featured courses from API:', featuredResponse.data.data ? featuredResponse.data.data.length : 0);
    } catch (err) {
      console.log('⚠️ Featured endpoint not available:', err.message);
    }
    
    console.log('\n🔍 Full API Response:');
    console.log(JSON.stringify(healthResponse.data, null, 2));
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

// Wait for server to be ready
setTimeout(() => {
  testServerDatabase();
}, 5000);