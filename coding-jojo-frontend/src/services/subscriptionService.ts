import { apiClient, ApiResponse } from '../lib/api';

// Subscription & Payment Service
export interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  interval: 'month' | 'year';
  features: string[];
  maxCourses?: number;
  stripePriceId: string;
  isPopular?: boolean;
  isActive: boolean;
}

export interface UserSubscription {
  _id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'unpaid';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  _id: string;
  userId: string;
  type: 'card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  isDefault: boolean;
  stripePaymentMethodId?: string;
}

export interface Transaction {
  _id: string;
  userId: string;
  subscriptionId?: string;
  courseId?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  type: 'subscription' | 'course_purchase' | 'refund';
  paymentMethod: string;
  stripePaymentIntentId?: string;
  description: string;
  createdAt: string;
  completedAt?: string;
  refundedAt?: string;
  invoice_url?: string;
}

export interface BillingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  taxId?: string;
}

export interface PaymentRequest {
  planId: string;
  paymentMethodId?: string;
  billingInfo?: BillingInfo;
  couponCode?: string;
}

export interface CoursePaymentRequest {
  courseId: string;
  paymentMethodId?: string;
  billingInfo?: BillingInfo;
  couponCode?: string;
}

class SubscriptionService {
  // Subscription Plans
  async getSubscriptionPlans(): Promise<ApiResponse<SubscriptionPlan[]>> {
    return apiClient.get<SubscriptionPlan[]>('/subscriptions/plans');
  }

  async getSubscriptionPlan(planId: string): Promise<ApiResponse<SubscriptionPlan>> {
    return apiClient.get<SubscriptionPlan>(`/subscriptions/plans/${planId}`);
  }

  // User Subscriptions
  async getCurrentSubscription(): Promise<ApiResponse<UserSubscription>> {
    return apiClient.get<UserSubscription>('/subscriptions/current');
  }

  async createSubscription(paymentData: PaymentRequest): Promise<ApiResponse<UserSubscription>> {
    return apiClient.post<UserSubscription>('/subscriptions/create', paymentData);
  }

  async updateSubscription(subscriptionId: string, planId: string): Promise<ApiResponse<UserSubscription>> {
    return apiClient.put<UserSubscription>(`/subscriptions/${subscriptionId}`, { planId });
  }

  async cancelSubscription(subscriptionId: string, reason?: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/subscriptions/${subscriptionId}/cancel`, { reason });
  }

  async reactivateSubscription(subscriptionId: string): Promise<ApiResponse<UserSubscription>> {
    return apiClient.post<UserSubscription>(`/subscriptions/${subscriptionId}/reactivate`);
  }

  async pauseSubscription(subscriptionId: string, resumeAt?: string): Promise<ApiResponse<UserSubscription>> {
    return apiClient.post<UserSubscription>(`/subscriptions/${subscriptionId}/pause`, { resumeAt });
  }

  // Payment Methods
  async getPaymentMethods(): Promise<ApiResponse<PaymentMethod[]>> {
    return apiClient.get<PaymentMethod[]>('/payments/methods');
  }

  async addPaymentMethod(paymentMethodData: {
    type: 'card' | 'paypal';
    stripePaymentMethodId?: string;
    email?: string;
  }): Promise<ApiResponse<PaymentMethod>> {
    return apiClient.post<PaymentMethod>('/payments/methods', paymentMethodData);
  }

  async updatePaymentMethod(methodId: string, updateData: Partial<PaymentMethod>): Promise<ApiResponse<PaymentMethod>> {
    return apiClient.put<PaymentMethod>(`/payments/methods/${methodId}`, updateData);
  }

  async deletePaymentMethod(methodId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete<{ message: string }>(`/payments/methods/${methodId}`);
  }

  async setDefaultPaymentMethod(methodId: string): Promise<ApiResponse<PaymentMethod>> {
    return apiClient.post<PaymentMethod>(`/payments/methods/${methodId}/set-default`);
  }

  // Transactions & Billing
  async getTransactions(filters?: {
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>('/payments/transactions', filters);
  }

  async getTransaction(transactionId: string): Promise<ApiResponse<Transaction>> {
    return apiClient.get<Transaction>(`/payments/transactions/${transactionId}`);
  }

  async downloadInvoice(transactionId: string): Promise<ApiResponse<{ url: string }>> {
    return apiClient.get<{ url: string }>(`/payments/transactions/${transactionId}/invoice`);
  }

  async getBillingInfo(): Promise<ApiResponse<BillingInfo>> {
    return apiClient.get<BillingInfo>('/payments/billing-info');
  }

  async updateBillingInfo(billingInfo: BillingInfo): Promise<ApiResponse<BillingInfo>> {
    return apiClient.put<BillingInfo>('/payments/billing-info', billingInfo);
  }

  // Course Purchases
  async purchaseCourse(paymentData: CoursePaymentRequest): Promise<ApiResponse<Transaction>> {
    return apiClient.post<Transaction>('/payments/purchase-course', paymentData);
  }

  async getPurchaseHistory(): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<Transaction[]>('/payments/purchases');
  }

  // Stripe Integration
  async createPaymentIntent(amount: number, currency = 'usd'): Promise<ApiResponse<{ 
    clientSecret: string; 
    paymentIntentId: string; 
  }>> {
    return apiClient.post<{ 
      clientSecret: string; 
      paymentIntentId: string; 
    }>('/payments/create-intent', { amount, currency });
  }

  async confirmPayment(paymentIntentId: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/payments/confirm/${paymentIntentId}`);
  }

  // Coupons & Discounts
  async validateCoupon(couponCode: string, planId?: string): Promise<ApiResponse<{
    valid: boolean;
    discount: number;
    discountType: 'percentage' | 'fixed';
    maxUses?: number;
    usedCount?: number;
    expiresAt?: string;
  }>> {
    return apiClient.post<any>('/payments/validate-coupon', { couponCode, planId });
  }

  // Webhooks (for internal use)
  async handleStripeWebhook(event: any): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/payments/webhook/stripe', event);
  }

  // Refunds
  async requestRefund(transactionId: string, reason: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>(`/payments/transactions/${transactionId}/refund`, { reason });
  }

  // Usage & Limits
  async getUsageStats(): Promise<ApiResponse<{
    coursesAccessed: number;
    maxCourses: number;
    downloadCount: number;
    maxDownloads: number;
    supportTickets: number;
    maxSupportTickets: number;
  }>> {
    return apiClient.get<any>('/subscriptions/usage');
  }

  // Subscription Analytics (for admins)
  async getSubscriptionAnalytics(): Promise<ApiResponse<{
    totalSubscribers: number;
    activeSubscriptions: number;
    churnRate: number;
    monthlyRecurringRevenue: number;
    averageRevenuePerUser: number;
    subscriptionsByPlan: { planName: string; count: number }[];
  }>> {
    return apiClient.get<any>('/admin/subscriptions/analytics');
  }
}

export const subscriptionService = new SubscriptionService();
