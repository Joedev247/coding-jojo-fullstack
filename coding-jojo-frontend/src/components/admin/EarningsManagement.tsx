import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InstructorEarnings {
  instructor: {
    _id: string;
    name: string;
    email: string;
    avatar: {
      url: string;
    };
  };
  totalGross: number;
  totalNet: number;
  totalPlatformFee: number;
  transactionCount: number;
  pendingAmount: number;
  paidAmount: number;
  lastEarning: string;
}

interface PlatformStats {
  totalPlatformRevenue: number;
  totalInstructorEarnings: number;
  totalGrossRevenue: number;
  totalTransactions: number;
}

interface PayoutData {
  paymentMethod: string;
  paymentReference: string;
  amount?: number;
  notes?: string;
}

const API_BASE_URL = 'https://codingjojo-backend.onrender.com/api';

const EarningsManagement: React.FC = () => {
  const [earnings, setEarnings] = useState<InstructorEarnings[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
  const [recentStats, setRecentStats] = useState<any>(null);
  const [pendingPayouts, setPendingPayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingPayout, setProcessingPayout] = useState<string | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorEarnings | null>(null);
  const [payoutData, setPayoutData] = useState<PayoutData>({
    paymentMethod: 'bank_transfer',
    paymentReference: '',
    notes: ''
  });

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/admin/earnings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEarnings(data.data.instructorEarnings);
        setPlatformStats(data.data.platformStats);
        setRecentStats(data.data.recentStats);
        setPendingPayouts(data.data.pendingPayouts);
      }
    } catch (error) {
      console.error('Error fetching earnings data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processPayout = async () => {
    if (!selectedInstructor || !payoutData.paymentReference.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setProcessingPayout(selectedInstructor.instructor._id);
    
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/admin/instructors/${selectedInstructor.instructor._id}/payout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payoutData)
      });

      if (response.ok) {
        alert('Payout processed successfully!');
        setShowPayoutModal(false);
        setSelectedInstructor(null);
        setPayoutData({
          paymentMethod: 'bank_transfer',
          paymentReference: '',
          notes: ''
        });
        fetchEarningsData(); // Refresh data
      } else {
        const errorData = await response.json();
        alert(`Error processing payout: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error processing payout:', error);
      alert('Error processing payout');
    } finally {
      setProcessingPayout(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Earnings Management</h1>
        <p className="text-gray-400">Monitor platform revenue and manage instructor payouts</p>
      </div>

      {/* Platform Stats Cards */}
      {platformStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700  p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Platform Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(platformStats.totalPlatformRevenue)}
                </p>
              </div>
              <span className="text-4xl">🏛️</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700  p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Instructor Earnings</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(platformStats.totalInstructorEarnings)}
                </p>
              </div>
              <span className="text-4xl">💰</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700  p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(platformStats.totalGrossRevenue)}
                </p>
              </div>
              <span className="text-4xl">📊</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-700  p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Transactions</p>
                <p className="text-2xl font-bold text-white">
                  {platformStats.totalTransactions.toLocaleString()}
                </p>
              </div>
              <span className="text-4xl">🔄</span>
            </div>
          </div>
        </div>
      )}

      {/* Pending Payouts Alert */}
      {pendingPayouts.length > 0 && (
        <div className="bg-orange-900/30 border border-orange-500/50  p-4 mb-8">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="text-orange-400 font-semibold">Pending Payouts</h3>
              <p className="text-orange-300 text-sm">
                {pendingPayouts.length} instructor(s) have eligible earnings ready for payout
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructor Earnings Table */}
      <div className="bg-gray-800  overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Instructor Earnings Overview</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Earnings
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Platform Fee
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Pending Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Last Earning
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-3">Loading earnings data...</span>
                    </div>
                  </td>
                </tr>
              ) : earnings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    No earnings data available
                  </td>
                </tr>
              ) : (
                earnings.map((earning) => (
                  <tr key={earning.instructor._id} className="hover:bg-gray-750">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={earning.instructor.avatar?.url || '/default-avatar.png'}
                          alt={earning.instructor.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{earning.instructor.name}</div>
                          <div className="text-sm text-gray-400">{earning.instructor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-white">
                        {formatCurrency(earning.totalNet)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Gross: {formatCurrency(earning.totalGross)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-blue-400 font-medium">
                        {formatCurrency(earning.totalPlatformFee)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {earning.transactionCount}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${earning.pendingAmount > 0 ? 'text-orange-400' : 'text-gray-400'}`}>
                        {formatCurrency(earning.pendingAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-400">
                        {earning.lastEarning ? formatDate(earning.lastEarning) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {earning.pendingAmount > 0 && (
                        <button
                          onClick={() => {
                            setSelectedInstructor(earning);
                            setShowPayoutModal(true);
                          }}
                          disabled={processingPayout === earning.instructor._id}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-3 py-1  text-white text-sm transition-colors"
                        >
                          {processingPayout === earning.instructor._id ? 'Processing...' : 'Process Payout'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && selectedInstructor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800  max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Process Payout</h3>
            
            <div className="mb-4">
              <p className="text-gray-300">Instructor: <span className="text-white font-semibold">{selectedInstructor.instructor.name}</span></p>
              <p className="text-gray-300">Pending Amount: <span className="text-orange-400 font-semibold">{formatCurrency(selectedInstructor.pendingAmount)}</span></p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Method
                </label>
                <select
                  value={payoutData.paymentMethod}
                  onChange={(e) => setPayoutData({ ...payoutData, paymentMethod: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600  px-3 py-2 text-white"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="mobile_money">Mobile Money</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Payment Reference *
                </label>
                <input
                  type="text"
                  value={payoutData.paymentReference}
                  onChange={(e) => setPayoutData({ ...payoutData, paymentReference: e.target.value })}
                  placeholder="Transaction ID, Reference number, etc."
                  className="w-full bg-gray-700 border border-gray-600  px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (Optional)
                </label>
                <input
                  type="number"
                  value={payoutData.amount || ''}
                  onChange={(e) => setPayoutData({ ...payoutData, amount: e.target.value ? parseFloat(e.target.value) : undefined })}
                  placeholder={`Max: ${selectedInstructor.pendingAmount}`}
                  max={selectedInstructor.pendingAmount}
                  className="w-full bg-gray-700 border border-gray-600  px-3 py-2 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">Leave empty to pay full pending amount</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={payoutData.notes}
                  onChange={(e) => setPayoutData({ ...payoutData, notes: e.target.value })}
                  placeholder="Additional notes..."
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600  px-3 py-2 text-white resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => {
                  setShowPayoutModal(false);
                  setSelectedInstructor(null);
                  setPayoutData({
                    paymentMethod: 'bank_transfer',
                    paymentReference: '',
                    notes: ''
                  });
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={processPayout}
                disabled={!payoutData.paymentReference.trim() || processingPayout !== null}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white  font-medium transition-colors"
              >
                {processingPayout ? 'Processing...' : 'Process Payout'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default EarningsManagement;
