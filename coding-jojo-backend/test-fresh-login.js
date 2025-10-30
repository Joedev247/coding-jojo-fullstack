const axios = require('axios');

// Test login to get a fresh token
async function testLogin() {
  console.log('🔑 Testing Fresh Login to Get New Token');
  
  try {
    // Replace with your actual credentials
    const response = await axios.post('https://codingjojo-backend.onrender.com/api/teacher/login', {
      email: 'joedev247@gmail.com',  // Replace with actual email
      password: 'your_password'       // Replace with actual password
    });

    if (response.data.success) {
      console.log('✅ Login successful!');
      console.log('🔐 New token:', response.data.token.substring(0, 30) + '...');
      console.log('👤 User data:', response.data.data);
      
      // Now test the email verification with fresh token
      await testSendEmailCodeWithToken(response.data.token);
      
    } else {
      console.log('❌ Login failed:', response.data);
    }
    
  } catch (error) {
    console.error('❌ Login error:', error.response?.data || error.message);
    console.log('\n💡 Please update the credentials in this script and try again');
    console.log('📧 Email: joedev247@gmail.com (update if different)');
    console.log('🔒 Password: [update with actual password]');
  }
}

async function testSendEmailCodeWithToken(token) {
  console.log('\n📧 Testing Send Email Code with Fresh Token');
  
  try {
    const response = await axios.post(
      'https://codingjojo-backend.onrender.com/api/teacher/verification/email/send-code',
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Email code request successful:', response.data);
    
  } catch (error) {
    console.error('❌ Send email code error:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Headers:', error.response?.headers);
  }
}

testLogin();
