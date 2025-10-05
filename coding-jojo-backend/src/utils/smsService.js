const axios = require('axios');
const crypto = require('crypto');

// SMS Service Configuration
// You can use different SMS providers based on your preference and location

class SMSService {
  constructor() {
    this.provider = process.env.SMS_PROVIDER || 'mock'; // Default to mock for development
    this.config = this.getProviderConfig();
  }

  getProviderConfig() {
    switch (this.provider) {
      case 'mock':
        // Development mode - simulate SMS without actually sending
        return {
          enabled: true,
          mock: true
        };
      
      case 'twilio':
        return {
          accountSid: process.env.TWILIO_ACCOUNT_SID,
          authToken: process.env.TWILIO_AUTH_TOKEN,
          fromNumber: process.env.TWILIO_FROM_NUMBER || '+1234567890'
        };
      
      case 'nexmo':
        return {
          apiKey: process.env.NEXMO_API_KEY,
          apiSecret: process.env.NEXMO_API_SECRET,
          fromName: process.env.NEXMO_FROM_NAME || 'CodingJojo'
        };
      
      case 'infobip':
        return {
          apiKey: process.env.INFOBIP_API_KEY,
          baseUrl: process.env.INFOBIP_BASE_URL || 'https://api.infobip.com',
          fromNumber: process.env.INFOBIP_FROM_NUMBER
        };
      
      case 'local':
        // For Cameroon local SMS providers
        return {
          apiKey: process.env.LOCAL_SMS_API_KEY,
          apiSecret: process.env.LOCAL_SMS_API_SECRET,
          baseUrl: process.env.LOCAL_SMS_BASE_URL,
          fromName: 'CodingJojo'
        };
      
      default:
        throw new Error(`Unsupported SMS provider: ${this.provider}`);
    }
  }

  async sendSMS(phoneNumber, message) {
    try {
      switch (this.provider) {
        case 'mock':
          return await this.sendViaMock(phoneNumber, message);
        
        case 'twilio':
          return await this.sendViaTwilio(phoneNumber, message);
        
        case 'nexmo':
          return await this.sendViaNexmo(phoneNumber, message);
        
        case 'infobip':
          return await this.sendViaInfobip(phoneNumber, message);
        
        case 'local':
          return await this.sendViaLocal(phoneNumber, message);
        
        default:
          throw new Error(`SMS provider not configured: ${this.provider}`);
      }
    } catch (error) {
      console.error('SMS sending failed:', error);
      throw error;
    }
  }

