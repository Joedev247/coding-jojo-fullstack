const mongoose = require('mongoose');
require('dotenv').config();

async function directDatabaseFix() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('instructor_verifications');
    
    // Find the specific instructor record
    const instructorId = new mongoose.Types.ObjectId('68ae204866821cf9f207345d');
    const record = await collection.findOne({ instructor: instructorId });
    
    if (!record) {
      console.log('❌ Instructor verification record not found');
      process.exit();
    }
    
    console.log('👤 Found verification record for instructor:', instructorId);
    console.log('📊 Before update:');
    console.log('  - Completed Steps:', record.completedSteps);
    console.log('  - Education Verification:', !!record.educationVerification);
    
    // Create the education certificate data
    const educationVerification = {
      certificates: [{
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
      }],
      minimumRequirementMet: true,
      overallStatus: 'under_review'
    };
    
    // Update the record directly in the database
    const updateResult = await collection.updateOne(
      { _id: record._id },
      {
        $set: {
          'educationVerification': educationVerification,
          'completedSteps.educationCertificate': true,
          lastUpdatedAt: new Date()
        }
      }
    );
    
    console.log('📝 Update result:', updateResult);
    
    if (updateResult.modifiedCount > 0) {
      console.log('✅ Record updated successfully!');
      
      // Verify the update
      const updatedRecord = await collection.findOne({ _id: record._id });
      console.log('\n📊 After update:');
      console.log('  - Completed Steps:', updatedRecord.completedSteps);
      console.log('  - Education Verification exists:', !!updatedRecord.educationVerification);
      if (updatedRecord.educationVerification) {
        console.log('  - Certificates:', updatedRecord.educationVerification.certificates.length);
        console.log('  - Overall Status:', updatedRecord.educationVerification.overallStatus);
      }
      
      // Calculate progress
      const steps = updatedRecord.completedSteps || {};
      const completedCount = Object.values(steps).filter(step => step).length;
      const totalSteps = Object.keys(steps).length;
      const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
      
      console.log(`📈 Progress: ${completedCount}/${totalSteps} = ${progressPercent}%`);
      
      if (progressPercent === 100) {
        console.log('🎉 SUCCESS: All 6 verification steps are now complete!');
      }
    } else {
      console.log('❌ No records were modified');
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

directDatabaseFix();
