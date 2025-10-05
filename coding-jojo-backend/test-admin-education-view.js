const mongoose = require('mongoose');
const User = require('./src/models/User');
const InstructorVerification = require('./src/models/InstructorVerification');
require('dotenv').config();

async function testEducationCertificateFlow() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected to MongoDB');
    
    // Find Justice Dev's verification record
    const verification = await InstructorVerification.findOne({
      instructor: new mongoose.Types.ObjectId('68ae204866821cf9f207345d')
    });
    
    if (!verification) {
      console.log('❌ Verification record not found');
      return;
    }
    
    console.log('📋 Current Verification Status:');
    console.log('- Progress:', verification.progressPercentage + '%');
    console.log('- Education Certificate Step:', verification.completedSteps.educationCertificate);
    console.log('- Education Verification exists:', !!verification.educationVerification);
    
    // Simulate adding a certificate
    if (!verification.educationVerification) {
      console.log('\n🔧 Initializing education verification...');
      verification.educationVerification = {
        certificates: [{
          certificateType: 'bachelors_degree',
          institutionName: 'University of Computer Science',
          fieldOfStudy: 'Computer Science',
          graduationYear: 2022,
          gpa: 3.5,
          certificateDocument: {
            url: 'https://res.cloudinary.com/test/image/upload/v123456/test-certificate.jpg',
            publicId: 'test-certificate',
            uploadedAt: new Date(),
            fileSize: 1024000,
            mimeType: 'image/jpeg'
          },
          verificationStatus: 'pending',
          submittedAt: new Date()
        }],
        minimumRequirementMet: true,
        overallStatus: 'pending'
      };
      
      // Update the education status
      verification.updateEducationStatus();
      
      await verification.save();
      console.log('✅ Education verification initialized and saved');
    }
    
    // Check what the admin API would return
    const adminResponse = await InstructorVerification.findById(verification._id)
      .populate('instructor', 'name email createdAt');
    
    console.log('\n🔍 Admin API Response would include:');
    console.log('- Progress:', adminResponse.progressPercentage + '%');
    console.log('- Education Certificate Step:', adminResponse.completedSteps.educationCertificate);
    console.log('- Education Verification:', {
      exists: !!adminResponse.educationVerification,
      certificatesCount: adminResponse.educationVerification?.certificates?.length || 0,
      overallStatus: adminResponse.educationVerification?.overallStatus
    });
    
    if (adminResponse.educationVerification?.certificates?.length > 0) {
      console.log('📚 Certificate Details:');
      adminResponse.educationVerification.certificates.forEach((cert, index) => {
        console.log(`  Certificate ${index + 1}:`);
        console.log(`    - Type: ${cert.certificateType}`);
        console.log(`    - Institution: ${cert.institutionName}`);
        console.log(`    - Field: ${cert.fieldOfStudy}`);
        console.log(`    - Status: ${cert.verificationStatus}`);
        console.log(`    - Has Document: ${!!(cert.certificateDocument && cert.certificateDocument.url)}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

testEducationCertificateFlow();
