'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen,
  Video,
  Award,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Play,
  Pause,
  Settings,
  Download,
  Share2,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Grid,
  List,
  ArrowUp,
  ArrowDown,
  Zap,
  Star,
  Globe,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { courseService, Course } from '../../services/courseService';
import { paymentService } from '../../services/paymentService';
import { videoService } from '../../services/videoService';
import CourseBuilder from '../course/CourseBuilder';
import LiveSessionManager from '../live/LiveSessionManager';
import CertificateGenerator from '../certificate/CertificateGenerator';
import PaymentGateway from '../payment/PaymentGateway';
import CustomVideoPlayer from '../video/CustomVideoPlayer';
import AnimatedBackground from '../ui/AnimatedBackground';
import InstructorSidebar from '../instructor/InstructorSidebar';

interface InstructorDashboardProps {
  instructorId: string;
  instructorName: string;
}

interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  totalWatchTime: number;
  completionRate: number;
  avgRating: number;
  monthlyGrowth: {
    students: number;
    revenue: number;
    courses: number;
  };
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

export default function InstructorDashboard({
  instructorId,
  instructorName
}: InstructorDashboardProps) {
  const { success: showSuccess, error: showError } = useToast();
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'videos' | 'live' | 'certificates' | 'payments' | 'analytics'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    totalWatchTime: 0,
    completionRate: 0,
    avgRating: 0,
    monthlyGrowth: { students: 0, revenue: 0, courses: 0 }
  });
  
  // Data States
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI State
  const [showCourseBuilder, setShowCourseBuilder] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  useEffect(() => {
    loadDashboardData();
    
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [instructorId]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Load courses with fallback
      try {
        const coursesResponse = await courseService.getInstructorCourses(instructorId);
        setCourses(coursesResponse.data || []);
      } catch (error) {
        console.error('Failed to load courses:', error);
        setCourses([]);
      }
      
      // Load stats with fallback
      try {
        const statsResponse = await courseService.getInstructorStats(instructorId);
        setStats(statsResponse.data || {
          totalStudents: 0,
          totalCourses: 0,
          totalRevenue: 0,
          totalWatchTime: 0,
          completionRate: 0,
          avgRating: 0,
          monthlyGrowth: { students: 0, revenue: 0, courses: 0 }
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
        setStats({
          totalStudents: 0,
          totalCourses: 0,
          totalRevenue: 0,
          totalWatchTime: 0,
          completionRate: 0,
          avgRating: 0,
          monthlyGrowth: { students: 0, revenue: 0, courses: 0 }
        });
      }
      
      // Load recent activity (mock data for now)
      setRecentActivity([
        {
          id: '1',
          type: 'course_completion',
          message: 'John Doe completed "React Fundamentals"',
          timestamp: new Date().toISOString(),
          icon: CheckCircle,
          color: 'text-blue-400'
        },
        {
          id: '2',
          type: 'payment',
          message: 'New payment received: 15,000 XAF',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          icon: DollarSign,
          color: 'text-blue-400'
        },
        {
          id: '3',
          type: 'enrollment',
          message: 'Sarah Johnson enrolled in "JavaScript Basics"',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          icon: Users,
          color: 'text-blue-400'
        }
      ]);
      
      // Load notifications
      setNotifications([
        {
          id: '1',
          title: 'Course Review Received',
          message: 'Your course "React Fundamentals" received a 5-star review',
          timestamp: new Date().toISOString(),
          read: false,
          type: 'review'
        },
        {
          id: '2',
          title: 'Live Session Reminder',
          message: 'Your live session starts in 30 minutes',
          timestamp: new Date(Date.now() + 1800000).toISOString(),
          read: false,
          type: 'session'
        }
      ]);
      
    } catch (error: any) {
      showError(error.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: 'create_course',
      title: 'Create Course',
      description: 'Start building a new course',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-blue-500 to-purple-500',
      action: () => {
        setEditingCourse(null);
        setShowCourseBuilder(true);
        setActiveTab('courses');
      }
    },
    {
      id: 'schedule_live',
      title: 'Schedule Live Session',
      description: 'Plan a live session with students',
      icon: <Calendar className="h-6 w-6" />,
      color: 'from-blue-500 to-teal-500',
      action: () => setActiveTab('live')
    },
    {
      id: 'generate_certificate',
      title: 'Generate Certificates',
      description: 'Create completion certificates',
      icon: <Award className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500',
      action: () => setActiveTab('certificates')
    },
    {
      id: 'view_analytics',
      title: 'View Analytics',
      description: 'Check course performance',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-pink-500 to-red-500',
      action: () => setActiveTab('analytics')
    }
  ];

  const filteredCourses = (courses || []).filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gray-900/50 backdrop-blur-sm p-6  border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Students</p>
            <p className="text-3xl font-bold text-white mb-2">{stats.totalStudents.toLocaleString()}</p>
            <div className="flex items-center space-x-1">
              <ArrowUp className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+{stats.monthlyGrowth.students}% this month</span>
            </div>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-full">
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm p-6  border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-white mb-2">{stats.totalRevenue.toLocaleString()} XAF</p>
            <div className="flex items-center space-x-1">
              <ArrowUp className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">+{stats.monthlyGrowth.revenue}% this month</span>
            </div>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-full">
            <DollarSign className="h-8 w-8 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm p-6  border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Course Completion</p>
            <p className="text-3xl font-bold text-white mb-2">{stats.completionRate}%</p>
            <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
          <div className="p-3 bg-pink-500/20 rounded-full">
            <TrendingUp className="h-8 w-8 text-pink-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-sm p-6  border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Average Rating</p>
            <div className="flex items-center space-x-2 mb-2">
              <p className="text-3xl font-bold text-white">{stats.avgRating}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(stats.avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded-full">
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecentActivity = () => (
    <div className="bg-gray-900/50 backdrop-blur-sm p-6  border border-gray-700/50 shadow-xl">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Clock className="h-5 w-5 mr-2 text-pink-400" />
        Recent Activity
      </h3>
      
      <div className="space-y-4">
        {(recentActivity || []).map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3 p-4 bg-gray-800/50  border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-200">
              <div className="p-2 bg-gray-700/50 rounded-full">
                <IconComponent className={`h-5 w-5 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{activity.message}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {(recentActivity || []).length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="h-8 w-8 text-gray-500" />
          </div>
          <p className="text-gray-400">No recent activity</p>
        </div>
      )}
    </div>
  );

  const renderQuickActions = () => (
    <div className="bg-gray-900/50 backdrop-blur-sm p-6  border border-gray-700/50 shadow-xl">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
        <Zap className="h-5 w-5 mr-2 text-orange-400" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`group p-4  bg-gradient-to-r ${action.color} hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 text-left border border-white/10 hover:scale-105`}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20  group-hover:bg-white/30 transition-colors">
                {action.icon}
              </div>
              <div>
                <h4 className="text-white font-semibold">{action.title}</h4>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return showCourseBuilder ? (
          <CourseBuilder
            course={editingCourse || undefined}
            isEditing={!!editingCourse}
            onSave={(course) => {
              loadDashboardData();
              setShowCourseBuilder(false);
              setEditingCourse(null);
              showSuccess('Course saved successfully!');
            }}
            onPublish={(course) => {
              loadDashboardData();
              setShowCourseBuilder(false);
              setEditingCourse(null);
              showSuccess('Course published successfully!');
            }}
          />
        ) : (
          <div className="space-y-6">
            {/* Course Management Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">My Courses</h2>
                <p className="text-gray-400 mt-1">Manage and organize your course content</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50  text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 bg-gray-800/50 border border-gray-600/50  text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50  text-white transition-all"
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </button>
                
                <button
                  onClick={() => {
                    setEditingCourse(null);
                    setShowCourseBuilder(true);
                  }}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white  font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Course</span>
                </button>
              </div>
            </div>

            {/* Courses Grid/List */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-12 w-12 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {(courses || []).length === 0 ? 'No courses yet' : 'No courses match your filters'}
                </h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  {(courses || []).length === 0 
                    ? 'Create your first course to start teaching and inspiring students worldwide'
                    : 'Try adjusting your search or filter criteria to find what you\'re looking for'
                  }
                </p>
                {(courses || []).length === 0 && (
                  <button
                    onClick={() => {
                      setEditingCourse(null);
                      setShowCourseBuilder(true);
                    }}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white  font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Course
                  </button>
                )}
              </div>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {filteredCourses.map((course) => (
                  <div key={course._id} className={`group bg-gray-900/50 backdrop-blur-sm  border border-gray-700/50 overflow-hidden hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}>
                    <div className={`${viewMode === 'list' ? 'w-48 h-32' : 'h-48'} bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center relative overflow-hidden`}>
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-pink-500 to-orange-500">
                          <BookOpen className="h-12 w-12 text-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-white text-lg group-hover:text-pink-400 transition-colors truncate flex-1">
                          {course.title}
                        </h3>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                          course.status === 'published' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : course.status === 'draft'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {course.shortDescription || course.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{course.studentsEnrolled || 0}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>{course.rating?.average || 0}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{Math.floor((course.totalDuration || 0) / 60)}h</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setShowCourseBuilder(true);
                          }}
                          className="flex-1 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-white  text-sm font-medium transition-all border border-gray-600/50 hover:border-gray-500/50"
                        >
                          Edit Course
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setActiveTab('analytics');
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white  text-sm font-medium transition-all"
                        >
                          <BarChart3 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'live':
        return (
          <LiveSessionManager
            courseId={selectedCourse?._id || ''}
            instructorId={instructorId}
            onSessionUpdate={() => loadDashboardData()}
          />
        );

      case 'certificates':
        return (
          <CertificateGenerator
            courseId={selectedCourse?._id || courses[0]?._id || ''}
            courseName={selectedCourse?.title || courses[0]?.title || ''}
            instructorName={instructorName}
            onCertificateGenerated={() => showSuccess('Certificate generated successfully!')}
          />
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <PaymentGateway
              courseId=""
              amount={0}
              currency="XAF"
              onSuccess={(result) => {
                showSuccess('Payment processed successfully!');
                loadDashboardData();
              }}
              onError={(error) => {
                showError(error || 'Payment failed');
              }}
            />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-12 w-12 text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Analytics Dashboard</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Detailed analytics and insights will be available here to help you track your teaching performance and student engagement
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {renderStatsCards()}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {renderRecentActivity()}
              {renderQuickActions()}
            </div>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen text-white relative">
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Loading Dashboard</h3>
            <p className="text-gray-400">Preparing your teaching workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />

      {/* Navigation Tabs */}
      <div className="relative z-10 bg-gray-900 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'live', label: 'Live Sessions', icon: Calendar },
              { id: 'certificates', label: 'Certificates', icon: Award },
              { id: 'payments', label: 'Payments', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-6 rounded-t-lg transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500/20 to-orange-500/20 border-b-2 border-pink-500 text-pink-400 shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
}
