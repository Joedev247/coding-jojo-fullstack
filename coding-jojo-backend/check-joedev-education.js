const mongoose = require('mongoose');
const User = require('./src/models/User');
const InstructorVerification = require('./src/models/InstructorVerification');
require('dotenv').config();

async function checkJoedevEducationCertificate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected to MongoDB');
    
    // Find Joedev's verification record using the User ID from the logs
    const joedevUserId = '68a1b22641ffbc6574846ee5';
    
    // First, let's confirm the user exists
    const user = await User.findById(joedevUserId);
    if (user) {
      console.log('👤 Found User:', {
        name: user.name,
        email: user.email,
        id: user._id
      });
    } else {
      console.log('❌ User not found with ID:', joedevUserId);
      return;
    }
    
    // Find the verification record
    const verification = await InstructorVerification.findOne({
      instructor: new mongoose.Types.ObjectId(joedevUserId)
    }).populate('instructor', 'name email');
    
    if (!verification) {
      console.log('❌ Verification record not found for Joedev');
      return;
    }
    
    console.log('\n📋 Joedev Verification Status:');
    console.log('- Progress:', verification.progressPercentage + '%');
    console.log('- Completed Steps:', verification.completedSteps);
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
          console.log(`    - GPA: ${cert.gpa}`);
          console.log(`    - Status: ${cert.verificationStatus}`);
          console.log(`    - Document URL: ${cert.certificateDocument?.url || 'No URL'}`);
          console.log(`    - Submitted At: ${cert.submittedAt}`);
        });
      }
    }
    
    // Also check raw database data
    console.log('\n🔍 Raw Database Check:');
    const rawData = await mongoose.connection.db.collection('instructor_verifications')
      .findOne({instructor: new mongoose.Types.ObjectId(joedevUserId)});
    
    if (rawData) {
      console.log('- Raw completedSteps:', rawData.completedSteps);
      console.log('- Raw educationVerification exists:', !!rawData.educationVerification);
      if (rawData.educationVerification) {
        console.log('- Raw certificates count:', rawData.educationVerification.certificates?.length || 0);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

checkJoedevEducationCertificate();
