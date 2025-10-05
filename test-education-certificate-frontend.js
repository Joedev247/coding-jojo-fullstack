const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function testEducationCertificateUpload() {
  try {
    console.log('🧪 Testing Education Certificate Upload...');
    
    // Create a test file buffer
    const testFileContent = 'Test certificate content';
    const testBuffer = Buffer.from(testFileContent);
    
    // Create FormData
    const formData = new FormData();
    formData.append('certificateDocument', testBuffer, {
      filename: 'test-certificate.pdf',
      contentType: 'application/pdf'
    });
    formData.append('certificateType', 'bachelors_degree');
    formData.append('institutionName', 'Test University');
    formData.append('fieldOfStudy', 'Computer Science');
    formData.append('graduationYear', '2023');
    formData.append('gpa', '3.8');

    console.log('📋 Form data fields:');
    for (const [key, value] of formData) {
      console.log(`- ${key}: ${typeof value === 'object' ? 'FILE' : value}`);
    }

    // Make the request
    const response = await fetch('http://localhost:5000/api/teacher/verification/education-certificate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-token-here',
        ...formData.getHeaders()
      },
      body: formData
    });

    const responseText = await response.text();
    
    console.log(`\n📊 Response Status: ${response.status}`);
    console.log(`📊 Response Headers:`, Object.fromEntries(response.headers));
    console.log(`📊 Response Body:`, responseText);

    if (!response.ok) {
      console.log('❌ Request failed');
      try {
        const errorData = JSON.parse(responseText);
        console.log('Error details:', errorData);
      } catch (e) {
        console.log('Raw error:', responseText);
      }
    } else {
      console.log('✅ Request succeeded');
    }

  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
}

testEducationCertificateUpload();
