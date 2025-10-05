import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Instructor {
  _id: string;
  name: string;
  email: string;
  avatar: {
    url: string;
  };
  role: string;
  isPremium: boolean;
  joinedAt: string;
  lastActive: string;
  verificationStatus: string;
  isApproved: boolean;
  stats: {
    totalCourses: number;
    publishedCourses: number;
    totalEnrollments: number;
    totalEarnings: number;
    totalTransactions: number;
    pendingAmount: number;
  };
}

interface InstructorDetails extends Instructor {
  teacherProfile: any;
  courses: any[];
  earningsSummary: {
    totalGross: number;
    totalNet: number;
    totalPlatformFee: number;
    totalTransactions: number;
    pendingAmount: number;
    paidAmount: number;
  };
  recentEarnings: any[];
  monthlyEarnings: Array<{
    month: string;
    earnings: number;
    transactions: number;
  }>;
}

const API_BASE_URL = 'http://localhost:5000/api';

const InstructorManagement: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorDetails | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Filters and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('joinedAt');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchInstructors();
  }, [currentPage, searchQuery, statusFilter, sortBy, sortOrder]);

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/admin/instructors?page=${currentPage}&search=${searchQuery}&status=${statusFilter}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInstructors(data.data.instructors);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructorDetails = async (instructorId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/admin/instructors/${instructorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedInstructor(data.data);
        setShowDetails(true);
      }
    } catch (error) {
      console.error('Error fetching instructor details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'suspended':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
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
        <h1 className="text-3xl font-bold text-white mb-2">Instructor Management</h1>
        <p className="text-gray-400">Manage instructors, track earnings, and process payouts</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800  p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600  pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="joinedAt">Join Date</option>
            <option value="name">Name</option>
            <option value="totalEarnings">Earnings</option>
            <option value="totalCourses">Courses</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Instructors Table */}
      <div className="bg-gray-800  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Courses
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Enrollments
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total Earnings
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Pending
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
                      <span className="ml-3">Loading instructors...</span>
                    </div>
                  </td>
                </tr>
              ) : instructors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    No instructors found
                  </td>
                </tr>
              ) : (
                instructors.map((instructor) => (
                  <tr key={instructor._id} className="hover:bg-gray-750">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={instructor.avatar?.url || '/default-avatar.png'}
                          alt={instructor.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{instructor.name}</div>
                          <div className="text-sm text-gray-400">{instructor.email}</div>
                          <div className="text-xs text-gray-500">
                            Joined {formatDate(instructor.joinedAt)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(instructor.verificationStatus)}`}>
                        {instructor.verificationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {instructor.stats.publishedCourses} / {instructor.stats.totalCourses}
                      </div>
                      <div className="text-xs text-gray-400">Published / Total</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {instructor.stats.totalEnrollments.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white font-medium">
                        {formatCurrency(instructor.stats.totalEarnings)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {instructor.stats.totalTransactions} transactions
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-orange-400 font-medium">
                        {formatCurrency(instructor.stats.pendingAmount)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => fetchInstructorDetails(instructor._id)}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-2  hover:bg-gray-600"
                        title="View Details"
                      >
                        👁️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Instructor Details Modal */}
      <AnimatePresence>
        {showDetails && selectedInstructor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-800  max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={selectedInstructor.avatar?.url || '/default-avatar.png'}
                      alt={selectedInstructor.name}
                    />
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold text-white">{selectedInstructor.name}</h2>
                      <p className="text-gray-400">{selectedInstructor.email}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border mt-2 ${getStatusColor(selectedInstructor.verificationStatus)}`}>
                        {selectedInstructor.verificationStatus}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-700  p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Earnings</p>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency(selectedInstructor.earningsSummary.totalNet)}
                        </p>
                      </div>
                      <span className="text-4xl">💰</span>
                    </div>
                  </div>

                  <div className="bg-gray-700  p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Published Courses</p>
                        <p className="text-2xl font-bold text-white">
                          {selectedInstructor.stats.publishedCourses}
                        </p>
                      </div>
                      <span className="text-4xl">📚</span>
                    </div>
                  </div>

                  <div className="bg-gray-700  p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Total Enrollments</p>
                        <p className="text-2xl font-bold text-white">
                          {selectedInstructor.stats.totalEnrollments.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-4xl">📈</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Earnings Chart */}
                <div className="bg-gray-700  p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Earnings (Last 12 Months)</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {selectedInstructor.monthlyEarnings.map((month, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-blue-500 rounded-t w-full"
                          style={{
                            height: `${Math.max(4, (month.earnings / Math.max(...selectedInstructor.monthlyEarnings.map(m => m.earnings))) * 200)}px`
                          }}
                        ></div>
                        <div className="text-xs text-gray-400 mt-2 transform -rotate-45 origin-top">
                          {month.month}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-gray-700  p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Earnings</h3>
                  <div className="space-y-3">
                    {selectedInstructor.recentEarnings.slice(0, 5).map((earning: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-600 ">
                        <div>
                          <p className="text-white font-medium">{earning.course?.title}</p>
                          <p className="text-gray-400 text-sm">Student: {earning.student?.name}</p>
                          <p className="text-gray-500 text-xs">{formatDate(earning.earnedAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{formatCurrency(earning.netAmount)}</p>
                          <p className="text-gray-400 text-sm">
                            Status: <span className={`${earning.paymentStatus === 'paid' ? 'text-green-400' : 'text-orange-400'}`}>
                              {earning.paymentStatus}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstructorManagement;
