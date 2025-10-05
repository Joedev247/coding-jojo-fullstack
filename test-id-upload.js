// Test ID Document Upload Functionality
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function testIdUpload() {
  console.log('🧪 Testing ID Document Upload...\n');

  // You'll need a valid teacher token for this test
  const teacherToken = 'your-teacher-token-here'; // Replace with actual token
  
  if (teacherToken === 'your-teacher-token-here') {
    console.log('❌ Please replace teacherToken with a valid token from localStorage');
    console.log('💡 Run the debug-auth.js script in the browser to get your token');
    return;
  }

  try {
    // Create a test image file (1x1 pixel PNG)
    const testImagePath = path.join(__dirname, 'test-id.png');
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x01, 0xA8, 0x8D, 0x2F, 0x64, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    fs.writeFileSync(testImagePath, pngBuffer);
    console.log('✅ Created test image file');

    // Prepare form data
    const form = new FormData();
    form.append('documentType', 'national_id');
    form.append('frontImage', fs.createReadStream(testImagePath), {
      filename: 'test-id-front.png',
      contentType: 'image/png'
    });

    // Make the request
    const response = await axios.post('http://localhost:5000/api/teacher/verification/id-documents', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${teacherToken}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('✅ SUCCESS! Upload response:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));

    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
      console.log('🧹 Cleaned up test file');
    }

  } catch (error) {
    console.log('❌ ERROR during upload:');
    console.log('Status:', error.response?.status);
    console.log('Message:', error.response?.data || error.message);
    console.log('Full error:', error.response?.data);
    
    // Log server-side error details
    if (error.response?.status === 500) {
      console.log('\n🔍 This is a 500 server error - check backend logs for details');
    }
  }
}

// Alternative: Test endpoint availability
async function testEndpointAvailable() {
  try {
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend server is running');
    return true;
  } catch (error) {
    console.log('❌ Backend server may not be running on port 5000');
    return false;
  }
}

async function main() {
  console.log('=== ID DOCUMENT UPLOAD TEST ===\n');
  
  const serverRunning = await testEndpointAvailable();
  if (!serverRunning) {
    console.log('Please ensure the backend server is running on port 5000');
    return;
  }
  
  await testIdUpload();
  console.log('\n=== END TEST ===');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testIdUpload, testEndpointAvailable };
