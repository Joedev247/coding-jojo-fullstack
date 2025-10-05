#!/usr/bin/env node

// Test script for SMS functionality
require('dotenv').config({ path: './coding-jojo-backend/.env' });

const { smsService } = require('./coding-jojo-backend/src/utils/smsService.js');

async function testSMS() {
    console.log('🧪 Testing SMS Configuration...\n');
    
    // Display current SMS configuration
    console.log('Current SMS Provider:', process.env.SMS_PROVIDER || 'mock');
    console.log('Twilio Account SID:', process.env.TWILIO_ACCOUNT_SID ? `${process.env.TWILIO_ACCOUNT_SID.substring(0, 8)}...` : 'Not set');
    console.log('Twilio From Number:', process.env.TWILIO_FROM_NUMBER || 'Not set');
    console.log('');
    
    // Test phone number - replace with your actual phone number
    const testPhoneNumber = process.argv[2] || '+237XXXXXXXXX'; // Cameroon format
    const testMessage = 'Hello from CodingJojo! This is a test SMS to verify our SMS configuration is working properly. 🚀';
    
    if (testPhoneNumber === '+237XXXXXXXXX') {
        console.log('⚠️  Please provide a test phone number:');
        console.log('   node test-sms.js +237612345678');
        console.log('   (Replace with your actual phone number)');
        process.exit(1);
    }
    
    try {
        console.log(`📱 Sending test SMS to: ${testPhoneNumber}`);
        console.log(`💬 Message: ${testMessage}\n`);
        
        const result = await smsService.sendSMS(testPhoneNumber, testMessage);
        
        console.log('✅ SMS sent successfully!');
        console.log('📋 Result:', JSON.stringify(result, null, 2));
        
        // If using Twilio, check delivery status after a few seconds
        if (process.env.SMS_PROVIDER === 'twilio' && result.messageId && result.messageId !== result.messageId.startsWith('mock_')) {
            console.log('\n⏳ Checking delivery status in 5 seconds...');
            setTimeout(async () => {
                try {
                    const status = await smsService.checkDeliveryStatus(result.messageId);
                    console.log('📊 Delivery Status:', JSON.stringify(status, null, 2));
                } catch (error) {
                    console.log('ℹ️  Could not check delivery status:', error.message);
                }
            }, 5000);
        }
        
    } catch (error) {
        console.log('❌ SMS sending failed!');
        console.error('Error:', error.message);
        
        // Provide troubleshooting tips
        console.log('\n🔧 Troubleshooting Tips:');
        
        if (process.env.SMS_PROVIDER === 'twilio') {
            console.log('1. Check your Twilio credentials in .env file');
            console.log('2. Ensure TWILIO_FROM_NUMBER is a valid Twilio phone number');
            console.log('3. Verify the destination phone number format (+237XXXXXXXXX)');
            console.log('4. Check your Twilio account balance');
            console.log('5. Ensure your Twilio account is verified for production use');
        } else if (process.env.SMS_PROVIDER === 'mock') {
            console.log('1. You\'re using mock mode - no actual SMS will be sent');
            console.log('2. Change SMS_PROVIDER to "twilio" in .env to send real SMS');
        } else {
            console.log('1. Check your SMS provider configuration');
            console.log('2. Verify all required environment variables are set');
        }
        
        process.exit(1);
    }
}

// Check if all required modules are available
try {
    require('twilio');
    console.log('✅ Twilio module is available');
} catch (error) {
    console.log('⚠️  Twilio module not found. Installing...');
    console.log('Run: cd coding-jojo-backend && npm install twilio');
}

// Run the test
testSMS().catch(console.error);
