// Debug Authentication Issues
// Run this in the browser console to check authentication state

console.log('=== DEBUGGING INSTRUCTOR AUTHENTICATION ===');

// Check tokens
const teacherToken = localStorage.getItem('teacher_token');
const sessionToken = sessionStorage.getItem('teacher_token');
const teacherInfo = localStorage.getItem('teacher_info');
const sessionInfo = sessionStorage.getItem('teacher_info');

console.log('localStorage teacher_token:', teacherToken ? 'EXISTS' : 'MISSING');
console.log('sessionStorage teacher_token:', sessionToken ? 'EXISTS' : 'MISSING');
console.log('localStorage teacher_info:', teacherInfo ? 'EXISTS' : 'MISSING');
console.log('sessionStorage teacher_info:', sessionInfo ? 'EXISTS' : 'MISSING');

if (teacherToken) {
  console.log('Token preview:', teacherToken.substring(0, 20) + '...');
}

if (teacherInfo) {
  try {
    const parsed = JSON.parse(teacherInfo);
    console.log('Teacher info keys:', Object.keys(parsed));
    console.log('Teacher info:', parsed);
  } catch (e) {
    console.error('Failed to parse teacher_info:', e);
  }
}

// Test authentication function
function testAuth() {
  return !!(localStorage.getItem('teacher_token') || sessionStorage.getItem('teacher_token'));
}

console.log('isAuthenticated():', testAuth());

// Check if token is expired (if it's a JWT)
let isExpired = false;
if (teacherToken) {
  try {
    const payload = JSON.parse(atob(teacherToken.split('.')[1]));
    const now = Date.now() / 1000;
    isExpired = payload.exp < now;
    console.log('Token payload:', payload);
    console.log('Token expires:', new Date(payload.exp * 1000));
    console.log('Token expired:', isExpired);
    console.log('Current time:', new Date());
  } catch (e) {
    console.log('Token is not a JWT or cannot be parsed');
    isExpired = true;
  }
}

// 🎯 SOLUTION HELPER
if (isExpired || !teacherToken) {
  console.log('\n🚨 ISSUE DETECTED: Token is missing or expired!');
  console.log('✅ SOLUTION: Run this to fix authentication:');
  console.log(`
🔧 Copy and paste this in the browser console:
localStorage.removeItem('teacher_token');
localStorage.removeItem('teacher_info');
sessionStorage.removeItem('teacher_token');
sessionStorage.removeItem('teacher_info');
window.location.href = '/instructor/login';
console.log('✅ Storage cleared, redirecting to login...');
`);
} else {
  console.log('\n✅ TOKEN IS VALID - Authentication should work!');
}

console.log('=== END DEBUG ===');
