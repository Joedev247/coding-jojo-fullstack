#!/bin/bash

# SMS Setup Script for CodingJojo Backend
echo "🚀 SMS Configuration Setup for CodingJojo"
echo "========================================"

echo ""
echo "📱 This script will help you set up SMS functionality."
echo "   You have several options:"
echo ""
echo "   1. Twilio (Recommended - Most reliable)"
echo "   2. Nexmo/Vonage (Good alternative)"
echo "   3. Infobip (Great for international)"
echo "   4. Local Cameroon provider"
echo ""

# Check current configuration
if grep -q "SMS_PROVIDER=mock" .env; then
    echo "⚠️  Current configuration: MOCK mode (development only)"
    echo "   Real SMS messages will NOT be sent."
else
    current_provider=$(grep "SMS_PROVIDER=" .env | cut -d'=' -f2)
    echo "✅ Current configuration: $current_provider"
fi

echo ""
echo "🔧 Setup Options:"
echo "=================="

echo ""
echo "Option 1: TWILIO SETUP (Recommended)"
echo "------------------------------------"
echo "1. Go to: https://www.twilio.com/try-twilio"
echo "2. Create a free account"
echo "3. Get your Account SID and Auth Token from the dashboard"
echo "4. Get a phone number with SMS capability"
echo "5. Update your .env file with:"
echo ""
echo "   SMS_PROVIDER=twilio"
echo "   TWILIO_ACCOUNT_SID=your_account_sid"
echo "   TWILIO_AUTH_TOKEN=your_auth_token"
echo "   TWILIO_FROM_NUMBER=+1234567890"
echo ""

echo "Option 2: NEXMO SETUP"
echo "--------------------"
echo "1. Go to: https://dashboard.nexmo.com/sign-up"
echo "2. Create an account"
echo "3. Get your API Key and Secret"
echo "4. Update your .env file with:"
echo ""
echo "   SMS_PROVIDER=nexmo"
echo "   NEXMO_API_KEY=your_api_key"
echo "   NEXMO_API_SECRET=your_api_secret"
echo "   NEXMO_FROM_NAME=CodingJojo"
echo ""

echo "Option 3: INFOBIP SETUP"
echo "----------------------"
echo "1. Go to: https://www.infobip.com/"
echo "2. Create an account"
echo "3. Get your API Key"
echo "4. Update your .env file with:"
echo ""
echo "   SMS_PROVIDER=infobip"
echo "   INFOBIP_API_KEY=your_api_key"
echo "   INFOBIP_BASE_URL=https://api.infobip.com"
echo "   INFOBIP_FROM_NUMBER=your_sender_id"
echo ""

echo "📋 AFTER SETUP:"
echo "==============="
echo "1. Save your .env file"
echo "2. Restart your backend server"
echo "3. Test with: npm run test-sms"
echo "4. Try phone verification in your app"
echo ""

echo "💡 Need help? Check SMS_SETUP_GUIDE.md for detailed instructions"
