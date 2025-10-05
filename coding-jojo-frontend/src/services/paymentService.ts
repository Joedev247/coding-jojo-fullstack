import { apiClient, ApiResponse } from '../lib/api';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'mobile_money' | 'bank_transfer' | 'crypto' | 'paypal';
  provider: string; // 'stripe', 'mtn', 'orange', 'bitcoin', etc.
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  phoneNumber?: string;
  bankName?: string;
  accountNumber?: string;
  walletAddress?: string;
  isDefault: boolean;
  isActive: boolean;
  country?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  paymentMethod: PaymentMethod;
  courseId?: string;
  subscriptionId?: string;
  clientSecret?: string;
  redirectUrl?: string;
  qrCode?: string; // For mobile money
  reference?: string; // For bank transfers
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  status: 'active' | 'past_due' | 'canceled' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
}

export interface CryptoPayment {
  address: string;
  amount: number;
  currency: 'BTC' | 'USDT' | 'USDC' | 'ETH';
  qrCode: string;
  explorerUrl?: string;
  confirmations: number;
  required_confirmations: number;
}

class PaymentService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api';
  }

  // Payment Methods Management
  async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    return apiClient.get('/payments/methods');
  }

  async addPaymentMethod(method: Partial<PaymentMethod>): Promise<ApiResponse<PaymentMethod>> {
    return apiClient.post('/payments/methods', method);
  }

  async deletePaymentMethod(methodId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/payments/methods/${methodId}`);
  }

  async setDefaultPaymentMethod(methodId: string): Promise<ApiResponse<void>> {
    return apiClient.put(`/payments/methods/${methodId}/default`);
  }

  // Course Payments
  async purchaseCourse(courseId: string, paymentMethodId: string): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.post('/payments/purchase-course', {
      courseId,
      paymentMethodId
    });
  }

  async createCoursePaymentIntent(courseId: string, paymentType: string): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.post('/payments/create-intent', {
      courseId,
      paymentType,
      type: 'course'
    });
  }

  // Mobile Money Integration
  async initiateMobileMoneyPayment(data: {
    phoneNumber: string;
    amount: number;
    currency: string;
    provider: 'mtn' | 'orange';
    courseId?: string;
    subscriptionId?: string;
  }): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.post('/payments/mobile-money/initiate', data);
  }

  async checkMobileMoneyStatus(transactionId: string): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.get(`/payments/mobile-money/status/${transactionId}`);
  }

  // Bank Transfer
  async initiateBankTransfer(data: {
    amount: number;
    currency: string;
    bankCode: string;
    courseId?: string;
    subscriptionId?: string;
  }): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.post('/payments/bank-transfer/initiate', data);
  }

  async verifyBankTransfer(reference: string): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.post('/payments/bank-transfer/verify', { reference });
  }

  // Cryptocurrency Payments
  async initiateCryptoPayment(data: {
    amount: number;
    currency: 'BTC' | 'USDT' | 'USDC' | 'ETH';
    courseId?: string;
    subscriptionId?: string;
  }): Promise<ApiResponse<CryptoPayment>> {
    return apiClient.post('/payments/crypto/initiate', data);
  }

  async checkCryptoPaymentStatus(address: string): Promise<ApiResponse<CryptoPayment>> {
    return apiClient.get(`/payments/crypto/status/${address}`);
  }

  // Stripe Integration
  async createStripePaymentIntent(data: {
    amount: number;
    currency: string;
    courseId?: string;
    subscriptionId?: string;
    paymentMethodId?: string;
  }): Promise<ApiResponse<{ clientSecret: string; paymentIntent: PaymentIntent }>> {
    return apiClient.post('/payments/stripe/create-intent', data);
  }

  async confirmStripePayment(paymentIntentId: string): Promise<ApiResponse<PaymentIntent>> {
    return apiClient.post('/payments/stripe/confirm', { paymentIntentId });
  }

  // Subscriptions
  async getSubscriptions(): Promise<ApiResponse<Subscription[]>> {
    return apiClient.get('/payments/subscriptions');
  }

  async createSubscription(planId: string, paymentMethodId: string): Promise<ApiResponse<Subscription>> {
    return apiClient.post('/payments/subscriptions', {
      planId,
      paymentMethodId
    });
  }

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true): Promise<ApiResponse<Subscription>> {
    return apiClient.post(`/payments/subscriptions/${subscriptionId}/cancel`, {
      cancelAtPeriodEnd
    });
  }

  async updateSubscription(subscriptionId: string, data: Partial<Subscription>): Promise<ApiResponse<Subscription>> {
    return apiClient.put(`/payments/subscriptions/${subscriptionId}`, data);
  }

  // Payment History
  async getPaymentHistory(page = 1, limit = 20): Promise<ApiResponse<{
    transactions: PaymentIntent[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>> {
    return apiClient.get(`/payments/history?page=${page}&limit=${limit}`);
  }

  // Exchange Rates (for multi-currency support)
  async getExchangeRates(): Promise<ApiResponse<{ [key: string]: number }>> {
    return apiClient.get('/payments/exchange-rates');
  }

  // Payment Plans
  async getPaymentPlans(): Promise<ApiResponse<{
    id: string;
    name: string;
    amount: number;
    currency: string;
    interval: 'monthly' | 'yearly';
    features: string[];
    popular: boolean;
  }[]>> {
    return apiClient.get('/payments/plans');
  }

  // Webhooks (for handling payment confirmations)
  async handleWebhook(provider: string, payload: any): Promise<ApiResponse<void>> {
    return apiClient.post(`/payments/webhooks/${provider}`, payload);
  }

  // Utility Methods
  formatAmount(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-CM', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  isPaymentMethodSupported(country: string, method: string): boolean {
    const supportedMethods: { [key: string]: string[] } = {
      'CM': ['card', 'mobile_money', 'bank_transfer', 'crypto'], // Cameroon
      'NG': ['card', 'bank_transfer', 'crypto'], // Nigeria
      'KE': ['card', 'mobile_money', 'bank_transfer'], // Kenya
      'US': ['card', 'paypal', 'crypto'],
      'EU': ['card', 'bank_transfer', 'crypto']
    };

    return supportedMethods[country]?.includes(method) || false;
  }

  getMobileMoneyProviders(country: string): string[] {
    const providers: { [key: string]: string[] } = {
      'CM': ['mtn', 'orange'], // Cameroon
      'KE': ['mpesa'], // Kenya
      'UG': ['mtn'], // Uganda
      'RW': ['mtn'] // Rwanda
    };

    return providers[country] || [];
  }
}

export const paymentService = new PaymentService();
export default paymentService;
