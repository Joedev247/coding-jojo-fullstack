const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');  // Also import User model
require('dotenv').config();

async function checkVerificationProgress() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Find all instructor verifications
    const verifications = await InstructorVerification.find({}).populate('instructor', 'name email');
    
    console.log('\n🔍 INSTRUCTOR VERIFICATION PROGRESS REPORT\n');
    
    for (const verification of verifications) {
      console.log('👤 Instructor:', verification.instructor?.name || verification.instructor?.email);
      console.log('📊 Progress:', verification.progressPercentage + '%');
      console.log('🎯 Status:', verification.verificationStatus);
      console.log('📋 Completed Steps:');
      console.log('  1. Email:', verification.completedSteps.email ? '✅' : '❌');
      console.log('  2. Phone:', verification.completedSteps.phone ? '✅' : '❌');
      console.log('  3. Personal Info:', verification.completedSteps.personalInfo ? '✅' : '❌');
      console.log('  4. ID Document:', verification.completedSteps.idDocument ? '✅' : '❌');
      console.log('  5. Selfie:', verification.completedSteps.selfie ? '✅' : '❌');
      console.log('  6. Education Certificate:', verification.completedSteps.educationCertificate ? '✅' : '❌');
      
      const completedCount = Object.values(verification.completedSteps).filter(step => step).length;
      console.log(`\n📈 Total: ${completedCount}/6 steps completed`);
      
      // Check education verification details
      if (verification.educationVerification) {
        console.log('🎓 Education Status:', verification.educationVerification.overallStatus);
        console.log('📜 Certificates:', verification.educationVerification.certificates?.length || 0);
        console.log('✅ Min Requirements Met:', verification.educationVerification.minimumRequirementMet);
      } else {
        console.log('🎓 Education Status: Not initialized');
      }
      
      console.log('\n' + '='.repeat(50) + '\n');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkVerificationProgress();
