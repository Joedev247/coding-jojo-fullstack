const axios = require('axios');
const crypto = require('crypto');

class MobileMoneyService {
  constructor() {
    this.providers = {
      // Orange Money (Cameroon, Other African countries)
      orange: {
        apiUrl: process.env.ORANGE_MONEY_API_URL,
        clientId: process.env.ORANGE_MONEY_CLIENT_ID,
        clientSecret: process.env.ORANGE_MONEY_CLIENT_SECRET,
        merchantKey: process.env.ORANGE_MONEY_MERCHANT_KEY
      },
      // MTN Mobile Money (Cameroon, Ghana, Uganda, etc.)
      mtn: {
        apiUrl: process.env.MTN_MOMO_API_URL,
        userId: process.env.MTN_MOMO_USER_ID,
        apiKey: process.env.MTN_MOMO_API_KEY,
        subscriptionKey: process.env.MTN_MOMO_SUBSCRIPTION_KEY,
        targetEnvironment: process.env.MTN_MOMO_TARGET_ENVIRONMENT || 'sandbox'
      },
      // Airtel Money
      airtel: {
        apiUrl: process.env.AIRTEL_MONEY_API_URL,
        clientId: process.env.AIRTEL_MONEY_CLIENT_ID,
        clientSecret: process.env.AIRTEL_MONEY_CLIENT_SECRET
      },
      // Flutterwave (Multi-provider)
      flutterwave: {
        apiUrl: 'https://api.flutterwave.com/v3',
        secretKey: process.env.FLUTTERWAVE_SECRET_KEY,
        publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY
      }
    };
  }

