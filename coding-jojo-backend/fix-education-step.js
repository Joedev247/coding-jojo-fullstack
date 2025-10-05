const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');
require('dotenv').config();

async function fixEducationVerification() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Find the instructor who just uploaded the certificate (Justice Dev or similar)
    const instructor = await User.findById('68ae204866821cf9f207345d');
    if (!instructor) {
      console.log('❌ Instructor not found');
      process.exit();
    }
    
    console.log('👤 Found instructor:', instructor.name || instructor.email);
    
    // Find their verification record
    const verification = await InstructorVerification.findOne({ instructor: instructor._id });
    if (!verification) {
      console.log('❌ Verification record not found');
      process.exit();
    }
    
    console.log('📊 Before update:');
    console.log('  - Progress:', verification.progressPercentage + '%');
    console.log('  - Education Step:', verification.completedSteps.educationCertificate ? '✅' : '❌');
    console.log('  - Education Status:', verification.educationVerification?.overallStatus || 'Not initialized');
    console.log('  - Certificates:', verification.educationVerification?.certificates?.length || 0);
    
    // Check if certificate was uploaded but step not marked complete
    if (verification.educationVerification?.certificates?.length > 0) {
      console.log('\n🎓 Certificate found, updating status...');
      
      // Update education status using the improved method
      const requirements = verification.updateEducationStatus();
      console.log('  - Requirements check:', requirements);
      
      // Force save to trigger pre-save hook
      await verification.save();
      
      console.log('\n📊 After update:');
      console.log('  - Progress:', verification.progressPercentage + '%');
      console.log('  - Education Step:', verification.completedSteps.educationCertificate ? '✅' : '❌');
      console.log('  - Education Status:', verification.educationVerification.overallStatus);
      console.log('  - Min Requirements Met:', verification.educationVerification.minimumRequirementMet);
      
      const completedCount = Object.values(verification.completedSteps).filter(step => step).length;
      console.log(`📈 Total: ${completedCount}/6 steps completed`);
      
      if (completedCount === 6) {
        console.log('🎉 SUCCESS: All 6 verification steps are now complete!');
      }
    } else {
      console.log('❌ No certificates found in the education verification');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixEducationVerification();