  async sendViaMock(phoneNumber, message) {
    // Development mode - simulate SMS without actually sending
    console.log('📱 MOCK SMS SERVICE - Development Mode');
    console.log('📧 To:', phoneNumber);
    console.log('💬 Message:', message);
    console.log('✅ SMS simulated successfully (not actually sent)');
    
    // Simulate a delay like real SMS services
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      messageId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      provider: 'mock',
      cost: '0.00',
      status: 'delivered',
      note: 'This is a mock SMS for development. No actual SMS was sent.'
    };
  }

  async sendViaTwilio(phoneNumber, message) {
    if (!this.config.accountSid || !this.config.authToken) {
      throw new Error('Twilio credentials not configured');
    }

    const twilio = require('twilio')(this.config.accountSid, this.config.authToken);

    try {
      const result = await twilio.messages.create({
        body: message,
        from: this.config.fromNumber,
        to: phoneNumber
      });

      return {
        success: true,
        messageId: result.sid,
        provider: 'twilio',
        cost: result.price,
        status: result.status
      };
    } catch (error) {
      throw new Error(`Twilio SMS failed: ${error.message}`);
    }
  }

  async sendViaNexmo(phoneNumber, message) {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('Nexmo credentials not configured');
    }

    const { Vonage } = require('@vonage/server-sdk');

    const vonage = new Vonage({
      apiKey: this.config.apiKey,
      apiSecret: this.config.apiSecret
    });

    try {
      const result = await vonage.sms.send({
        to: phoneNumber.replace('+', ''),
        from: this.config.fromName,
        text: message
      });

      if (result.messages[0].status === '0') {
        return {
          success: true,
          messageId: result.messages[0]['message-id'],
          provider: 'nexmo',
          cost: result.messages[0]['message-price'],
          status: 'sent'
        };
      } else {
        throw new Error(`Nexmo error: ${result.messages[0]['error-text']}`);
      }
    } catch (error) {
      throw new Error(`Nexmo SMS failed: ${error.message}`);
    }
  }

  async sendViaInfobip(phoneNumber, message) {
    if (!this.config.apiKey) {
      throw new Error('Infobip credentials not configured');
    }

    try {
      const response = await axios.post(
        `${this.config.baseUrl}/sms/2/text/advanced`,
        {
          messages: [{
            from: this.config.fromNumber || 'CodingJojo',
            destinations: [{
              to: phoneNumber.replace('+', '')
            }],
            text: message
          }]
        },
        {
          headers: {
            'Authorization': `App ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      const result = response.data;
      
      if (result.messages && result.messages.length > 0) {
        const messageResult = result.messages[0];
        return {
          success: true,
          messageId: messageResult.messageId,
          provider: 'infobip',
          status: messageResult.status?.name || 'sent'
        };
      } else {
        throw new Error('No message results returned from Infobip');
      }
    } catch (error) {
      if (error.response) {
        throw new Error(`Infobip SMS failed: ${error.response.data.requestError?.serviceException?.text || error.message}`);
      } else {
        throw new Error(`Infobip SMS failed: ${error.message}`);
      }
    }
  }

  async sendViaLocal(phoneNumber, message) {
    // Implementation for local Cameroon SMS providers
    // This is a generic implementation - adjust based on your local provider's API
    
    if (!this.config.apiKey || !this.config.baseUrl) {
      throw new Error('Local SMS provider credentials not configured');
    }

    try {
      // Clean phone number (remove + and ensure it starts with country code)
      let cleanPhoneNumber = phoneNumber.replace('+', '');
      if (cleanPhoneNumber.startsWith('237')) {
        cleanPhoneNumber = cleanPhoneNumber;
      } else if (cleanPhoneNumber.startsWith('6')) {
        cleanPhoneNumber = '237' + cleanPhoneNumber;
      } else {
        throw new Error('Invalid Cameroon phone number format');
      }

      // Generate signature if required (common for local providers)
      const timestamp = Date.now();
      const signature = crypto
        .createHmac('sha256', this.config.apiSecret || '')
        .update(`${this.config.apiKey}${cleanPhoneNumber}${message}${timestamp}`)
        .digest('hex');

      const response = await axios.post(
        `${this.config.baseUrl}/send-sms`,
        {
          api_key: this.config.apiKey,
          to: cleanPhoneNumber,
          message: message,
          from: this.config.fromName,
          timestamp: timestamp,
          signature: signature
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data.success || response.data.status === 'success') {
        return {
          success: true,
          messageId: response.data.message_id || response.data.id,
          provider: 'local',
          status: response.data.status || 'sent'
        };
      } else {
        throw new Error(`Local SMS provider error: ${response.data.message || response.data.error}`);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(`Local SMS failed: ${error.response.data.message || error.response.data.error || error.message}`);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('SMS request timeout - please try again');
      } else {
        throw new Error(`Local SMS failed: ${error.message}`);
      }
    }
  }

  // Utility method to validate phone number format
  validatePhoneNumber(phoneNumber, countryCode = '+237') {
    // Remove all non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Check if it already includes country code
    if (cleaned.startsWith('+')) {
      return cleaned;
    }
    
    // For Cameroon numbers specifically
    if (countryCode === '+237') {
      if (cleaned.startsWith('237')) {
        return '+' + cleaned;
      } else if (cleaned.startsWith('6') && cleaned.length === 9) {
        return '+237' + cleaned;
      } else {
        throw new Error('Invalid Cameroon phone number format. Should be 9 digits starting with 6.');
      }
    }
    
    // For other countries, just prepend the country code
    return countryCode + cleaned;
  }

  // Method to check SMS delivery status (if supported by provider)
  async checkDeliveryStatus(messageId) {
    try {
      switch (this.provider) {
        case 'twilio':
          const twilio = require('twilio')(this.config.accountSid, this.config.authToken);
          const message = await twilio.messages(messageId).fetch();
          return {
            messageId,
            status: message.status,
            errorCode: message.errorCode,
            errorMessage: message.errorMessage
          };
        
        case 'infobip':
          const response = await axios.get(
            `${this.config.baseUrl}/sms/1/reports`,
            {
              headers: {
                'Authorization': `App ${this.config.apiKey}`,
                'Accept': 'application/json'
              },
              params: {
                messageId: messageId
              }
            }
          );
          return response.data;
        
        default:
          return { messageId, status: 'unknown', message: 'Status check not supported for this provider' };
      }
    } catch (error) {
      console.error('Failed to check SMS delivery status:', error);
      return { messageId, status: 'error', error: error.message };
    }
  }

  // Method to get SMS pricing/credits (if supported)
  async getAccountBalance() {
    try {
      switch (this.provider) {
        case 'twilio':
          const twilio = require('twilio')(this.config.accountSid, this.config.authToken);
          const account = await twilio.api.accounts(this.config.accountSid).fetch();
          return {
            balance: account.balance,
            currency: 'USD'
          };
        
        case 'infobip':
          const response = await axios.get(
            `${this.config.baseUrl}/account/1/balance`,
            {
              headers: {
                'Authorization': `App ${this.config.apiKey}`,
                'Accept': 'application/json'
              }
            }
          );
          return response.data;
        
        default:
          return { message: 'Balance check not supported for this provider' };
      }
    } catch (error) {
      console.error('Failed to get account balance:', error);
      return { error: error.message };
    }
  }
}

// Create and export singleton instance
const smsService = new SMSService();

// Helper function for backward compatibility
const sendSMS = async (phoneNumber, message) => {
  return await smsService.sendSMS(phoneNumber, message);
};

module.exports = {
  SMSService,
  smsService,
  sendSMS
};
