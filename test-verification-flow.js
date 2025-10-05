// Test Full Instructor Verification Flow
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api';

// Test credentials (you can modify these)
const TEST_INSTRUCTOR = {
  email: 'test.instructor@example.com',
  password: 'TestPass123!',
  firstName: 'Test',
  lastName: 'Instructor',
  phoneNumber: '+237123456789'
};

let authToken = null;

async function createTestInstructor() {
  try {
    console.log('1️⃣ Creating test instructor...');
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      ...TEST_INSTRUCTOR,
      role: 'instructor'
    });
    console.log('✅ Instructor created successfully');
    return response.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.message?.includes('exists')) {
      console.log('ℹ️ Instructor already exists, will try to login');
      return null;
    }
    console.error('❌ Failed to create instructor:', error.response?.data || error.message);
    throw error;
  }
}

async function loginInstructor() {
  try {
    console.log('2️⃣ Logging in instructor...');
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: TEST_INSTRUCTOR.email,
      password: TEST_INSTRUCTOR.password
    });
    
    authToken = response.data.token;
    console.log('✅ Instructor logged in successfully');
    console.log('Token preview:', authToken?.substring(0, 20) + '...');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to login instructor:', error.response?.data || error.message);
    throw error;
  }
}

async function initializeVerification() {
  try {
    console.log('3️⃣ Initializing verification...');
    const response = await axios.post(
      `${BASE_URL}/teacher/verification/initialize`,
      {
        phoneNumber: TEST_INSTRUCTOR.phoneNumber,
        countryCode: '+237'
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    console.log('✅ Verification initialized successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Failed to initialize verification:', error.response?.data || error.message);
    // Don't throw here, might already be initialized
    return null;
  }
}

async function testIdDocumentUpload() {
  try {
    console.log('4️⃣ Testing ID document upload...');
    
    // Create a minimal test PNG file
    const testImagePath = path.join(__dirname, 'temp-test-id.png');
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x01, 0xA8, 0x8D, 0x2F, 0x64, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    fs.writeFileSync(testImagePath, pngBuffer);
    
    const form = new FormData();
    form.append('documentType', 'national_id');
    form.append('frontImage', fs.createReadStream(testImagePath), {
      filename: 'test-id-front.png',
      contentType: 'image/png'
    });
    
    const response = await axios.post(
      `${BASE_URL}/teacher/verification/id-documents`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    
    console.log('✅ ID document upload successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    
    return response.data;
    
  } catch (error) {
    console.error('❌ ID document upload failed:');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);
    
    // Log detailed error for debugging
    if (error.response?.data) {
      console.error('Full error details:', JSON.stringify(error.response.data, null, 2));
    }
    
    throw error;
  }
}

async function runFullTest() {
  console.log('🧪 === FULL INSTRUCTOR VERIFICATION TEST ===\n');
  
  try {
    await createTestInstructor();
    await loginInstructor();
    await initializeVerification();
    await testIdDocumentUpload();
    
    console.log('\n🎉 ALL TESTS PASSED! ID document upload is working.');
    
  } catch (error) {
    console.error('\n💥 TEST FAILED:', error.message);
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  runFullTest().catch(console.error);
}

module.exports = { runFullTest };