  // Orange Money Integration
  async processOrangeMoneyPayment(paymentData) {
    try {
      const { amount, phoneNumber, courseId, userId, reference } = paymentData;
      
      // Get access token
      const authResponse = await axios.post(`${this.providers.orange.apiUrl}/oauth/v3/token`, {
        grant_type: 'client_credentials'
      }, {
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `${this.providers.orange.clientId}:${this.providers.orange.clientSecret}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const accessToken = authResponse.data.access_token;

      // Initiate payment
      const paymentResponse = await axios.post(
        `${this.providers.orange.apiUrl}/orange-money-webpay/dev/v1/webpayment`,
        {
          merchant_key: this.providers.orange.merchantKey,
          currency: 'XAF', // Central African CFA Franc
          order_id: reference,
          amount: amount,
          return_url: `${process.env.FRONTEND_URL}/payment/success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
          notif_url: `${process.env.BACKEND_URL}/api/payments/orange/webhook`,
          lang: 'fr', // French for Cameroon
          reference: `COURSE_${courseId}_USER_${userId}_${Date.now()}`
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        paymentUrl: paymentResponse.data.payment_url,
        transactionId: paymentResponse.data.pay_token,
        provider: 'orange'
      };
    } catch (error) {
      console.error('Orange Money payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Orange Money payment failed'
      };
    }
  }

  // MTN Mobile Money Integration
  async processMTNMoMoPayment(paymentData) {
    try {
      const { amount, phoneNumber, courseId, userId, reference } = paymentData;
      
      // Create API user (if not exists)
      const apiUser = await this.createMTNApiUser();
      
      // Get access token
      const tokenResponse = await axios.post(
        `${this.providers.mtn.apiUrl}/collection/token/`,
        {},
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(
              `${apiUser.userId}:${apiUser.apiKey}`
            ).toString('base64')}`,
            'Ocp-Apim-Subscription-Key': this.providers.mtn.subscriptionKey
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      // Request payment
      const transactionId = this.generateTransactionId();
      const paymentResponse = await axios.post(
        `${this.providers.mtn.apiUrl}/collection/v1_0/requesttopay`,
        {
          amount: amount.toString(),
          currency: 'XAF',
          externalId: reference,
          payer: {
            partyIdType: 'MSISDN',
            partyId: phoneNumber.replace('+', '')
          },
          payerMessage: `Payment for course enrollment - Coding Jojo`,
          payeeNote: `Course: ${courseId}, User: ${userId}`
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Reference-Id': transactionId,
            'X-Target-Environment': this.providers.mtn.targetEnvironment,
            'Ocp-Apim-Subscription-Key': this.providers.mtn.subscriptionKey,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        transactionId,
        provider: 'mtn',
        status: 'pending'
      };
    } catch (error) {
      console.error('MTN MoMo payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'MTN MoMo payment failed'
      };
    }
  }

  // Flutterwave Mobile Money Integration
  async processFlutterwavePayment(paymentData) {
    try {
      const { amount, phoneNumber, courseId, userId, reference, country = 'CM' } = paymentData;
      
      const paymentResponse = await axios.post(
        `${this.providers.flutterwave.apiUrl}/charges?type=mobile_money_${country.toLowerCase()}`,
        {
          tx_ref: reference,
          amount,
          currency: country === 'CM' ? 'XAF' : 'USD',
          phone_number: phoneNumber,
          email: `user${userId}@codingjojo.com`,
          fullname: 'Coding Jojo Student',
          redirect_url: `${process.env.FRONTEND_URL}/payment/success`,
          meta: {
            courseId,
            userId,
            platform: 'coding_jojo'
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.providers.flutterwave.secretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        paymentUrl: paymentResponse.data.data.link,
        transactionId: paymentResponse.data.data.flw_ref,
        provider: 'flutterwave'
      };
    } catch (error) {
      console.error('Flutterwave payment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Flutterwave payment failed'
      };
    }
  }

  // Check payment status for different providers
  async checkPaymentStatus(transactionId, provider) {
    try {
      switch (provider) {
        case 'orange':
          return await this.checkOrangeMoneyStatus(transactionId);
        case 'mtn':
          return await this.checkMTNMoMoStatus(transactionId);
        case 'flutterwave':
          return await this.checkFlutterwaveStatus(transactionId);
        default:
          return { success: false, error: 'Unknown provider' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async checkOrangeMoneyStatus(payToken) {
    try {
      // Get access token first
      const authResponse = await axios.post(`${this.providers.orange.apiUrl}/oauth/v3/token`, {
        grant_type: 'client_credentials'
      }, {
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `${this.providers.orange.clientId}:${this.providers.orange.clientSecret}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const accessToken = authResponse.data.access_token;

      const statusResponse = await axios.get(
        `${this.providers.orange.apiUrl}/orange-money-webpay/dev/v1/webpayment/${payToken}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      const status = statusResponse.data.status;
      return {
        success: true,
        status: status === 'SUCCESS' ? 'completed' : status.toLowerCase(),
        data: statusResponse.data
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async checkMTNMoMoStatus(transactionId) {
    try {
      const apiUser = await this.getMTNApiUser();
      const tokenResponse = await axios.post(
        `${this.providers.mtn.apiUrl}/collection/token/`,
        {},
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(
              `${apiUser.userId}:${apiUser.apiKey}`
            ).toString('base64')}`,
            'Ocp-Apim-Subscription-Key': this.providers.mtn.subscriptionKey
          }
        }
      );

      const accessToken = tokenResponse.data.access_token;

      const statusResponse = await axios.get(
        `${this.providers.mtn.apiUrl}/collection/v1_0/requesttopay/${transactionId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Target-Environment': this.providers.mtn.targetEnvironment,
            'Ocp-Apim-Subscription-Key': this.providers.mtn.subscriptionKey
          }
        }
      );

      return {
        success: true,
        status: statusResponse.data.status.toLowerCase(),
        data: statusResponse.data
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async checkFlutterwaveStatus(transactionId) {
    try {
      const statusResponse = await axios.get(
        `${this.providers.flutterwave.apiUrl}/transactions/${transactionId}/verify`,
        {
          headers: {
            'Authorization': `Bearer ${this.providers.flutterwave.secretKey}`
          }
        }
      );

      return {
        success: true,
        status: statusResponse.data.data.status.toLowerCase(),
        data: statusResponse.data.data
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Helper methods
  generateTransactionId() {
    return crypto.randomUUID();
  }

  async createMTNApiUser() {
    // Implementation for creating MTN API user
    // This is typically done once during setup
    return {
      userId: this.providers.mtn.userId,
      apiKey: this.providers.mtn.apiKey
    };
  }

  async getMTNApiUser() {
    return {
      userId: this.providers.mtn.userId,
      apiKey: this.providers.mtn.apiKey
    };
  }

  // Get available payment methods based on country
  getAvailablePaymentMethods(countryCode) {
    const methods = [];

    switch (countryCode) {
      case 'CM': // Cameroon
        methods.push(
          { provider: 'orange', name: 'Orange Money', logo: '/images/orange-money.png' },
          { provider: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn-momo.png' }
        );
        break;
      case 'GH': // Ghana
        methods.push(
          { provider: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn-momo.png' },
          { provider: 'airtel', name: 'AirtelTigo Money', logo: '/images/airtel-money.png' }
        );
        break;
      case 'UG': // Uganda
        methods.push(
          { provider: 'mtn', name: 'MTN Mobile Money', logo: '/images/mtn-momo.png' },
          { provider: 'airtel', name: 'Airtel Money', logo: '/images/airtel-money.png' }
        );
        break;
      default:
        methods.push(
          { provider: 'flutterwave', name: 'Mobile Money', logo: '/images/flutterwave.png' }
        );
    }

    return methods;
  }
}

module.exports = new MobileMoneyService();
