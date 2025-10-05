const axios = require('axios');

// Test the send email code endpoint with proper authentication
async function testSendEmailCode() {
  console.log('🧪 Testing Send Email Code Endpoint');
  
  // You'll need to use your actual token from localStorage
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTFiMjI2NDFmZmJjNjU3NDg0NmVlNSIsImlhdCI6MTc1NTk5NTk4NSwiZXhwIjoxNzU4NTg3OTg1fQ.Z3VgcH7alR6x1NY9xrX0d_M-6qm5waJoPW-8S_-41XU";
  
  try {
    console.log('Making request to send email verification code...');
    
    const response = await axios.post(
      'http://localhost:5000/api/teacher/verification/email/send-code',
      {}, // Empty body as no data is required
      {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Success:', response.data);
    
  } catch (error) {
    console.error('❌ Error details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Error Data:', error.response?.data);
    console.error('Full Error:', error.message);
    
    if (error.response?.status === 401) {
      console.error('🔒 Authentication failed - check your token');
    } else if (error.response?.status === 400) {
      console.error('📝 Bad request - check the request format or validation');
    } else if (error.response?.status === 404) {
      console.error('🔍 Verification not initialized - run initialize first');
    } else if (error.response?.status === 429) {
      console.error('⏰ Rate limited - wait before trying again');
    }
  }
}

// Also test verification status
async function testVerificationStatus() {
  console.log('\n🔍 Testing Verification Status Endpoint');
  
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YTFiMjI2NDFmZmJjNjU3NDg0NmVlNSIsImlhdCI6MTc1NTk5NTk4NSwiZXhwIjoxNzU4NTg3OTg1fQ.Z3VgcH7alR6x1NY9xrX0d_M-6qm5waJoPW-8S_-41XU";
  
  try {
    const response = await axios.get(
      'http://localhost:5000/api/teacher/verification/status',
      {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Verification Status:', response.data);
    
  } catch (error) {
    console.error('❌ Status Error:', error.response?.data || error.message);
  }
}

async function runTests() {
  await testVerificationStatus();
  await testSendEmailCode();
}

runTests();
