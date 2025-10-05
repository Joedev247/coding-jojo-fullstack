const mongoose = require('mongoose');
require('dotenv').config();

async function migrateVerificationRecords() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('instructor_verifications');
    
    console.log('🔄 Starting migration to add educationCertificate step...\n');
    
    // Get all verification records
    const verifications = await collection.find({}).toArray();
    
    let updatedCount = 0;
    
    for (const verification of verifications) {
      console.log(`📋 Processing record: ${verification._id}`);
      
      // Check if educationCertificate step is missing
      if (!verification.completedSteps.hasOwnProperty('educationCertificate')) {
        console.log('  - Adding educationCertificate step...');
        
        const updateResult = await collection.updateOne(
          { _id: verification._id },
          {
            $set: {
              'completedSteps.educationCertificate': false,
              lastUpdatedAt: new Date()
            }
          }
        );
        
        if (updateResult.modifiedCount > 0) {
          updatedCount++;
          console.log('  ✅ Updated successfully');
        } else {
          console.log('  ❌ Update failed');
        }
      } else {
        console.log('  - Already has educationCertificate step');
      }
    }
    
    console.log(`\n🎉 Migration complete! Updated ${updatedCount} records.`);
    
    // Verify the migration
    console.log('\n🔍 Verification after migration:');
    const updatedRecords = await collection.find({}).toArray();
    
    for (const record of updatedRecords) {
      const steps = record.completedSteps || {};
      const completedCount = Object.values(steps).filter(step => step).length;
      const totalSteps = Object.keys(steps).length;
      const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
      
      console.log(`📊 Record ${record._id}: ${completedCount}/${totalSteps} steps = ${progressPercent}%`);
      console.log(`   Steps: ${Object.keys(steps).join(', ')}`);
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
}

migrateVerificationRecords();
