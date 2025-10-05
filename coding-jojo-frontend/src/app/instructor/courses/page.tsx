'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Users, 
  Clock, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Play,
  Grid3x3,
  List
} from 'lucide-react';
import Link from 'next/link';
import teacherService from '../../../services/teacherService';
import { useToast } from '../../../hooks/useToast';

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  currency: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  studentsCount: number;
  rating: number;
  reviewsCount: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  totalLessons: number;
  completionRate: number;
  revenue: number;
  isPublished: boolean;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('updated');
  const toast = useToast();

  const categories = [
    'all',
    'Programming',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'AI/ML',
    'DevOps',
    'Design',
    'Business'
  ];

  const statuses = [
    { value: 'all', label: 'All Courses' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const sortOptions = [
    { value: 'updated', label: 'Recently Updated' },
    { value: 'created', label: 'Recently Created' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'students', label: 'Most Students' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'revenue', label: 'Highest Revenue' }
  ];

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await teacherService.getCourses();
        
        if (response.success) {
          setCourses(response.data || []);
        } else {
          toast.error(response.message || 'Failed to load courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Remove toast dependency to prevent infinite re-renders

  const filteredCourses = Array.isArray(courses) ? courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesStatus && matchesLevel;
  }) : [];

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'students':
        return b.studentsCount - a.studentsCount;
      case 'rating':
        return b.rating - a.rating;
      case 'revenue':
        return b.revenue - a.revenue;
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: // updated
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800 border-green-200',
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const renderCourseCard = (course: Course) => (
    <div key={course._id} className="bg-gray-800  border border-gray-700 overflow-hidden hover:border-pink-500 transition-all duration-200 group">
      {/* Course Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(course.status)}`}>
            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelBadge(course.level)}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
        </div>
        {course.isPublished && (
          <div className="absolute bottom-3 right-3">
            <Play className="h-8 w-8 text-white bg-black bg-opacity-50 rounded-full p-2" />
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <div className="relative">
            <button className="p-1 text-gray-400 hover:text-white">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-400">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.studentsCount}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            {course.rating > 0 && (
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span>{course.rating}</span>
                <span className="text-gray-400 ml-1">({course.reviewsCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Price and Revenue */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold text-white">
            {formatCurrency(course.price)}
          </div>
          {course.revenue > 0 && (
            <div className="text-sm text-green-400">
              Revenue: {formatCurrency(course.revenue)}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Link
            href={`/instructor/courses/${course._id}`}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-center py-2 px-4  transition-colors text-sm font-medium"
          >
            <Eye className="h-4 w-4 inline mr-2" />
            View
          </Link>
          <Link
            href={`/instructor/courses/edit/${course._id}`}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4  transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4  transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderCourseList = (course: Course) => (
    <div key={course._id} className="bg-gray-800  border border-gray-700 p-4 hover:border-pink-500 transition-all duration-200">
      <div className="flex items-center space-x-4">
        {/* Thumbnail */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-20 h-14 object-cover "
        />

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-lg font-semibold text-white truncate">{course.title}</h3>
              <p className="text-gray-400 text-sm truncate">{course.description}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(course.status)}`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelBadge(course.level)}`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.studentsCount} students</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDuration(course.duration)}</span>
              </div>
              {course.rating > 0 && (
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span>{course.rating} ({course.reviewsCount} reviews)</span>
                </div>
              )}
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{formatCurrency(course.price)}</span>
              </div>
              {course.revenue > 0 && (
                <div className="flex items-center text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>{formatCurrency(course.revenue)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href={`/instructor/courses/${course._id}`}
                className="bg-pink-600 hover:bg-pink-700 text-white py-1 px-3  transition-colors text-sm"
              >
                View
              </Link>
              <Link
                href={`/instructor/courses/edit/${course._id}`}
                className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3  transition-colors text-sm"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading Courses</h3>
          <p className="text-gray-400">Fetching your course content...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-3">
                My Courses
              </h1>
              <p className="text-gray-300 text-lg">Manage and track your course content</p>
            </div>
            
            <Link
              href="/instructor/courses/new"
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4  font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-pink-500/25 backdrop-blur-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Course
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-orange-500/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold text-white">{courses.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500  flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-500/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Students</p>
                <p className="text-3xl font-bold text-white">
                  {Array.isArray(courses) ? courses.reduce((sum, course) => sum + course.studentsCount, 0) : 0}
                </p>
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
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(Array.isArray(courses) ? courses.reduce((sum, course) => sum + course.revenue, 0) : 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500  flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-gray-700/50  p-6 hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Avg. Rating</p>
                <p className="text-3xl font-bold text-white">
                  {Array.isArray(courses) && courses.filter(c => c.rating > 0).length > 0 
                    ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.filter(c => c.rating > 0).length).toFixed(1)
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
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 p-6  border border-gray-700 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600  text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-gray-700 border border-gray-600  px-3 py-2 text-white focus:border-pink-500 focus:outline-none"
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
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

            {/* View Toggle */}
            <div className="flex items-center bg-gray-700  p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-pink-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-pink-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      {sortedCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
          <p className="text-gray-400 mb-6">
            {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all' || selectedLevel !== 'all'
              ? 'Try adjusting your filters or search term'
              : 'Create your first course to get started'
            }
          </p>
          <Link
            href="/instructor/courses/new"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3  font-medium transition-colors inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {sortedCourses.map(course => 
            viewMode === 'grid' ? renderCourseCard(course) : renderCourseList(course)
          )}
        </div>
      )}
    </>
  );
}
