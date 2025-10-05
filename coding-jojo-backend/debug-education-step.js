const mongoose = require('mongoose');
const User = require('./src/models/User');
const InstructorVerification = require('./src/models/InstructorVerification');
require('dotenv').config();

async function debugEducationStep() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected to MongoDB');
    
    // Find all verification records to debug
    const verifications = await InstructorVerification.find().populate('instructor', 'name email');
    
    console.log('\n🔍 DEBUGGING EDUCATION CERTIFICATE STEP\n');
    
    for (const verification of verifications) {
      console.log(`👤 Instructor: ${verification.instructor?.name || 'Unknown'}`);
      console.log(`📧 Email: ${verification.instructor?.email || 'No email'}`);
      console.log(`📊 Progress: ${verification.progressPercentage}%`);
      
      // Check education verification details
      if (verification.educationVerification) {
        console.log('🎓 Education Verification:');
        console.log(`  - Certificates count: ${verification.educationVerification.certificates?.length || 0}`);
        console.log(`  - Overall status: ${verification.educationVerification.overallStatus}`);
        console.log(`  - Minimum requirement met: ${verification.educationVerification.minimumRequirementMet}`);
        
        if (verification.educationVerification.certificates?.length > 0) {
          verification.educationVerification.certificates.forEach((cert, index) => {
            console.log(`  - Certificate ${index + 1}:`);
            console.log(`    * Type: ${cert.certificateType}`);
            console.log(`    * Institution: ${cert.institutionName}`);
            console.log(`    * Field: ${cert.fieldOfStudy}`);
            console.log(`    * Status: ${cert.verificationStatus}`);
            console.log(`    * Has document: ${!!(cert.certificateDocument && cert.certificateDocument.url)}`);
            if (cert.certificateDocument) {
              console.log(`    * Document URL: ${cert.certificateDocument.url ? 'Yes' : 'No'}`);
            }
          });
        }
      } else {
        console.log('🎓 Education Verification: Not initialized');
      }
      
      // Check completed steps
      console.log('✅ Completed Steps:');
      console.log(`  - Education Certificate: ${verification.completedSteps.educationCertificate}`);
      
      // Test the requirements check
      const requirements = verification.checkEducationRequirements();
      console.log('🔍 Requirements Check:');
      console.log(`  - Met: ${requirements.met}`);
      if (!requirements.met) {
        console.log(`  - Reason: ${requirements.reason}`);
      }
      
      console.log('=' .repeat(60));
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

debugEducationStep();
