import api, { ApiResponse } from '../lib/api';

// Interface definitions
export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description: string;
  date: string;
  paymentMethod: PaymentMethod;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: string;
  interval: 'monthly' | 'yearly';
}

export interface BillingData {
  subscription: Subscription | null;
  paymentMethods: PaymentMethod[];
  transactions: Transaction[];
  upcomingInvoice?: {
    amount: number;
    currency: string;
    date: string;
  };
}

class BillingService {
  // Get user's billing data
  async getBillingData(): Promise<BillingData> {
    try {
      const response: ApiResponse<BillingData> = await api.get('/billing/data');
      return response.data || {
        subscription: null,
        paymentMethods: [],
        transactions: []
      };
    } catch (error) {
      console.error('Failed to get billing data:', error);
      throw error;
    }
  }

  // Get subscription details
  async getSubscription(): Promise<Subscription | null> {
    try {
      const response: ApiResponse<Subscription> = await api.get('/billing/subscription');
      return response.data || null;
    } catch (error) {
      console.error('Failed to get subscription:', error);
      throw error;
    }
  }

  // Create a new subscription
  async createSubscription(planId: string, paymentMethodId?: string): Promise<Subscription> {
    try {
      const response: ApiResponse<Subscription> = await api.post('/billing/subscription', {
        planId,
        paymentMethodId
      });
      return response.data!;
    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw error;
    }
  }

  // Update subscription
  async updateSubscription(subscriptionId: string, updates: Partial<Subscription>): Promise<Subscription> {
    try {
      const response: ApiResponse<Subscription> = await api.put(`/billing/subscription/${subscriptionId}`, updates);
      return response.data!;
    } catch (error) {
      console.error('Failed to update subscription:', error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd: boolean = true): Promise<Subscription> {
    try {
      const response: ApiResponse<Subscription> = await api.delete(`/billing/subscription/${subscriptionId}?cancelAtPeriodEnd=${cancelAtPeriodEnd}`);
      return response.data!;
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      throw error;
    }
  }

  // Get payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const response: ApiResponse<PaymentMethod[]> = await api.get('/billing/payment-methods');
      return response.data || [];
    } catch (error) {
      console.error('Failed to get payment methods:', error);
      throw error;
    }
  }

  // Add payment method
  async addPaymentMethod(paymentMethodData: Partial<PaymentMethod>): Promise<PaymentMethod> {
    try {
      const response: ApiResponse<PaymentMethod> = await api.post('/billing/payment-methods', paymentMethodData);
      return response.data!;
    } catch (error) {
      console.error('Failed to add payment method:', error);
      throw error;
    }
  }

  // Update payment method
  async updatePaymentMethod(paymentMethodId: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod> {
    try {
      const response: ApiResponse<PaymentMethod> = await api.put(`/billing/payment-methods/${paymentMethodId}`, updates);
      return response.data!;
    } catch (error) {
      console.error('Failed to update payment method:', error);
      throw error;
    }
  }

  // Delete payment method
  async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      await api.delete(`/billing/payment-methods/${paymentMethodId}`);
    } catch (error) {
      console.error('Failed to delete payment method:', error);
      throw error;
    }
  }

  // Get transaction history
  async getTransactions(page: number = 1, limit: number = 10): Promise<{ transactions: Transaction[]; pagination: any }> {
    try {
      const response: ApiResponse<{ transactions: Transaction[]; pagination: any }> = await api.get(`/billing/transactions?page=${page}&limit=${limit}`);
      return response.data || { transactions: [], pagination: { current: 1, total: 1, count: 0 } };
    } catch (error) {
      console.error('Failed to get transactions:', error);
      throw error;
    }
  }

  // Get upcoming invoice
  async getUpcomingInvoice(): Promise<any> {
    try {
      const response: ApiResponse<any> = await api.get('/billing/upcoming-invoice');
      return response.data;
    } catch (error) {
      console.error('Failed to get upcoming invoice:', error);
      throw error;
    }
  }

  // Download invoice
  async downloadInvoice(invoiceId: string): Promise<Blob> {
    try {
      // For blob downloads, we need to handle the response differently
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/billing/invoices/${invoiceId}/download`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }

      return await response.blob();
    } catch (error) {
      console.error('Failed to download invoice:', error);
      throw error;
    }
  }

  // Update billing address
  async updateBillingAddress(address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  }): Promise<void> {
    try {
      await api.put('/billing/address', address);
    } catch (error) {
      console.error('Failed to update billing address:', error);
      throw error;
    }
  }
}

export const billingService = new BillingService();
