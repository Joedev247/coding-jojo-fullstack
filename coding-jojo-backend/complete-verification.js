const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');
require('dotenv').config();

async function addEducationCertificate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Find the instructor named "Justice Dev" or "Joedev"
    const verification = await InstructorVerification.findOne({}).populate('instructor', 'name email');
    
    // Let's find Justice Dev specifically
    const allVerifications = await InstructorVerification.find({}).populate('instructor', 'name email');
    const justiceVerification = allVerifications.find(v => 
      v.instructor?.name === 'Justice Dev' || v.instructor?.name === 'Joedev'
    );
    
    if (!justiceVerification) {
      console.log('❌ No instructor named Justice Dev or Joedev found');
      console.log('Available instructors:', allVerifications.map(v => v.instructor?.name || v.instructor?.email));
      process.exit();
    }
    
    const targetVerification = justiceVerification;
    
    console.log('👤 Found instructor:', targetVerification.instructor?.name || targetVerification.instructor?.email);
    console.log('📊 Current progress:', targetVerification.progressPercentage + '%');
    
    // Simulate adding an education certificate
    console.log('🎓 Adding education certificate...');
    
    // Initialize education verification if it doesn't exist
    if (!targetVerification.educationVerification) {
      targetVerification.educationVerification = {
        certificates: [],
        minimumRequirementMet: false,
        overallStatus: 'pending'
      };
    }
    
    // Add a mock education certificate
    const mockCertificate = {
      certificateType: 'bachelors_degree',
      institutionName: 'Test University',
      fieldOfStudy: 'Computer Science',
      graduationYear: 2020,
      gpa: 3.8,
      certificateDocument: {
        url: 'https://res.cloudinary.com/example/image/upload/v1234567890/mock_certificate.pdf',
        publicId: 'mock_certificate_123',
        uploadedAt: new Date(),
        fileSize: 1024000,
        mimeType: 'application/pdf'
      },
      verificationStatus: 'verified' // This makes it count as completed
    };
    
    targetVerification.educationVerification.certificates.push(mockCertificate);
    
    // Update education status using the model method
    targetVerification.updateEducationStatus();
    
    // Save the changes
    await targetVerification.save();
    
    console.log('✅ Education certificate added successfully!');
    console.log('📊 New progress:', targetVerification.progressPercentage + '%');
    console.log('🎯 New status:', targetVerification.verificationStatus);
    console.log('🎓 Education Certificate Step:', targetVerification.completedSteps.educationCertificate ? '✅' : '❌');
    
    const completedCount = Object.values(targetVerification.completedSteps).filter(step => step).length;
    console.log(`📈 Total: ${completedCount}/6 steps completed`);
    
    if (completedCount === 6) {
      console.log('🎉 SUCCESS: All 6 verification steps are now complete!');
    } else {
      console.log('⚠️ Still missing some steps');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addEducationCertificate();
