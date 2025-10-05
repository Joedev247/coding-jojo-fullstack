const mongoose = require('mongoose');
require('dotenv').config();

async function directDBCheck() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected to MongoDB');
    
    // Direct database query - bypass Mongoose
    const rawData = await mongoose.connection.db.collection('instructor_verifications')
      .findOne({instructor: new mongoose.Types.ObjectId('68ae204866821cf9f207345d')});
    
    console.log('📋 Raw Database Data:');
    console.log('- _id:', rawData._id);
    console.log('- completedSteps:', rawData.completedSteps);
    console.log('- educationVerification exists:', !!rawData.educationVerification);
    
    if (rawData.educationVerification) {
      console.log('- educationVerification:', {
        certificatesCount: rawData.educationVerification.certificates?.length || 0,
        overallStatus: rawData.educationVerification.overallStatus,
        minimumRequirementMet: rawData.educationVerification.minimumRequirementMet
      });
      
      if (rawData.educationVerification.certificates?.length > 0) {
        console.log('📚 First Certificate:');
        const cert = rawData.educationVerification.certificates[0];
        console.log('  - certificateType:', cert.certificateType);
        console.log('  - institutionName:', cert.institutionName);
        console.log('  - verificationStatus:', cert.verificationStatus);
        console.log('  - has certificateDocument:', !!cert.certificateDocument);
        if (cert.certificateDocument) {
          console.log('  - document URL:', cert.certificateDocument.url);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

directDBCheck();
