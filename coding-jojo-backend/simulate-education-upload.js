const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');
require('dotenv').config();

async function simulateEducationUpload() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Find the instructor
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
    
    console.log('📊 Current verification status:');
    console.log('  - Progress:', verification.progressPercentage + '%');
    console.log('  - Education Step:', verification.completedSteps.educationCertificate ? '✅' : '❌');
    console.log('  - Education Verification exists:', !!verification.educationVerification);
    if (verification.educationVerification) {
      console.log('  - Certificates:', verification.educationVerification.certificates?.length || 0);
    }
    
    console.log('\n🎓 Simulating certificate upload...');
    
    // Simulate the certificate upload (same as what happened in the controller)
    const newCertificate = {
      certificateType: 'high_school_diploma',
      institutionName: 'seven advanced academy',
      fieldOfStudy: 'web development',
      graduationYear: 2025,
      gpa: 2.4,
      certificateDocument: {
        url: 'https://res.cloudinary.com/djwftm95t/image/upload/v1756248264/instructor_verification/68ae204866821cf9f207345d/education_certificates/68ae204866821cf9f207345d_cert_1756248262414_high_school_diploma.png',
        publicId: 'instructor_verification/68ae204866821cf9f207345d/education_certificates/68ae204866821cf9f207345d_cert_1756248262414_high_school_diploma',
        uploadedAt: new Date(),
        fileSize: 162064,
        mimeType: 'application/pdf'
      },
      verificationStatus: 'pending'
    };
    
    // Initialize education verification if it doesn't exist
    if (!verification.educationVerification) {
      verification.educationVerification = {
        certificates: [],
        minimumRequirementMet: false,
        overallStatus: 'pending'
      };
    }
    
    // Add certificate to verification record
    verification.educationVerification.certificates.push(newCertificate);
    console.log('  ✅ Certificate added to array');
    
    // Update verification status using the model method
    const requirements = verification.updateEducationStatus();
    console.log('  ✅ Education status updated:', requirements);
    
    // Add history entry
    verification.addHistoryEntry(
      'education_certificate',
      'upload',
      'success',
      { 
        certificateType: 'high_school_diploma', 
        institution: 'seven advanced academy',
        fieldOfStudy: 'web development',
        graduationYear: 2025
      },
      instructor._id
    );
    console.log('  ✅ History entry added');
    
    // Save the verification record
    console.log('  💾 Saving verification record...');
    await verification.save();
    console.log('  ✅ Verification saved successfully!');
    
    console.log('\n📊 After simulation:');
    console.log('  - Progress:', verification.progressPercentage + '%');
    console.log('  - Education Step:', verification.completedSteps.educationCertificate ? '✅' : '❌');
    console.log('  - Education Status:', verification.educationVerification.overallStatus);
    console.log('  - Min Requirements Met:', verification.educationVerification.minimumRequirementMet);
    console.log('  - Certificates:', verification.educationVerification.certificates.length);
    
    const completedCount = Object.values(verification.completedSteps).filter(step => step).length;
    console.log(`📈 Total: ${completedCount}/6 steps completed`);
    
    if (verification.completedSteps.educationCertificate) {
      console.log('🎉 SUCCESS: Education certificate step is now complete!');
    } else {
      console.log('❌ Education certificate step still incomplete');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

simulateEducationUpload();
