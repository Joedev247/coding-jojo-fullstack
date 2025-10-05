const mongoose = require('mongoose');

async function quickFixAllEducationCertificates() {
  try {
    await mongoose.connect('mongodb://localhost:27017/coding_jojo_db');
    console.log('✅ Connected');
    
    // Get all verification records that have education data but missing schema fields
    const result = await mongoose.connection.db.collection('instructor_verifications').updateMany(
      {},
      {
        $set: {
          'completedSteps.educationCertificate': false
        }
      }
    );
    console.log(`Updated ${result.modifiedCount} records with educationCertificate field`);
    
    // Now check for records that have actual education data and update them
    const recordsWithEducation = await mongoose.connection.db.collection('instructor_verifications').find({
      'educationVerification.certificates.0': { $exists: true }
    }).toArray();
    
    console.log(`Found ${recordsWithEducation.length} records with education certificates`);
    
    for (const record of recordsWithEducation) {
      await mongoose.connection.db.collection('instructor_verifications').updateOne(
        { _id: record._id },
        {
          $set: {
            'completedSteps.educationCertificate': true
          }
        }
      );
      console.log(`✅ Fixed record for instructor ${record.instructor}`);
    }
    
    console.log('🎉 All education certificates fixed!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.disconnect();
  }
}

quickFixAllEducationCertificates();
