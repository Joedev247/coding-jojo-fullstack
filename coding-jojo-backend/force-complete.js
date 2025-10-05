const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');
require('dotenv').config();

async function forceCompleteVerification() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Find Joedev's verification
    const allVerifications = await InstructorVerification.find({}).populate('instructor', 'name email');
    const joedevVerification = allVerifications.find(v => v.instructor?.name === 'Joedev');
    
    if (!joedevVerification) {
      console.log('❌ Joedev verification not found');
      process.exit();
    }
    
    console.log('👤 Processing:', joedevVerification.instructor.name);
    console.log('📊 Before update:');
    console.log('  - Progress:', joedevVerification.progressPercentage + '%');
    console.log('  - Education Step:', joedevVerification.completedSteps.educationCertificate ? '✅' : '❌');
    console.log('  - Education Status:', joedevVerification.educationVerification?.overallStatus || 'Not initialized');
    
    // Force initialize education verification
    joedevVerification.educationVerification = {
      certificates: [{
        certificateType: 'bachelors_degree',
        institutionName: 'Test University',
        fieldOfStudy: 'Computer Science',
        graduationYear: 2020,
        gpa: 3.8,
        certificateDocument: {
          url: 'https://res.cloudinary.com/example/certificate.pdf',
          publicId: 'cert_123',
          uploadedAt: new Date(),
          fileSize: 1024000,
          mimeType: 'application/pdf'
        },
        verificationStatus: 'verified'
      }],
      minimumRequirementMet: true,
      overallStatus: 'approved'
    };
    
    // Manually set the completed step
    joedevVerification.completedSteps.educationCertificate = true;
    
    // Update education status
    joedevVerification.updateEducationStatus();
    
    // Force save
    await joedevVerification.save();
    
    console.log('✅ Update complete!');
    console.log('📊 After update:');
    console.log('  - Progress:', joedevVerification.progressPercentage + '%');
    console.log('  - Education Step:', joedevVerification.completedSteps.educationCertificate ? '✅' : '❌');
    console.log('  - Education Status:', joedevVerification.educationVerification?.overallStatus);
    console.log('  - Verification Status:', joedevVerification.verificationStatus);
    
    const completedCount = Object.values(joedevVerification.completedSteps).filter(step => step).length;
    console.log(`📈 Total: ${completedCount}/6 steps completed`);
    
    if (completedCount === 6 && joedevVerification.progressPercentage === 100) {
      console.log('🎉 SUCCESS: All 6 steps are complete and showing 100%!');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

forceCompleteVerification();
