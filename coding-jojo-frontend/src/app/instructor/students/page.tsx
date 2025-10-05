'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  MessageCircle, 
  MoreVertical,
  Star,
  Clock,
  BookOpen,
  TrendingUp,
  Award,
  Eye,
  Ban,
  UserCheck,
  Download,
  Calendar,
  Globe,
  Phone
} from 'lucide-react';
import teacherService from '../../../services/teacherService';
import { useToast } from '../../../hooks/useToast';

interface Student {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  location: string;
  phone?: string;
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalSpent: number;
  averageRating: number;
  totalReviews: number;
  lastActivity: string;
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: {
    courseId: string;
    courseTitle: string;
    enrolledDate: string;
    progress: number;
    completed: boolean;
    lastAccessed: string;
  }[];
  certificates: number;
  totalStudyTime: number; // in minutes
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const toast = useToast();

  const statusOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Joined' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'courses', label: 'Most Courses' },
    { value: 'spent', label: 'Highest Spending' },
    { value: 'activity', label: 'Last Activity' }
  ];

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await teacherService.getStudents();
        
        if (response.success) {
          setStudents(response.data || []);
        } else {
          toast.error(response.message || 'Failed to load students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []); // Remove toast dependency to prevent infinite re-renders

  const filteredStudents = Array.isArray(students) ? students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

    return matchesSearch && matchesStatus;
  }) : [];

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'courses':
        return b.totalCourses - a.totalCourses;
      case 'spent':
        return b.totalSpent - a.totalSpent;
      case 'activity':
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      default: // recent
        return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    }
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      suspended: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  const openStudentModal = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Users className="h-8 w-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading Students</h3>
          <p className="text-gray-400">Fetching your student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-700/50  p-8 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                My Students
              </h1>
              <p className="text-gray-300 text-lg">Manage and connect with your course students</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3  font-semibold transition-all duration-200 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-6 py-3  font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-pink-500/25">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-white">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500  flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Students</p>
              <p className="text-3xl font-bold text-white">
                {Array.isArray(students) ? students.filter(s => s.status === 'active').length : 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500  flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(Array.isArray(students) ? students.reduce((sum, student) => sum + student.totalSpent, 0) : 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500  flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Avg. Rating</p>
              <p className="text-3xl font-bold text-white">
                {Array.isArray(students) && students.filter(s => s.averageRating > 0).length > 0 
                  ? (students.reduce((sum, student) => sum + student.averageRating, 0) / students.filter(s => s.averageRating > 0).length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500  flex items-center justify-center">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50  p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      {sortedStudents.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No students found</h3>
          <p className="text-gray-400">
            {searchTerm || selectedStatus !== 'all'
              ? 'Try adjusting your filters or search term'
              : 'Students will appear here once they enroll in your courses'
            }
          </p>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50  overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
              <div className="col-span-3">Student</div>
              <div className="col-span-2">Courses</div>
              <div className="col-span-2">Progress</div>
              <div className="col-span-2">Revenue</div>
              <div className="col-span-2">Last Active</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-700">
            {sortedStudents.map((student) => (
              <div key={student._id} className="px-6 py-4 hover:bg-gray-750 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Student Info */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white truncate">{student.name}</p>
                        <p className="text-xs text-gray-400 truncate">{student.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(student.status)}`}>
                            {student.status}
                          </span>
                          <div className="flex items-center text-xs text-gray-400">
                            <Globe className="h-3 w-3 mr-1" />
                            {student.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="col-span-2">
                    <div className="text-sm">
                      <div className="text-white font-medium">{student.totalCourses} total</div>
                      <div className="text-xs text-gray-400">
                        {student.completedCourses} completed, {student.inProgressCourses} in progress
                      </div>
                      {student.certificates > 0 && (
                        <div className="flex items-center text-xs text-yellow-400 mt-1">
                          <Award className="h-3 w-3 mr-1" />
                          {student.certificates} certificates
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="col-span-2">
                    <div className="text-sm">
                      {student.averageRating > 0 && (
                        <div className="flex items-center text-yellow-400 mb-1">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          <span className="text-white">{student.averageRating}</span>
                          <span className="text-xs text-gray-400 ml-1">({student.totalReviews})</span>
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDuration(student.totalStudyTime)} studied
                      </div>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-white">
                      {formatCurrency(student.totalSpent)}
                    </div>
                    <div className="text-xs text-gray-400">
                      Joined {formatDate(student.joinedDate)}
                    </div>
                  </div>

                  {/* Last Active */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-300">
                      {formatDate(student.lastActivity)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openStudentModal(student)}
                        className="text-gray-400 hover:text-white p-1"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-white p-1"
                        title="Send Message"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-white p-1"
                        title="More Options"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800  border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedStudent.name}</h3>
                    <p className="text-gray-400">{selectedStudent.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Globe className="h-4 w-4 mr-1" />
                        {selectedStudent.location}
                      </div>
                      {selectedStudent.phone && (
                        <div className="flex items-center text-sm text-gray-400">
                          <Phone className="h-4 w-4 mr-1" />
                          {selectedStudent.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{selectedStudent.totalCourses}</div>
                  <div className="text-xs text-gray-400">Total Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{selectedStudent.completedCourses}</div>
                  <div className="text-xs text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{selectedStudent.certificates}</div>
                  <div className="text-xs text-gray-400">Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">{formatCurrency(selectedStudent.totalSpent)}</div>
                  <div className="text-xs text-gray-400">Total Spent</div>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Enrolled Courses</h4>
                <div className="space-y-3">
                  {selectedStudent.enrolledCourses.map((course) => (
                    <div key={course.courseId} className="bg-gray-700 p-4 ">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-white">{course.courseTitle}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.completed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div>Enrolled: {formatDate(course.enrolledDate)}</div>
                        <div>Last accessed: {formatDate(course.lastAccessed)}</div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-pink-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
