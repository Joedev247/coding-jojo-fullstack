'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  DollarSign,
  Play,
  Edit,
  Share2,
  Download,
  Eye,
  MessageCircle,
  TrendingUp,
  Award,
  Calendar,
  BarChart3,
  Settings,
  ChevronRight,
  PlayCircle,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  currency: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  totalRevenue: number;
  completionRate: number;
  sections: CourseSection[];
  reviews: Review[];
  analytics: CourseAnalytics;
}

interface CourseSection {
  _id: string;
  title: string;
  lessons: Lesson[];
  isPublished: boolean;
  order: number;
}

interface Lesson {
  _id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  duration: number;
  isCompleted: boolean;
  isPublished: boolean;
  videoUrl?: string;
  content?: string;
  order: number;
}

interface Review {
  _id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface CourseAnalytics {
  totalViews: number;
  totalEnrollments: number;
  conversionRate: number;
  averageCompletionTime: number;
  dropoffPoints: string[];
  monthlyRevenue: { month: string; revenue: number }[];
  studentProgress: { completed: number; inProgress: number; notStarted: number };
}

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCourse: Course = {
      _id: courseId,
      title: 'Complete JavaScript Bootcamp 2024',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, DOM manipulation, async programming, and modern frameworks. This comprehensive course will take you from zero to hero in JavaScript development.',
      thumbnail: '/api/placeholder/800/400',
      price: 25000,
      currency: 'XAF',
      category: 'Programming',
      level: 'beginner',
      duration: 2400, // 40 hours
      studentsCount: 1250,
      rating: 4.8,
      reviewsCount: 324,
      status: 'published',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-03-10T14:30:00Z',
      totalRevenue: 31250000,
      completionRate: 78,
      sections: [
        {
          _id: '1',
          title: 'JavaScript Fundamentals',
          order: 1,
          isPublished: true,
          lessons: [
            {
              _id: '1',
              title: 'Introduction to JavaScript',
              type: 'video',
              duration: 15,
              isCompleted: false,
              isPublished: true,
              videoUrl: 'https://example.com/video1',
              order: 1
            },
            {
              _id: '2',
              title: 'Variables and Data Types',
              type: 'video',
              duration: 20,
              isCompleted: false,
              isPublished: true,
              videoUrl: 'https://example.com/video2',
              order: 2
            },
            {
              _id: '3',
              title: 'Knowledge Check: Basics',
              type: 'quiz',
              duration: 10,
              isCompleted: false,
              isPublished: true,
              order: 3
            }
          ]
        },
        {
          _id: '2',
          title: 'Advanced JavaScript Concepts',
          order: 2,
          isPublished: true,
          lessons: [
            {
              _id: '4',
              title: 'Asynchronous Programming',
              type: 'video',
              duration: 30,
              isCompleted: false,
              isPublished: true,
              videoUrl: 'https://example.com/video4',
              order: 1
            },
            {
              _id: '5',
              title: 'Build a Weather App',
              type: 'assignment',
              duration: 60,
              isCompleted: false,
              isPublished: true,
              order: 2
            }
          ]
        }
      ],
      reviews: [
        {
          _id: '1',
          studentName: 'Alice Mballa',
          studentAvatar: '/api/placeholder/40/40',
          rating: 5,
          comment: 'Excellent course! Very well structured and easy to follow. The instructor explains complex concepts in simple terms.',
          createdAt: '2024-03-01T10:00:00Z'
        },
        {
          _id: '2',
          studentName: 'Jean-Baptiste Nkomo',
          studentAvatar: '/api/placeholder/40/40',
          rating: 4,
          comment: 'Great content and practical examples. Would love to see more real-world projects.',
          createdAt: '2024-02-28T15:30:00Z'
        }
      ],
      analytics: {
        totalViews: 5420,
        totalEnrollments: 1250,
        conversionRate: 23.1,
        averageCompletionTime: 28, // days
        dropoffPoints: ['Section 3: Advanced Concepts', 'Section 5: Project Building'],
        monthlyRevenue: [
          { month: 'Jan', revenue: 12500000 },
          { month: 'Feb', revenue: 10200000 },
          { month: 'Mar', revenue: 8550000 }
        ],
        studentProgress: {
          completed: 975,
          inProgress: 200,
          notStarted: 75
        }
      }
    };

