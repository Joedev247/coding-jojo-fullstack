'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users,
  DollarSign,
  TrendingUp,
  Star,
  BookOpen,
  Calendar,
  Award,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowUp,
  Zap
} from 'lucide-react';
import Header from '../../../components/dashboard/Header';
import teacherService from '../../../services/teacherService';
import { useToast } from '../../../hooks/useToast';

interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalRevenue: number;
  avgRating: number;
  monthlyGrowth: {
    students: number;
    revenue: number;
    courses: number;
  };
}

interface Activity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  icon: any;
  color: string;
}

export default function InstructorDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardData = await teacherService.getDashboard();
        
        if (dashboardData.success) {
          setStats({
            totalStudents: dashboardData.data.totalStudents || 0,
            totalCourses: dashboardData.data.totalCourses || 0,
            totalRevenue: dashboardData.data.totalRevenue || 0,
            avgRating: dashboardData.data.avgRating || 0,
            monthlyGrowth: {
              students: dashboardData.data.monthlyGrowth?.students || 0,
              revenue: dashboardData.data.monthlyGrowth?.revenue || 0,
              courses: dashboardData.data.monthlyGrowth?.courses || 0
            }
          });
          
          // Transform activity data to match UI format
          const activities = (dashboardData.data.recentActivity || []).map((activity: any) => ({
            id: activity.id || activity._id,
            type: activity.type,
            message: activity.message,
            timestamp: activity.timestamp || activity.createdAt,
            icon: getActivityIcon(activity.type),
            color: getActivityColor(activity.type)
          }));
          
          setRecentActivity(activities);
        } else {
          toast.error(dashboardData.message || 'Failed to load dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Remove toast dependency to prevent infinite re-renders

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'course_completion':
        return CheckCircle;
      case 'payment':
        return DollarSign;
      case 'enrollment':
        return Users;
      default:
        return CheckCircle;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'course_completion':
        return 'text-blue-400';
      case 'payment':
        return 'text-blue-400';
      case 'enrollment':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const quickActions = [
    {
      id: 'create_course',
      title: 'Create Course',
      description: 'Start building a new course',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-blue-500 to-purple-500',
      href: '/instructor/courses/new'
    },
    {
      id: 'schedule_live',
      title: 'Schedule Live Session',
      description: 'Plan a live session with students',
      icon: <Calendar className="h-6 w-6" />,
      color: 'from-blue-500 to-teal-500',
      href: '/instructor/live-sessions'
    },
    {
      id: 'generate_certificate',
      title: 'Generate Certificates',
      description: 'Create completion certificates',
      icon: <Award className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500',
      href: '/instructor/certificates'
    },
    {
      id: 'view_analytics',
      title: 'View Students',
      description: 'Manage your students',
      icon: <Users className="h-6 w-6" />,
      color: 'from-pink-500 to-red-500',
      href: '/instructor/students'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="space-y-6">
        <Header title="Dashboard" subtitle="Welcome back! Here's your teaching overview" />

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : stats ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium">Total Students</p>
                  <p className="text-xl font-bold text-gray-900 mb-1">{stats.totalStudents}</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="h-3 w-3 text-blue-600" />
                    <span className="text-blue-600 text-xs">+{stats.monthlyGrowth.students}% this month</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-900 mb-1">{stats.totalRevenue.toLocaleString()} XAF</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="h-3 w-3 text-blue-600" />
                    <span className="text-blue-600 text-xs">+{stats.monthlyGrowth.revenue}% this month</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium">Total Courses</p>
                  <p className="text-xl font-bold text-gray-900 mb-1">{stats.totalCourses}</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="h-3 w-3 text-blue-600" />
                    <span className="text-blue-600 text-xs">+{stats.monthlyGrowth.courses} this month</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-xs font-medium">Average Rating</p>
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(stats.avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Activity */}
            <div className="bg-white border border-gray-200  shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-600" />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-100 rounded hover:bg-gray-100 transition-all duration-200">
                        <div className="p-1.5 bg-blue-100 rounded-full">
                          <IconComponent className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 text-xs font-medium">{activity.message}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-3 opacity-50" />
                    <p className="text-xs">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200  shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-blue-600" />
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    className="group p-3 bg-gray-50 border border-gray-200 rounded hover:shadow-md hover:bg-gray-100 transition-all duration-300 text-left hover:scale-105 block"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-blue-100 rounded group-hover:bg-blue-200 transition-colors">
                        <div className="text-blue-600">
                          {React.cloneElement(action.icon, { className: "h-3 w-3" })}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold text-xs">{action.title}</h4>
                        <p className="text-gray-600 text-xs">{action.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Failed to load dashboard data</p>
          </div>
        )}
      </div>
    </div>
  );
}
