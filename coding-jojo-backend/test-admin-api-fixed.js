const mongoose = require('mongoose');
const User = require('./src/models/User');
const InstructorVerification = require('./src/models/InstructorVerification');
require('dotenv').config();

async function testAdminAPIAfterSchemaFix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected to MongoDB');
    
    // Test what the admin API would return now
    const verification = await InstructorVerification.findOne({
      instructor: new mongoose.Types.ObjectId('68ae204866821cf9f207345d')
    }).populate('instructor', 'name email createdAt');
    
    if (!verification) {
      console.log('❌ Verification record not found');
      return;
    }
    
    console.log('🔍 Admin API Response with Fixed Schema:');
    console.log('- Instructor:', verification.instructor.name);
    console.log('- Progress:', verification.progressPercentage + '%');
    console.log('- Education Certificate Step:', verification.completedSteps.educationCertificate);
    console.log('- Education Verification exists:', !!verification.educationVerification);
    
    if (verification.educationVerification) {
      console.log('📚 Education Verification Details:');
      console.log('  - Certificates count:', verification.educationVerification.certificates?.length || 0);
      console.log('  - Overall status:', verification.educationVerification.overallStatus);
      console.log('  - Minimum requirement met:', verification.educationVerification.minimumRequirementMet);
      
      if (verification.educationVerification.certificates?.length > 0) {
        console.log('📋 Certificate Details:');
        verification.educationVerification.certificates.forEach((cert, index) => {
          console.log(`  Certificate ${index + 1}:`);
          console.log(`    - Type: ${cert.certificateType}`);
          console.log(`    - Institution: ${cert.institutionName}`);
          console.log(`    - Field: ${cert.fieldOfStudy}`);
          console.log(`    - Year: ${cert.graduationYear}`);
          console.log(`    - Status: ${cert.verificationStatus}`);
          console.log(`    - Document URL: ${cert.certificateDocument?.url || 'No URL'}`);
        });
      }
    } else {
      console.log('❌ Education verification data not found in Mongoose query');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

testAdminAPIAfterSchemaFix();
