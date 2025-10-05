// Test Cloudinary Configuration
require('dotenv').config();
const { cloudinary } = require('./src/config/cloudinary');

async function testCloudinaryConnection() {
  console.log('🧪 Testing Cloudinary Connection...\n');
  
  try {
    // Test basic connection
    console.log('1️⃣ Testing basic API connection...');
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary ping successful:', result);
    
    // Test credentials
    console.log('\n2️⃣ Testing account details...');
    const resources = await cloudinary.api.resources({ max_results: 1 });
    console.log('✅ Can access resources. Account is valid.');
    console.log('Resource count:', resources.resources.length);
    
    console.log('\n🎉 Cloudinary connection is working correctly!');
    return true;
    
  } catch (error) {
    console.error('❌ Cloudinary connection failed:');
    console.error('Error:', error.message);
    console.error('HTTP Code:', error.http_code);
    
    if (error.http_code === 401) {
      console.error('\n🔑 AUTHENTICATION ISSUE:');
      console.error('- Check CLOUDINARY_CLOUD_NAME');
      console.error('- Check CLOUDINARY_API_KEY'); 
      console.error('- Check CLOUDINARY_API_SECRET');
      console.error('\n💡 These should match your Cloudinary Dashboard credentials');
    }
    
    return false;
  }
}

// Test upload signature generation
async function testSignatureGeneration() {
  console.log('\n🔐 Testing signature generation...');
  
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const params = {
      timestamp: timestamp,
      folder: 'test_folder',
      public_id: 'test_image'
    };
    
    // This will test if signature generation works
    const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);
    console.log('✅ Signature generation works');
    console.log('Sample signature:', signature.substring(0, 10) + '...');
    
  } catch (error) {
    console.error('❌ Signature generation failed:', error.message);
  }
}

async function main() {
  console.log('=== CLOUDINARY DIAGNOSTIC TEST ===\n');
  
  console.log('📋 Current Configuration:');
  console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('API Key:', process.env.CLOUDINARY_API_KEY);
  console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '***SET***' : 'MISSING');
  console.log('');
  
  await testCloudinaryConnection();
  await testSignatureGeneration();
  
  console.log('\n=== END TEST ===');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testCloudinaryConnection };
