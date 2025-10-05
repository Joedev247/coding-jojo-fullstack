const mongoose = require('mongoose');
const User = require('./src/models/User');
const InstructorVerification = require('./src/models/InstructorVerification');
require('dotenv').config();

async function migrateEducationCertificateField() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected to MongoDB');
    
    // Update all verification records to add the educationCertificate field
    const result = await mongoose.connection.db.collection('instructor_verifications').updateMany(
      {},
      {
        $set: {
          'completedSteps.educationCertificate': false
        }
      }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} verification records with educationCertificate field`);
    
    // Now check each record and update based on their actual education verification status
    const verifications = await InstructorVerification.find();
    
    for (const verification of verifications) {
      if (verification.educationVerification && verification.educationVerification.certificates?.length > 0) {
        // Update the education status based on existing data
        verification.updateEducationStatus();
        await verification.save();
        console.log(`📚 Updated education status for instructor ${verification.instructor}`);
      }
    }
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

migrateEducationCertificateField();
