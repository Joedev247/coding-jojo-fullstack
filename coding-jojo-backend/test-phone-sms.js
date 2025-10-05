const axios = require('axios');

// Test phone SMS sending with mock provider
async function testPhoneSMS() {
  console.log('📱 Testing Phone SMS with Mock Provider');
  
  try {
    // First login to get fresh token
    console.log('1️⃣ Getting fresh authentication token...');
    const loginResponse = await axios.post('http://localhost:5000/api/teacher/login', {
      email: 'joedev247@gmail.com',
      password: 'your_password' // You'll need to update this
    });

    if (!loginResponse.data.success) {
      console.error('❌ Login failed:', loginResponse.data);
      return;
    }

    const token = loginResponse.data.token;
    console.log('✅ Login successful, token obtained');

    // Reset rate limits first
    console.log('2️⃣ Resetting rate limits...');
    try {
      await axios.post('http://localhost:5000/api/teacher/verification/reset-limits', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Rate limits reset');
    } catch (resetError) {
      console.log('⚠️ Rate limit reset failed (might not be needed)');
    }

    // Test phone SMS sending
    console.log('3️⃣ Testing phone verification SMS...');
    const smsResponse = await axios.post(
      'http://localhost:5000/api/teacher/verification/phone/send-code',
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ SMS Test Successful!');
    console.log('📱 Response:', smsResponse.data);
    
    if (smsResponse.data.smsInfo) {
      console.log('📧 SMS Details:', smsResponse.data.smsInfo);
    }

  } catch (error) {
    console.error('❌ SMS Test Failed:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Error:', error.message);
  }
}

if (require.main === module) {
  console.log('💡 Note: Update the password in this script with your actual credentials');
  testPhoneSMS();
}
