const { SMSService } = require('./src/utils/smsService');

// Simple SMS test script
async function testSMSConfiguration() {
  console.log('🧪 Testing SMS Configuration...');
  console.log('================================');

  const smsService = new SMSService();
  
  console.log(`📱 SMS Provider: ${process.env.SMS_PROVIDER || 'mock'}`);
  
  // Test phone number (replace with your actual number)
  const testPhoneNumber = process.argv[2] || '+237XXXXXXXXX'; // Replace with your number
  const testMessage = 'Hello from CodingJojo! Your SMS configuration is working correctly. 🎉';

  if (testPhoneNumber === '+237XXXXXXXXX') {
    console.log('⚠️  Please provide your phone number as an argument:');
    console.log('   node test-sms.js +237612345678');
    console.log('   (Replace with your actual Cameroon phone number)');
    console.log('');
    return;
  }

  try {
    console.log(`📤 Sending test SMS to: ${testPhoneNumber}`);
    
    const result = await smsService.sendSMS(testPhoneNumber, testMessage);
    
    if (result.success) {
      console.log('✅ SMS sent successfully!');
      console.log('📋 Result:', result);
      
      if (result.mock) {
        console.log('⚠️  Note: This was a mock SMS (development mode)');
        console.log('💡 To send real SMS, configure a real provider in your .env file');
      } else {
        console.log('🎉 Real SMS sent! Check your phone.');
      }
    } else {
      console.log('❌ SMS failed to send');
      console.log('📋 Error:', result.error);
    }
    
  } catch (error) {
    console.log('❌ SMS test failed:');
    console.error(error.message);
    
    // Provide helpful error messages
    if (error.message.includes('Account')) {
      console.log('💡 Check your account credentials in .env file');
    } else if (error.message.includes('phone number')) {
      console.log('💡 Make sure your phone number is in international format (+237...)');
    } else if (error.message.includes('not verified')) {
      console.log('💡 You may need to verify the recipient phone number in your SMS provider dashboard');
    }
  }

  console.log('\n🔧 Configuration Check:');
  console.log('=======================');
  
  switch (process.env.SMS_PROVIDER) {
    case 'twilio':
      console.log('✅ Provider: Twilio');
      console.log(`📱 From Number: ${process.env.TWILIO_FROM_NUMBER || 'NOT SET'}`);
      console.log(`🔑 Account SID: ${process.env.TWILIO_ACCOUNT_SID ? 'SET' : 'NOT SET'}`);
      console.log(`🔐 Auth Token: ${process.env.TWILIO_AUTH_TOKEN ? 'SET' : 'NOT SET'}`);
      break;
      
    case 'nexmo':
      console.log('✅ Provider: Nexmo/Vonage');
      console.log(`🔑 API Key: ${process.env.NEXMO_API_KEY ? 'SET' : 'NOT SET'}`);
      console.log(`🔐 API Secret: ${process.env.NEXMO_API_SECRET ? 'SET' : 'NOT SET'}`);
      console.log(`📱 From Name: ${process.env.NEXMO_FROM_NAME || 'CodingJojo'}`);
      break;
      
    case 'infobip':
      console.log('✅ Provider: Infobip');
      console.log(`🔑 API Key: ${process.env.INFOBIP_API_KEY ? 'SET' : 'NOT SET'}`);
      console.log(`🌐 Base URL: ${process.env.INFOBIP_BASE_URL || 'https://api.infobip.com'}`);
      console.log(`📱 From Number: ${process.env.INFOBIP_FROM_NUMBER || 'NOT SET'}`);
      break;
      
    case 'local':
      console.log('✅ Provider: Local SMS Service');
      console.log(`🔑 API Key: ${process.env.LOCAL_SMS_API_KEY ? 'SET' : 'NOT SET'}`);
      console.log(`🔐 API Secret: ${process.env.LOCAL_SMS_API_SECRET ? 'SET' : 'NOT SET'}`);
      console.log(`🌐 Base URL: ${process.env.LOCAL_SMS_BASE_URL || 'NOT SET'}`);
      break;
      
    default:
      console.log('⚠️  Provider: Mock (Development Mode)');
      console.log('💡 Set SMS_PROVIDER in .env to use real SMS');
  }
}

// Run the test
testSMSConfiguration().catch(console.error);
