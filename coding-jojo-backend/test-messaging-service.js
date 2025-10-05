const { SMSService } = require('./src/utils/smsService');
require('dotenv').config();

async function testMessagingService() {
  console.log('🧪 Testing Messaging Service Configuration');
  console.log('==========================================\n');

  const smsService = new SMSService();
  
  console.log('📋 Current Configuration:');
  console.log('Messaging Service SID:', process.env.TWILIO_MESSAGING_SERVICE_SID || 'Not configured');
  console.log('Alpha Sender ID:', process.env.TWILIO_SENDER_ID || 'Not set');
  console.log('Phone Number:', process.env.TWILIO_FROM_NUMBER || 'Not set');
  
  console.log('\n🎯 Will Use:');
  if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
    console.log('✅ Messaging Service → Should show CODING JOJO');
  } else {
    console.log('📞 Phone Number → Will show phone number');
  }

  try {
    const result = await smsService.sendSMS('+237673746133', 'Test from CODING JOJO Messaging Service!');
    console.log('\n✅ SMS Sent:', result.messageId);
    console.log('📤 From:', result.from || 'Messaging Service');
    console.log('\n📱 Check your phone for SMS from "CODING JOJO"!');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.message.includes('Trial')) {
      console.log('\n💡 Solution: You need to upgrade your Twilio account to paid');
      console.log('📞 Alternative: Use phone number (current behavior)');
    }
  }
}

testMessagingService();
