const http = require('http');
const fs = require('fs');
const path = require('path');

// Test file content
const testData = JSON.stringify({
  certificateType: 'bachelors_degree',
  institutionName: 'Test University',
  fieldOfStudy: 'Computer Science', 
  graduationYear: '2023',
  gpa: '3.8'
});

const boundary = '----formdata-test-' + Math.random().toString(36);
const testFileContent = 'Test certificate content';

let body = '';
body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="certificateType"\r\n\r\n`;
body += `bachelors_degree\r\n`;

body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="institutionName"\r\n\r\n`;
body += `Test University\r\n`;

body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="fieldOfStudy"\r\n\r\n`;
body += `Computer Science\r\n`;

body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="graduationYear"\r\n\r\n`;
body += `2023\r\n`;

body += `--${boundary}\r\n`;
body += `Content-Disposition: form-data; name="certificateDocument"; filename="test.pdf"\r\n`;
body += `Content-Type: application/pdf\r\n\r\n`;
body += testFileContent + '\r\n';

body += `--${boundary}--\r\n`;

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/teacher/verification/education-certificate',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer test-token',
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': Buffer.byteLength(body)
  }
};

console.log('🧪 Testing Education Certificate Upload...');
console.log('📋 Request headers:', options.headers);
console.log('📋 Body length:', body.length);

const req = http.request(options, (res) => {
  console.log(`📊 Status: ${res.statusCode}`);
  console.log(`📊 Headers:`, res.headers);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('📊 Response Body:', responseData);
    
    if (res.statusCode === 400) {
      console.log('❌ 400 Bad Request - This is the error we need to fix');
      try {
        const errorData = JSON.parse(responseData);
        console.log('🔍 Error details:', errorData);
      } catch (e) {
        console.log('🔍 Raw error response:', responseData);
      }
    }
  });
});

req.on('error', (e) => {
  console.error('🚨 Request error:', e.message);
});

req.write(body);
req.end();
