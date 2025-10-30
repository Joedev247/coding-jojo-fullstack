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
      active: 'bg-blue-100 text-blue-800 border-blue-200',
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <h3 className="text-xs font-semibold text-gray-900 mb-1">Loading Students</h3>
          <p className="text-gray-600 text-sm">Fetching your student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 border border-gray-200  p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mr-4 shadow-md">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                My Students
              </h1>
              <p className="text-gray-600 text-sm">Manage and connect with your course students</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5  font-medium transition-all duration-200 flex items-center text-sm border border-gray-200">
              <Download className="h-3 w-3 mr-1" />
              Export
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1.5  font-medium transition-all duration-200 flex items-center shadow-md text-sm">
              <Mail className="h-3 w-3 mr-1" />
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200  p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium">Total Students</p>
              <p className="text-xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200  p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium">Active Students</p>
              <p className="text-xl font-bold text-gray-900">
                {Array.isArray(students) ? students.filter(s => s.status === 'active').length : 0}
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700  flex items-center justify-center">
              <UserCheck className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200  p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium">Total Revenue</p>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(Array.isArray(students) ? students.reduce((sum, student) => sum + student.totalSpent, 0) : 0)}
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200  p-4 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs font-medium">Avg. Rating</p>
              <p className="text-xl font-bold text-gray-900">
                {Array.isArray(students) && students.filter(s => s.averageRating > 0).length > 0 
                  ? (students.reduce((sum, student) => sum + student.averageRating, 0) / students.filter(s => s.averageRating > 0).length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-yellow-700  flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200  p-4 mb-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-300  text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300  px-2 py-1.5 text-gray-900 focus:border-blue-500 focus:outline-none text-sm"
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
              className="bg-white border border-gray-300  px-2 py-1.5 text-gray-900 focus:border-blue-500 focus:outline-none text-sm"
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
        <div className="text-center py-8 bg-white  border border-gray-200">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xs font-semibold text-gray-900 mb-1">No students found</h3>
          <p className="text-gray-600 text-sm">
            {searchTerm || selectedStatus !== 'all'
              ? 'Try adjusting your filters or search term'
              : 'Students will appear here once they enroll in your courses'
            }
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200  overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
              <div className="col-span-3">Student</div>
              <div className="col-span-2">Courses</div>
              <div className="col-span-2">Progress</div>
              <div className="col-span-2">Revenue</div>
              <div className="col-span-2">Last Active</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {sortedStudents.map((student) => (
              <div key={student._id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-3 items-center">
                  {/* Student Info */}
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                        <p className="text-xs text-gray-600 truncate">{student.email}</p>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(student.status)}`}>
                            {student.status}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Globe className="h-2.5 w-2.5 mr-0.5" />
                            {student.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="col-span-2">
                    <div className="text-xs">
                      <div className="text-gray-900 font-medium">{student.totalCourses} total</div>
                      <div className="text-xs text-gray-600">
                        {student.completedCourses} completed, {student.inProgressCourses} in progress
                      </div>
                      {student.certificates > 0 && (
                        <div className="flex items-center text-xs text-yellow-600 mt-0.5">
                          <Award className="h-2.5 w-2.5 mr-0.5" />
                          {student.certificates} certificates
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="col-span-2">
                    <div className="text-xs">
                      {student.averageRating > 0 && (
                        <div className="flex items-center text-yellow-600 mb-0.5">
                          <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                          <span className="text-gray-900">{student.averageRating}</span>
                          <span className="text-xs text-gray-500 ml-0.5">({student.totalReviews})</span>
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-600">
                        <Clock className="h-2.5 w-2.5 mr-0.5" />
                        {formatDuration(student.totalStudyTime)} studied
                      </div>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="col-span-2">
                    <div className="text-xs font-medium text-gray-900">
                      {formatCurrency(student.totalSpent)}
                    </div>
                    <div className="text-xs text-gray-600">
                      Joined {formatDate(student.joinedDate)}
                    </div>
                  </div>

                  {/* Last Active */}
                  <div className="col-span-2">
                    <div className="text-xs text-gray-700">
                      {formatDate(student.lastActivity)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => openStudentModal(student)}
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="View Details"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="Send Message"
                      >
                        <MessageCircle className="h-3 w-3" />
                      </button>
                      <button
                        className="text-gray-400 hover:text-blue-600 p-1"
                        title="More Options"
                      >
                        <MoreVertical className="h-3 w-3" />
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
          <div className="bg-white  border border-gray-200 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-gray-600 text-sm">{selectedStudent.email}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <Globe className="h-3 w-3 mr-1" />
                        {selectedStudent.location}
                      </div>
                      {selectedStudent.phone && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {selectedStudent.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{selectedStudent.totalCourses}</div>
                  <div className="text-xs text-gray-600">Total Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{selectedStudent.completedCourses}</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">{selectedStudent.certificates}</div>
                  <div className="text-xs text-gray-600">Certificates</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{formatCurrency(selectedStudent.totalSpent)}</div>
                  <div className="text-xs text-gray-600">Total Spent</div>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h4 className="text-xs font-semibold text-gray-900 mb-3">Enrolled Courses</h4>
                <div className="space-y-2">
                  {selectedStudent.enrolledCourses.map((course) => (
                    <div key={course.courseId} className="bg-gray-50 p-3  border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 text-sm">{course.courseTitle}</h5>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          course.completed 
                            ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {course.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div>Enrolled: {formatDate(course.enrolledDate)}</div>
                        <div>Last accessed: {formatDate(course.lastAccessed)}</div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
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
