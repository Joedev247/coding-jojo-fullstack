import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  User,
  Mail,
  Phone,
  FileText,
  Camera,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Download,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
  Activity,
  ChevronRight,
  ChevronLeft,
  Star,
  GraduationCap
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://codingjojo-backend.onrender.com/api';

interface VerificationItem {
  _id: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
    avatar?: {
      url: string;
    };
  };
  verificationStatus: string;
  progressPercentage: number;
  completedSteps: {
    email: boolean;
    phone: boolean;
    personalInfo: boolean;
    idDocument: boolean;
    selfie: boolean;
    educationCertificate: boolean;
  };
  educationCertificatesCount?: number;
  educationStatus?: string;
  emailVerification: {
    isVerified: boolean;
    verifiedAt?: string;
  };
  phoneVerification: {
    isVerified: boolean;
    phoneNumber: string;
    countryCode: string;
    verifiedAt?: string;
  };
  personalInfo?: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender?: string;
    nationality?: string;
  };
  idVerification?: {
    documentType: string;
    frontImage?: {
      url: string;
    };
    backImage?: {
      url: string;
    };
    isVerified: boolean;
  };
  selfieVerification?: {
    selfieImage?: {
      url: string;
    };
    isVerified: boolean;
    livenessCheck?: {
      confidence: number;
      isPassed: boolean;
    };
  };
  educationVerification?: {
    overallStatus: string;
    certificates: {
      _id: string;
      certificateType: string;
      institutionName: string;
      fieldOfStudy: string;
      graduationYear: number;
      gpa?: string;
      documentUrl: string;
      verificationStatus: string;
      verificationNotes?: string;
      uploadedAt: string;
      verifiedAt?: string;
      verifiedBy?: string;
    }[];
    lastUpdatedAt?: string;
  };
  adminReview?: {
    status: string;
    feedback?: string;
    reviewedBy?: {
      name: string;
      email: string;
    };
    reviewedAt?: string;
  };
  createdAt: string;
  submittedAt?: string;
}

interface VerificationStats {
  total: number;
  pending: number;
  in_progress: number;
  under_review: number;
  approved: number;
  rejected: number;
  suspended: number;
}

interface AdminVerificationDashboardProps {
  isAdmin?: boolean;
}