    setTimeout(() => {
      setCourse(mockCourse);
      setIsLoading(false);
    }, 1000);
  }, [courseId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-blue-100 text-blue-800 border-blue-200',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      archived: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  const getLevelBadge = (level: string) => {
    const styles = {
      beginner: 'bg-blue-100 text-blue-800 border-blue-200',
      intermediate: 'bg-orange-100 text-orange-800 border-orange-200',
      advanced: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[level as keyof typeof styles] || styles.beginner;
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6  border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-white">{course?.studentsCount}</p>
              <p className="text-blue-400 text-sm">+125 this month</p>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6  border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(course?.totalRevenue || 0)}</p>
              <p className="text-blue-400 text-sm">+8% this month</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6  border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold text-white">{course?.completionRate}%</p>
              <p className="text-yellow-400 text-sm">Industry avg: 65%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 p-6  border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-white mr-2">{course?.rating}</p>
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-400 text-sm">{course?.reviewsCount} reviews</p>
            </div>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className="bg-gray-800 p-6  border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Course Description</h3>
        <p className="text-gray-300 leading-relaxed">{course?.description}</p>
      </div>

      {/* Recent Reviews */}
      <div className="bg-gray-800 p-6  border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Reviews</h3>
          <Link href="#" className="text-pink-400 hover:text-pink-300 text-sm">
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {course?.reviews.slice(0, 3).map((review) => (
            <div key={review._id} className="flex space-x-3">
              <img
                src={review.studentAvatar}
                alt={review.studentName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-white">{review.studentName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">{formatDate(review.createdAt)}</p>
                </div>
                <p className="text-gray-300 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      {course?.sections.map((section) => (
        <div key={section._id} className="bg-gray-800  border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                <p className="text-gray-400 text-sm">
                  {section.lessons.length} lessons • {section.lessons.reduce((total, lesson) => total + lesson.duration, 0)} minutes
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                  section.isPublished 
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                }`}>
                  {section.isPublished ? 'Published' : 'Draft'}
                </span>
                <button className="text-gray-400 hover:text-white p-2">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-700">
            {section.lessons.map((lesson) => (
              <div key={lesson._id} className="p-4 hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {lesson.type === 'video' && <PlayCircle className="h-5 w-5 text-pink-400" />}
                      {lesson.type === 'text' && <FileText className="h-5 w-5 text-blue-400" />}
                      {lesson.type === 'quiz' && <AlertCircle className="h-5 w-5 text-yellow-400" />}
                      {lesson.type === 'assignment' && <Award className="h-5 w-5 text-blue-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{lesson.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="capitalize">{lesson.type}</span>
                        <span>{formatDuration(lesson.duration)}</span>
                        {lesson.isPublished && (
                          <span className="text-blue-400">Published</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-white p-2">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-white p-2">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <button className="w-full bg-gray-700 hover:bg-gray-600 border-2 border-dashed border-gray-600 text-gray-300 py-8  transition-colors">
        + Add New Section
      </button>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6  border border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Total Views</h4>
          <p className="text-2xl font-bold text-white">{course?.analytics.totalViews.toLocaleString()}</p>
        </div>
        
        <div className="bg-gray-800 p-6  border border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Conversion Rate</h4>
          <p className="text-2xl font-bold text-white">{course?.analytics.conversionRate}%</p>
        </div>
        
        <div className="bg-gray-800 p-6  border border-gray-700">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Avg. Completion Time</h4>
          <p className="text-2xl font-bold text-white">{course?.analytics.averageCompletionTime} days</p>
        </div>
      </div>

      {/* Student Progress */}
      <div className="bg-gray-800 p-6  border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Student Progress Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Completed</span>
              <span className="text-white">{course?.analytics.studentProgress.completed} students</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ 
                  width: `${(course?.analytics.studentProgress.completed || 0) / (course?.studentsCount || 1) * 100}%` 
                }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">In Progress</span>
              <span className="text-white">{course?.analytics.studentProgress.inProgress} students</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ 
                  width: `${(course?.analytics.studentProgress.inProgress || 0) / (course?.studentsCount || 1) * 100}%` 
                }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Not Started</span>
              <span className="text-white">{course?.analytics.studentProgress.notStarted} students</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gray-500 h-2 rounded-full"
                style={{ 
                  width: `${(course?.analytics.studentProgress.notStarted || 0) / (course?.studentsCount || 1) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Drop-off Points */}
      <div className="bg-gray-800 p-6  border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Common Drop-off Points</h3>
        <div className="space-y-3">
          {course?.analytics.dropoffPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              <p className="text-gray-300">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Course Not Found</h2>
          <p className="text-gray-400 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/instructor/courses"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3  transition-colors"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
          <Link href="/instructor/courses" className="hover:text-white">
            Courses
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">{course.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          {/* Course Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(course.status)}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getLevelBadge(course.level)}`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.studentsCount} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDuration(course.duration)}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                <span>{course.rating} ({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{formatCurrency(course.price)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Updated {formatDate(course.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2  transition-colors flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2  transition-colors flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <Link
              href={`/instructor/courses/edit/${course._id}`}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2  transition-colors flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Course
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700 mb-8">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'content', label: 'Content', icon: BookOpen },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverviewTab()}
      {activeTab === 'content' && renderContentTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
    </div>
  );
}
