require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔄 Testing MongoDB Connection...');
console.log('📍 MongoDB URI:', process.env.MONGODB_URI ? 'Set (hidden for security)' : 'Not set');
console.log('🌍 Environment:', process.env.NODE_ENV || 'Not set');

async function testConnection() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-jojo';
    
    console.log('\n🔍 Connection Details:');
    console.log('- Using URI pattern:', mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // 15 second timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 15000,
      maxPoolSize: 5,
      retryWrites: true,
      w: 'majority'
    };

    console.log('\n⏱️ Attempting connection with 15-second timeout...');
    const startTime = Date.now();
    
    const conn = await mongoose.connect(mongoURI, options);
    const connectionTime = Date.now() - startTime;
    
    console.log(`\n✅ SUCCESS! Connected in ${connectionTime}ms`);
    console.log('📊 Connection Details:');
    console.log(`   - Host: ${conn.connection.host}`);
    console.log(`   - Database: ${conn.connection.name}`);
    console.log(`   - Port: ${conn.connection.port}`);
    console.log(`   - Ready State: ${conn.connection.readyState}`);
    
    // Test a simple operation
    console.log('\n🧪 Testing database operation...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`   - Collections found: ${collections.length}`);
    
    console.log('\n✅ Database connection test completed successfully!');
    
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
    
  } catch (error) {
    console.log(`\n❌ CONNECTION FAILED after ${Date.now() - (global.startTime || Date.now())}ms`);
    console.error('Error:', error.message);
    
    // Provide specific troubleshooting guidance
    console.log('\n🛠️ TROUBLESHOOTING GUIDE:');
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('🌐 NETWORK ISSUE:');
      console.log('   - Check your internet connection');
      console.log('   - Verify the MongoDB Atlas cluster hostname');
      console.log('   - Check if your ISP blocks MongoDB ports');
    } else if (error.message.includes('Authentication failed')) {
      console.log('🔐 AUTHENTICATION ISSUE:');
      console.log('   - Verify your MongoDB username and password');
      console.log('   - Check if the user has proper permissions');
      console.log('   - Ensure special characters in password are URL-encoded');
    } else if (error.message.includes('timeout') || error.message.includes('timed out')) {
      console.log('⏱️ TIMEOUT ISSUE:');
      console.log('   - Your IP might not be whitelisted in MongoDB Atlas');
      console.log('   - Network latency might be too high');
      console.log('   - MongoDB Atlas cluster might be paused/sleeping');
    } else if (error.message.includes('connection attempt failed')) {
      console.log('🔌 CONNECTION ISSUE:');
      console.log('   - MongoDB Atlas cluster might be down');
      console.log('   - Check MongoDB Atlas status page');
      console.log('   - Verify cluster is in the correct region');
    }
    
    console.log('\n📋 QUICK FIXES TO TRY:');
    console.log('   1. Add 0.0.0.0/0 to IP whitelist (temporarily)');
    console.log('   2. Check MongoDB Atlas cluster status');
    console.log('   3. Try connecting from MongoDB Compass');
    console.log('   4. Verify .env file is properly loaded');
    
    process.exit(1);
  }
}

// Set global start time for timing
global.startTime = Date.now();

testConnection();