const AdminVerificationDashboard: React.FC<AdminVerificationDashboardProps> = ({ isAdmin = false }) => {
  const toast = useToast();
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<VerificationItem | null>(null);
  const [stats, setStats] = useState<VerificationStats>({
    total: 0,
    pending: 0,
    in_progress: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
    suspended: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [requestInfoMessage, setRequestInfoMessage] = useState('');
  const [suspendReason, setSuspendReason] = useState('');
  const [suspendDuration, setSuspendDuration] = useState('30');
  const [allowResubmission, setAllowResubmission] = useState(true);

  useEffect(() => {
    fetchVerifications();
    fetchStats();
  }, [currentPage, statusFilter, searchQuery, sortBy, sortOrder]);

  const fetchVerifications = async () => {
    setLoading(true);
    try {
      // Get admin token - consistent with main admin dashboard
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found. Please log in again.');
        return;
      }

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        sortBy: sortBy,
        sortOrder: sortOrder
      });
      
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      
      if (searchQuery.trim()) {
        params.append('search', searchQuery.trim());
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        toast.error('Session expired. Please log in again.');
        // Could redirect to login page here if needed
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setVerifications(data.data.verifications);
        setTotalPages(data.data.pagination.pages);
        setStats(data.data.statistics);
      } else {
        toast.error('Failed to fetch verifications');
      }
    } catch (error) {
      toast.error('Error fetching verifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Get admin token - consistent with main admin dashboard
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        console.warn('No authentication token found for stats');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        console.warn('Session expired while fetching stats');
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data.total);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchVerificationDetails = async (verificationId: string) => {
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications/${verificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSelectedVerification(data.data);
      } else {
        toast.error('Failed to fetch verification details');
      }
    } catch (error) {
      toast.error('Error fetching verification details');
    }
  };

  const approveVerification = async (verificationId: string, feedback?: string) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found');
        setActionLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications/${verificationId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          feedback: feedback || 'Your instructor verification has been approved! Welcome to Coding Jojo.'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification approved successfully!');
        fetchVerifications();
        setSelectedVerification(null);
      } else {
        toast.error(data.error || 'Failed to approve verification');
      }
    } catch (error) {
      toast.error('Error approving verification');
    } finally {
      setActionLoading(false);
    }
  };

  const rejectVerification = async () => {
    if (!selectedVerification || !rejectReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found');
        setActionLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications/${selectedVerification._id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          reason: rejectReason,
          allowResubmission
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification rejected');
        fetchVerifications();
        setSelectedVerification(null);
        setShowRejectModal(false);
        setRejectReason('');
      } else {
        toast.error(data.error || 'Failed to reject verification');
      }
    } catch (error) {
      toast.error('Error rejecting verification');
    } finally {
      setActionLoading(false);
    }
  };

  const requestMoreInfo = async () => {
    if (!selectedVerification || !requestInfoMessage.trim()) {
      toast.error('Please provide a message');
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found');
        setActionLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications/${selectedVerification._id}/request-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          message: requestInfoMessage
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Information request sent to instructor');
        fetchVerifications();
        setSelectedVerification(null);
        setShowRequestInfoModal(false);
        setRequestInfoMessage('');
      } else {
        toast.error(data.error || 'Failed to request information');
      }
    } catch (error) {
      toast.error('Error requesting information');
    } finally {
      setActionLoading(false);
    }
  };

  const suspendVerification = async () => {
    if (!selectedVerification || !suspendReason.trim()) {
      toast.error('Please provide a reason for suspension');
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found');
        setActionLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/verifications/${selectedVerification._id}/suspend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          reason: suspendReason,
          duration: suspendDuration ? parseInt(suspendDuration) : null
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Verification suspended successfully');
        fetchVerifications();
        setSelectedVerification(null);
        setShowSuspendModal(false);
        setSuspendReason('');
        setSuspendDuration('30');
      } else {
        toast.error(data.error || 'Failed to suspend verification');
      }
    } catch (error) {
      toast.error('Error suspending verification');
    } finally {
      setActionLoading(false);
    }
  };

  const verifyCertificate = async (verificationId: string, certificateId: string, verificationStatus: string, verificationNotes?: string) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      if (!token) {
        toast.error('No authentication token found');
        setActionLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/admin/instructor-verifications/${verificationId}/certificates/${certificateId}/verify`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          verificationStatus,
          verificationNotes: verificationNotes || ''
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        const statusText = verificationStatus === 'verified' ? 'verified' : 
                          verificationStatus === 'rejected' ? 'rejected' : 'flagged for clarification';
        toast.success(`Certificate ${statusText} successfully!`);
        
        // Refresh the verification details
        if (selectedVerification) {
          await fetchVerificationDetails(selectedVerification._id);
        }
        await fetchVerifications();
      } else {
        toast.error(data.error || 'Failed to verify certificate');
      }
    } catch (error) {
      console.error('Error verifying certificate:', error);
      toast.error('Error verifying certificate');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'under_review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'suspended':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      case 'under_review':
        return Clock;
      case 'suspended':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    onClick?: () => void;
  }> = ({ title, value, icon: Icon, color, onClick }) => (
    <div 
      className={`${color} backdrop-blur-sm border border-gray-700/50  p-6 cursor-pointer hover:scale-105 transition-transform`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-300 text-sm">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <Icon className="h-8 w-8 text-white/80" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-gray-700/50  p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Instructor Verification Dashboard
            </h1>
            <p className="text-gray-300 mt-2">
              Review and manage instructor verification applications
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-gray-400 text-sm">Total Applications</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Under Review"
          value={stats.under_review}
          icon={Clock}
          color="bg-yellow-500/10"
          onClick={() => setStatusFilter('under_review')}
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          color="bg-blue-500/10"
          onClick={() => setStatusFilter('approved')}
        />
        <StatCard
          title="In Progress"
          value={stats.in_progress}
          icon={Activity}
          color="bg-blue-500/10"
          onClick={() => setStatusFilter('in_progress')}
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={User}
          color="bg-gray-500/10"
          onClick={() => setStatusFilter('pending')}
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={XCircle}
          color="bg-red-500/10"
          onClick={() => setStatusFilter('rejected')}
        />
        <StatCard
          title="Suspended"
          value={stats.suspended}
          icon={AlertTriangle}
          color="bg-orange-500/10"
          onClick={() => setStatusFilter('suspended')}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50  p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by instructor name or email..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-4 py-2 bg-gray-700 border border-gray-600  text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="submittedAt-desc">Recently Submitted</option>
              <option value="progressPercentage-desc">Most Complete</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verification List */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50  overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : verifications.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No verifications found</p>
          </div>
        ) : (
          <div>
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-700 bg-gray-700/30">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
                <div className="col-span-2">Instructor</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Progress</div>
                <div className="col-span-2">Education Certs</div>
                <div className="col-span-2">Submitted</div>
                <div className="col-span-2">Steps Complete</div>
                <div className="col-span-1">Actions</div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-700">
              {verifications.map((verification) => {
                const StatusIcon = getStatusIcon(verification.verificationStatus);
                const completedStepsCount = Object.values(verification.completedSteps).filter(Boolean).length;
                const totalSteps = Object.keys(verification.completedSteps).length;
                
                return (
                  <motion.div
                    key={verification._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 py-4 hover:bg-gray-700/20 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Instructor */}
                      <div className="col-span-2 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          {verification.instructor.avatar?.url ? (
                            <img
                              src={verification.instructor.avatar.url}
                              alt={verification.instructor.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-semibold text-sm">
                              {verification.instructor.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate text-sm">
                            {verification.instructor.name}
                          </p>
                          <p className="text-gray-400 text-xs truncate">
                            {verification.instructor.email}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(verification.verificationStatus)}`}>
                          <StatusIcon className="h-4 w-4" />
                          <span className="text-sm capitalize">
                            {verification.verificationStatus.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="col-span-1">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${verification.progressPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {verification.progressPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* Education Certificates */}
                      <div className="col-span-2">
                        {(verification.educationCertificatesCount || 0) > 0 ? (
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              verification.educationStatus === 'verified' 
                                ? 'bg-blue-500' 
                                : verification.educationStatus === 'rejected'
                                  ? 'bg-red-500'
                                  : verification.educationStatus === 'needs_clarification'
                                    ? 'bg-yellow-500'
                                    : 'bg-gray-500'
                            }`}></div>
                            <span className="text-sm text-gray-300">
                              {verification.educationCertificatesCount || 0} cert{(verification.educationCertificatesCount || 0) !== 1 ? 's' : ''}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              verification.educationStatus === 'verified' 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : verification.educationStatus === 'rejected'
                                  ? 'bg-red-500/20 text-red-400'
                                  : verification.educationStatus === 'needs_clarification'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              {verification.educationStatus || 'pending'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">No certificates</span>
                        )}
                      </div>

                      {/* Submitted Date */}
                      <div className="col-span-2">
                        <p className="text-gray-300 text-sm">
                          {verification.submittedAt
                            ? new Date(verification.submittedAt).toLocaleDateString()
                            : new Date(verification.createdAt).toLocaleDateString()
                          }
                        </p>
                      </div>

                      {/* Steps Complete */}
                      <div className="col-span-2">
                        <div className="flex space-x-1">
                          {Object.entries(verification.completedSteps).map(([step, completed]) => (
                            <div
                              key={step}
                              className={`w-3 h-3 rounded-full ${
                                completed ? 'bg-blue-500' : 'bg-gray-600'
                              }`}
                              title={step}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {completedStepsCount}/{totalSteps} complete
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1">
                        <button
                          onClick={() => {
                            fetchVerificationDetails(verification._id);
                          }}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700  transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-700 bg-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700  transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700  transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verification Details Modal */}
      <AnimatePresence>
        {selectedVerification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedVerification(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-800  max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Verification Details
                  </h2>
                  <button
                    onClick={() => setSelectedVerification(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Instructor Info */}
                <div className="bg-gray-700/50  p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Instructor Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white font-medium">
                        {selectedVerification.personalInfo 
                          ? `${selectedVerification.personalInfo.firstName} ${selectedVerification.personalInfo.lastName}`
                          : selectedVerification.instructor.name
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{selectedVerification.instructor.email}</p>
                    </div>
                    {selectedVerification.phoneVerification && (
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white">
                          {selectedVerification.phoneVerification.countryCode} {selectedVerification.phoneVerification.phoneNumber}
                        </p>
                      </div>
                    )}
                    {selectedVerification.personalInfo?.dateOfBirth && (
                      <div>
                        <p className="text-gray-400 text-sm">Date of Birth</p>
                        <p className="text-white">
                          {new Date(selectedVerification.personalInfo.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents */}
                {selectedVerification.idVerification && (
                  <div className="bg-gray-700/50  p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">ID Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedVerification.idVerification.frontImage && (
                        <div>
                          <p className="text-gray-400 text-sm mb-2">Front of {selectedVerification.idVerification.documentType.replace('_', ' ')}</p>
                          <img
                            src={selectedVerification.idVerification.frontImage.url}
                            alt="ID Front"
                            className="w-full h-48 object-cover  border border-gray-600"
                          />
                        </div>
                      )}
                      {selectedVerification.idVerification.backImage && (
                        <div>
                          <p className="text-gray-400 text-sm mb-2">Back of {selectedVerification.idVerification.documentType.replace('_', ' ')}</p>
                          <img
                            src={selectedVerification.idVerification.backImage.url}
                            alt="ID Back"
                            className="w-full h-48 object-cover  border border-gray-600"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Selfie */}
                {selectedVerification.selfieVerification?.selfieImage && (
                  <div className="bg-gray-700/50  p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Selfie Verification</h3>
                    <div className="flex items-start space-x-6">
                      <div>
                        <img
                          src={selectedVerification.selfieVerification.selfieImage.url}
                          alt="Selfie"
                          className="w-48 h-48 object-cover  border border-gray-600"
                        />
                      </div>
                      {selectedVerification.selfieVerification.livenessCheck && (
                        <div className="flex-1">
                          <p className="text-gray-400 text-sm mb-2">Liveness Check</p>
                          <div className="bg-gray-800  p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className={`w-3 h-3 rounded-full ${
                                selectedVerification.selfieVerification.livenessCheck.isPassed ? 'bg-blue-500' : 'bg-red-500'
                              }`}></span>
                              <span className="text-white">
                                {selectedVerification.selfieVerification.livenessCheck.isPassed ? 'Passed' : 'Failed'}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              Confidence: {selectedVerification.selfieVerification.livenessCheck.confidence}%
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Education Certificates */}
                {selectedVerification.educationVerification?.certificates && selectedVerification.educationVerification.certificates.length > 0 && (
                  <div className="bg-gray-700/50  p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Education Certificates</h3>
                    <div className="space-y-4">
                      {selectedVerification.educationVerification.certificates.map((certificate, index) => (
                        <div key={certificate._id} className="bg-gray-800  p-4 border border-gray-600">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-white font-medium mb-2">
                                {certificate.certificateType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-400">Institution:</span>
                                  <p className="text-white">{certificate.institutionName}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400">Field of Study:</span>
                                  <p className="text-white">{certificate.fieldOfStudy}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400">Graduation Year:</span>
                                  <p className="text-white">{certificate.graduationYear}</p>
                                </div>
                                {certificate.gpa && (
                                  <div>
                                    <span className="text-gray-400">GPA/Grade:</span>
                                    <p className="text-white">{certificate.gpa}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs  ${
                                certificate.verificationStatus === 'verified' 
                                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                                  : certificate.verificationStatus === 'rejected'
                                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                    : certificate.verificationStatus === 'needs_clarification'
                                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                              } border`}>
                                {certificate.verificationStatus.replace(/_/g, ' ')}
                              </span>
                            </div>
                          </div>
                          
                          {/* Certificate Document */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-gray-400" />
                              <span className="text-gray-300">Certificate Document</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => window.open(certificate.documentUrl, '_blank')}
                                className="px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm  transition-colors"
                              >
                                View Document
                              </button>
                              <button
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = certificate.documentUrl;
                                  link.download = `certificate_${certificate.institutionName}_${certificate.fieldOfStudy}`;
                                  link.click();
                                }}
                                className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm  transition-colors"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Verification Notes */}
                          {certificate.verificationNotes && (
                            <div className="bg-gray-900  p-3 mb-4">
                              <span className="text-gray-400 text-sm">Admin Notes:</span>
                              <p className="text-gray-300 text-sm mt-1">{certificate.verificationNotes}</p>
                            </div>
                          )}

                          {/* Verification Actions for Pending Certificates */}
                          {certificate.verificationStatus === 'pending' && selectedVerification.verificationStatus === 'under_review' && (
                            <div className="flex space-x-2 pt-3 border-t border-gray-600">
                              <button
                                onClick={() => verifyCertificate(selectedVerification._id, certificate._id, 'verified')}
                                disabled={actionLoading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm  transition-colors disabled:opacity-50"
                              >
                                Verify Certificate
                              </button>
                              <button
                                onClick={() => {
                                  const notes = prompt('Enter verification notes (optional):');
                                  if (notes !== null) {
                                    verifyCertificate(selectedVerification._id, certificate._id, 'needs_clarification', notes);
                                  }
                                }}
                                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm  transition-colors"
                              >
                                Request Clarification
                              </button>
                              <button
                                onClick={() => {
                                  const reason = prompt('Enter rejection reason:');
                                  if (reason) {
                                    verifyCertificate(selectedVerification._id, certificate._id, 'rejected', reason);
                                  }
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm  transition-colors"
                              >
                                Reject Certificate
                              </button>
                            </div>
                          )}

                          {/* Upload and Verification Dates */}
                          <div className="flex justify-between text-xs text-gray-400 pt-3 border-t border-gray-600">
                            <span>Uploaded: {new Date(certificate.uploadedAt).toLocaleDateString()}</span>
                            {certificate.verifiedAt && (
                              <span>Verified: {new Date(certificate.verifiedAt).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Admin Actions */}
                {selectedVerification.verificationStatus === 'under_review' && (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => approveVerification(selectedVerification._id)}
                      disabled={actionLoading}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white  font-medium transition-colors disabled:opacity-50"
                    >
                      {actionLoading ? 'Processing...' : 'Approve'}
                    </button>
                    
                    <button
                      onClick={() => setShowRequestInfoModal(true)}
                      className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white  font-medium transition-colors"
                    >
                      Request More Info
                    </button>
                    
                    <button
                      onClick={() => setShowSuspendModal(true)}
                      className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white  font-medium transition-colors"
                    >
                      Suspend
                    </button>
                    
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white  font-medium transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-800  max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Reject Verification</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for Rejection *
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows={4}
                    placeholder="Please provide a detailed reason for rejection..."
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowResubmission"
                    checked={allowResubmission}
                    onChange={(e) => setAllowResubmission(e.target.checked)}
                    className="rounded bg-gray-700 border-gray-600 text-red-600 focus:ring-red-500"
                  />
                  <label htmlFor="allowResubmission" className="text-sm text-gray-300">
                    Allow resubmission
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason('');
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={rejectVerification}
                  disabled={actionLoading || !rejectReason.trim()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white  font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Info Modal */}
      <AnimatePresence>
        {showRequestInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-800  max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Request Additional Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message to Instructor *
                  </label>
                  <textarea
                    value={requestInfoMessage}
                    onChange={(e) => setRequestInfoMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    rows={4}
                    placeholder="Please specify what additional information is needed..."
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowRequestInfoModal(false);
                    setRequestInfoMessage('');
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={requestMoreInfo}
                  disabled={actionLoading || !requestInfoMessage.trim()}
                  className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white  font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suspend Modal */}
      <AnimatePresence>
        {showSuspendModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-gray-800  max-w-md w-full p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Suspend Verification</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Reason for Suspension *
                  </label>
                  <textarea
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Explain why this verification is being suspended..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Suspension Duration (days)
                  </label>
                  <select
                    value={suspendDuration}
                    onChange={(e) => setSuspendDuration(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600  px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="">Indefinite</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setShowSuspendModal(false);
                    setSuspendReason('');
                    setSuspendDuration('30');
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={suspendVerification}
                  disabled={actionLoading || !suspendReason.trim()}
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white  font-medium transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Suspending...' : 'Suspend'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminVerificationDashboard;
