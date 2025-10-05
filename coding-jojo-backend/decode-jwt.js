const jwt = require('jsonwebtoken');

// JWT secret from the backend (should match your .env)
const JWT_SECRET = 'your-super-secret-jwt-key-change-this-in-production-2024';

// Token from the frontend logs (first part before ...)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWUyMDQ4NjY4MjFjZjlmMjA3MzQ1ZCIsImVtYWlsIjoiYmlnaHVzaDU3QGdtYWlsLmNvbSIsInJvbGUiOiJpbnN0cnVjdG9yIiwiaWF0IjoxNzI0ODk1NTA3LCJleHAiOjE3Mjc0ODc1MDd9.dY-MnJ6XdEWCbRm9DCHx3BEYMCbZb-yTHlGsBHVc7_4';

console.log('🔍 Decoding JWT token...');
console.log('Token:', token.substring(0, 50) + '...');

try {
  // Decode without verification first to see the payload
  const decoded = jwt.decode(token);
  console.log('✅ Decoded payload (without verification):');
  console.log(JSON.stringify(decoded, null, 2));
  
  // Now verify with secret
  console.log('\n🔐 Verifying token with secret...');
  const verified = jwt.verify(token, JWT_SECRET);
  console.log('✅ Verified payload:');
  console.log(JSON.stringify(verified, null, 2));
  
  // Check if token is expired
  const now = Math.floor(Date.now() / 1000);
  console.log('\n⏰ Time check:');
  console.log('Current time:', now);
  console.log('Token expires:', verified.exp);
  console.log('Is expired:', now > verified.exp);
  console.log('Expires in:', Math.floor((verified.exp - now) / 3600), 'hours');
  
} catch (error) {
  console.error('❌ JWT verification failed:', error.message);
  
  if (error.name === 'TokenExpiredError') {
    console.log('🕐 Token is expired');
  } else if (error.name === 'JsonWebTokenError') {
    console.log('🔑 Invalid token signature or format');
  }
}
