const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('🔍 Testing admin login...');
    
    const response = await axios.post('http://localhost:5000/api/auth/admin-login', {
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('Token:', response.data.token ? 'Present' : 'Missing');
    console.log('User:', response.data.data?.user?.name);
    console.log('Role:', response.data.data?.user?.role);
    
    // Test token with admin stats
    if (response.data.token) {
      console.log('\n🔍 Testing admin stats with token...');
      const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${response.data.token}`
        }
      });
      console.log('✅ Admin stats response:', statsResponse.data.success ? 'Success' : 'Failed');
      if (statsResponse.data.data) {
        console.log('Total Students:', statsResponse.data.data.totalStudents || 0);
        console.log('Total Courses:', statsResponse.data.data.totalCourses || 0);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAdminLogin();
