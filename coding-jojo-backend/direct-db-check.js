const mongoose = require('mongoose');
require('dotenv').config();

async function directDatabaseCheck() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo');
    console.log('Connected to MongoDB');
    
    // Direct database query without models
    const db = mongoose.connection.db;
    
    // List all collections first
    const collections = await db.listCollections().toArray();
    console.log('Available collections:');
    collections.forEach(col => console.log('-', col.name));
    
    // Try different collection names
    const possibleNames = ['instructorverifications', 'instructor_verifications', 'verifications'];
    
    for (const collectionName of possibleNames) {
      console.log(`\n📊 Checking collection: ${collectionName}`);
      const collection = db.collection(collectionName);
      const count = await collection.countDocuments();
      console.log(`Found ${count} documents`);
      
      if (count > 0) {
        const verifications = await collection.find({}).toArray();
        
        for (const verification of verifications) {
          console.log('Record:', verification._id);
          console.log('- Instructor ID:', verification.instructor);
          console.log('- Completed Steps:', verification.completedSteps);
          console.log('- Education Verification exists:', !!verification.educationVerification);
          if (verification.educationVerification) {
            console.log('  - Certificates:', verification.educationVerification.certificates?.length || 0);
            console.log('  - Status:', verification.educationVerification.overallStatus);
          }
          
          // Calculate steps manually
          const steps = verification.completedSteps || {};
          const completedCount = Object.values(steps).filter(step => step).length;
          const totalSteps = Object.keys(steps).length;
          const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
          
          console.log(`📈 Manual Calculation: ${completedCount}/${totalSteps} = ${progressPercent}%`);
          console.log('=' .repeat(30));
        }
        break;
      }
    }
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

directDatabaseCheck();
