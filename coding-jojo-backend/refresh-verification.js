const mongoose = require('mongoose');
const InstructorVerification = require('./src/models/InstructorVerification');
const User = require('./src/models/User');
require('dotenv').config();

async function refreshVerificationStatus() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Find Joedev's verification
    const verification = await InstructorVerification.findOne({}).populate('instructor', 'name email');
    const allVerifications = await InstructorVerification.find({}).populate('instructor', 'name email');
    const joedevVerification = allVerifications.find(v => v.instructor?.name === 'Joedev');
    
    if (!joedevVerification) {
      console.log('❌ Joedev verification not found');
      process.exit();
    }
    
    console.log('👤 Refreshing verification for:', joedevVerification.instructor.name);
    console.log('📊 Current progress before refresh:', joedevVerification.progressPercentage + '%');
    console.log('🎓 Education certificates:', joedevVerification.educationVerification?.certificates?.length || 0);
    
    // Force call the updateEducationStatus method
    if (joedevVerification.educationVerification?.certificates?.length > 0) {
      joedevVerification.updateEducationStatus();
    }
    
    // Force save to trigger pre-save hook
    joedevVerification.markModified('educationVerification');
    await joedevVerification.save();
    
    console.log('✅ Verification refreshed!');
    console.log('📊 New progress:', joedevVerification.progressPercentage + '%');
    console.log('🎯 New status:', joedevVerification.verificationStatus);
    console.log('🎓 Education Certificate Step:', joedevVerification.completedSteps.educationCertificate ? '✅' : '❌');
    
    const completedCount = Object.values(joedevVerification.completedSteps).filter(step => step).length;
    console.log(`📈 Total: ${completedCount}/6 steps completed`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

refreshVerificationStatus();
