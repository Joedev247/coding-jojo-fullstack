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
        return 'text-green-400';
      case 'payment':
        return 'text-green-400';
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
      color: 'from-green-500 to-teal-500',
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
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mr-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-300 text-lg">Welcome back! Here's your teaching overview</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        </div>
      ) : stats ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Students</p>
                  <p className="text-3xl font-bold text-white mb-2">{stats.totalStudents}</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm">+{stats.monthlyGrowth.students}% this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500  flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-white mb-2">{stats.totalRevenue.toLocaleString()} XAF</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm">+{stats.monthlyGrowth.revenue}% this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500  flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Total Courses</p>
                  <p className="text-3xl font-bold text-white mb-2">{stats.totalCourses}</p>
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 text-sm">+{stats.monthlyGrowth.courses} this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500  flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">Average Rating</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-3xl font-bold text-white">{stats.avgRating.toFixed(1)}</p>
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
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500  flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50  p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-pink-400" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => {
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
                  })
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50  p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-400" />
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action) => (
                  <a
                    key={action.id}
                    href={action.href}
                    className={`group p-4  bg-gradient-to-r ${action.color} hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 text-left border border-white/10 hover:scale-105 block`}
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
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Failed to load dashboard data</p>
        </div>
      )}
    </div>
  );
}
