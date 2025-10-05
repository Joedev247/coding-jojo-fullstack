const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { createReadStream } = require('fs');

async function testUpload() {
  try {
    console.log('🧪 Testing ID Document Upload...\n');

    // Step 1: Login
    console.log('1️⃣ Logging in...');
    const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test.instructor@example.com',
      password: 'TestPass123!'
    });

    if (!loginResponse.data.token) {
      throw new Error('No token received from login');
    }

    const token = loginResponse.data.token;
    console.log('✅ Login successful, token:', token.substring(0, 20) + '...\n');

    // Step 2: Create form data
    console.log('2️⃣ Preparing upload...');
    
    // Create the test PNG if it doesn't exist
    const testFile = 'test-id.png';
    if (!fs.existsSync(testFile)) {
      const pngData = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
        0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x01, 0xA8, 0x8D, 0x2F, 0x64, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
      ]);
      fs.writeFileSync(testFile, pngData);
      console.log('✅ Created test PNG file');
    }

    const form = new FormData();
    form.append('documentType', 'national_id');
    form.append('frontImage', createReadStream(testFile), {
      filename: 'test-id-front.png',
      contentType: 'image/png'
    });

    console.log('✅ Form data prepared\n');

    // Step 3: Upload
    console.log('3️⃣ Uploading ID document...');
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      timeout: 30000 // 30 second timeout
    };

    const uploadResponse = await axios.post(
      'http://localhost:5000/api/teacher/verification/id-documents',
      form,
      config
    );

    console.log('🎉 SUCCESS! Upload completed successfully!');
    console.log('Response status:', uploadResponse.status);
    console.log('Response data:', JSON.stringify(uploadResponse.data, null, 2));

    return true;

  } catch (error) {
    console.error('❌ Upload failed:');
    console.error('Error type:', error.constructor.name);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status text:', error.response.statusText);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received');
      console.error('Request details:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    return false;
  }
}

// Install axios if needed, otherwise skip
(async () => {
  try {
    require('axios');
    console.log('Running upload test with axios...\n');
    await testUpload();
  } catch (requireError) {
    console.log('❌ axios not found. Install it with: npm install axios form-data');
    console.log('Or run the curl test scripts instead.');
  }
})();
