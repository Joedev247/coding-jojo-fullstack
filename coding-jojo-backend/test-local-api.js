const axios = require('axios');

async function testCoursesAPI() {
  try {
    console.log('🔍 Testing courses API...');
    
    const response = await axios.get('https://codingjojo-backend.onrender.com/api/courses?limit=5');
    
    console.log('✅ API Response Status:', response.status);
    console.log('📊 Response Data:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (response.data.courses && response.data.courses.length > 0) {
      console.log(`\n🎉 Found ${response.data.courses.length} courses!`);
      response.data.courses.forEach((course, index) => {
        console.log(`   ${index + 1}. ${course.title}`);
      });
    } else {
      console.log('⚠️  No courses found in API response');
    }
    
  } catch (error) {
    console.error('❌ API Test Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    }
  }
}

testCoursesAPI();