require('dotenv').config();
const { connectDB, isConnected, getConnectionInfo, retryConnection } = require('./src/config/database');

async function testConnection() {
  console.log('🧪 Testing MongoDB connection...');
  
  // Attempt initial connection
  await connectDB();
  
  // Check connection status
  console.log('📊 Connection Status:', getConnectionInfo());
  
  if (!isConnected()) {
    console.log('🔄 Initial connection failed, attempting retry...');
    const success = await retryConnection(3, 3000);
    
    if (!success) {
      console.log('❌ Unable to establish database connection');
      process.exit(1);
    }
  }
  
  console.log('✅ Database connection test completed successfully');
  process.exit(0);
}

testConnection().catch(error => {
  console.error('❌ Connection test failed:', error);
  process.exit(1);
});
