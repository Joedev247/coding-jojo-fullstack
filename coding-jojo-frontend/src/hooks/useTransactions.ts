import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';




export interface TransactionData {
  id: string;
  transactionId: string;
  type: 'course_purchase' | 'subscription' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  description: string;
  createdAt: string;
  completedAt?: string;
  paymentMethod: {
    type: string;
    details: any;
  };
  course?: {
    _id: string;
    title: string;
    price: number;
  };
  subscription?: {
    _id: string;
    plan: string;
    status: string;
  };
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface TransactionStats {
  totalSpent: number;
  totalTransactions: number;
  avgTransactionAmount: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface TransactionResponse {
  success: boolean;
  transactions: TransactionData[];
  pagination: PaginationInfo;
  stats: TransactionStats;
}

export interface AdminTransactionStats {
  total: Array<{ amount: number; count: number }>;
  today: Array<{ amount: number; count: number }>;
  thisMonth: Array<{ amount: number; count: number }>;
  byType: Array<{ _id: string; amount: number; count: number }>;
  byPaymentMethod: Array<{ _id: string; amount: number; count: number }>;
  recentTransactions: Array<{
    _id: string;
    amount: number;
    type: string;
    status: string;
    createdAt: string;
    userInfo: Array<{ name: string; email: string }>;
    courseInfo: Array<{ title: string }>;
  }>;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();

  const fetchTransactions = async (options: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  } = {}) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`/api/payments/history?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data: TransactionResponse = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
        setPagination(data.pagination);
        setStats(data.stats);
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (err) {
      setError('Network error while fetching transactions');
      console.error('Transaction fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminTransactions = async (options: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
  } = {}) => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      Object.entries(options).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      const response = await fetch(`/api/payments/admin/transactions?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
        setPagination(data.pagination);
      } else {
        setError('Failed to fetch admin transactions');
      }
    } catch (err) {
      setError('Network error while fetching admin transactions');
      console.error('Admin transaction fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminStats = async (): Promise<AdminTransactionStats | null> => {
    if (!user) return null;

    try {
      const response = await fetch('/api/payments/admin/overview', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        return data.transactionStats;
      } else {
        console.error('Failed to fetch admin stats');
        return null;
      }
    } catch (err) {
      console.error('Network error while fetching admin stats:', err);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  return {
    transactions,
    stats,
    pagination,
    loading,
    error,
    fetchTransactions,
    fetchAdminTransactions,
    fetchAdminStats,
    refetch: () => fetchTransactions()
  };
};

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();

  const fetchPaymentMethods = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/methods', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setPaymentMethods(data.paymentMethods);
      } else {
        setError('Failed to fetch payment methods');
      }
    } catch (err) {
      setError('Network error while fetching payment methods');
      console.error('Payment methods fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

  return {
    paymentMethods,
    loading,
    error,
    fetchPaymentMethods,
    refetch: fetchPaymentMethods
  };
};
