const axios = require('axios');

const BASE_URL = 'https://codingjojo-backend.onrender.com/api';
let authToken = '';

// You'll need to set this to a valid teacher token
const TEACHER_TOKEN = 'your_teacher_token_here';

async function testEmailVerificationFlow() {
  console.log('🚀 Testing Email Verification Flow');
  
  const config = {
    headers: {
      'Authorization': `Bearer ${TEACHER_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    // Step 1: Initialize verification (if not already done)
    console.log('\n1️⃣ Initializing verification...');
    try {
      const initResponse = await axios.post(`${BASE_URL}/teacher/verification/initialize`, {
        phoneNumber: '123456789',
        countryCode: '+237'
      }, config);
      console.log('✅ Initialization:', initResponse.data.message);
    } catch (error) {
      console.log('ℹ️ Verification already initialized or error:', error.response?.data?.error || error.message);
    }

    // Step 2: Send email verification code
    console.log('\n2️⃣ Sending email verification code...');
    const sendCodeResponse = await axios.post(`${BASE_URL}/teacher/verification/email/send-code`, {}, config);
    console.log('✅ Email code sent:', sendCodeResponse.data.message);
    
    console.log('\n📧 Check your email for the verification code!');
    console.log('💡 Once you have the code, you can verify it by calling:');
    console.log(`   POST ${BASE_URL}/teacher/verification/email/verify`);
    console.log(`   Body: { "code": "123456" }`);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

if (require.main === module) {
  if (TEACHER_TOKEN === 'your_teacher_token_here') {
    console.log('❌ Please set a valid TEACHER_TOKEN in this file');
    process.exit(1);
  }
  testEmailVerificationFlow();
}

module.exports = testEmailVerificationFlow;
