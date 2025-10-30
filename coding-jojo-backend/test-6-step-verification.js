const axios = require('axios');

// Test configuration
const API_BASE_URL = 'https://codingjojo-backend.onrender.com/api';

// Test user credentials (use an existing test instructor)
const testInstructor = {
  email: 'test.instructor.verification@example.com',
  password: 'TestPassword123'
};

async function testVerificationSteps() {
  try {
    console.log('🧪 Testing 6-step verification tracking...\n');

    // 1. Login as instructor
    console.log('🔐 Logging in as instructor...');
    const loginResponse = await axios.post(`${API_BASE_URL}/teacher/auth/login`, {
      email: testInstructor.email,
      password: testInstructor.password
    });

    const token = loginResponse.data.token;
    console.log('✅ Login successful');

    // 2. Get verification status
    console.log('📊 Getting verification status...');
    const statusResponse = await axios.get(`${API_BASE_URL}/teacher/verification/status`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const verificationData = statusResponse.data.data;
    console.log('📋 Verification Status:');
    console.log('  - Progress Percentage:', verificationData.progressPercentage + '%');
    console.log('  - Verification Status:', verificationData.verificationStatus);
    console.log('  - Completed Steps:');
    console.log('    • Email:', verificationData.completedSteps.email ? '✅' : '❌');
    console.log('    • Phone:', verificationData.completedSteps.phone ? '✅' : '❌');
    console.log('    • Personal Info:', verificationData.completedSteps.personalInfo ? '✅' : '❌');
    console.log('    • ID Document:', verificationData.completedSteps.idDocument ? '✅' : '❌');
    console.log('    • Selfie:', verificationData.completedSteps.selfie ? '✅' : '❌');
    console.log('    • Education Certificate:', verificationData.completedSteps.educationCertificate ? '✅' : '❌');

    // Calculate total completed steps
    const completedCount = Object.values(verificationData.completedSteps).filter(step => step).length;
    const totalSteps = Object.keys(verificationData.completedSteps).length;

    console.log(`\n🎯 Summary: ${completedCount}/${totalSteps} steps completed`);
    
    if (completedCount === 6) {
      console.log('✅ SUCCESS: All 6 verification steps are tracked and completed!');
    } else {
      console.log('❌ ISSUE: Not all 6 steps are completed. Expected 6, got', completedCount);
    }

    // 3. Check education verification details
    if (verificationData.educationVerification) {
      console.log('\n📚 Education Verification Details:');
      console.log('  - Overall Status:', verificationData.educationVerification.overallStatus);
      console.log('  - Minimum Requirement Met:', verificationData.educationVerification.minimumRequirementMet);
      console.log('  - Requirements Check:', verificationData.educationVerification.requirementsCheck);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.error || error.message);
    if (error.response?.status === 401) {
      console.log('💡 Note: You may need to create a test instructor or update the credentials');
    }
  }
}

// Run the test
testVerificationSteps();
