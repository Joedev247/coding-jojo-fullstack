"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Award,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { courseService } from "../../../lib/courseService";
import { dashboardService, EnrolledCourse } from "../../../lib/dashboardService";

// Define proper types matching the backend API
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string | { url: string };
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
  };
  duration: string | { hours: number; minutes: number };
  studentsCount?: number;
  totalEnrollments?: number;
  rating?: number;
  averageRating?: number;
  reviewsCount?: number;
  totalRatings?: number;
  price: number;
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "Beginner" | "Intermediate" | "Advanced";
  status?: "available" | "enrolled" | "completed";
  progress?: number;
  lastAccessed?: string;
  isPremium?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

interface CourseFilters {
  search: string;
  category: string;
  level: string;
  sort: string;
}

interface CourseStats {
  totalCourses: number;
  enrolledCourses: number;
  completedCourses: number;
  averageRating: number;
}

// Helper function to get user initials
const getUserInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Courses: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "completed">("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  const [courseStats, setCourseStats] = useState<CourseStats>({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    averageRating: 0
  });

  const categories = [
    "All",
    "JavaScript",
    "React",
    "TypeScript",
    "Python",
    "Node.js",
    "CSS",
    "Web Development",
    "Data Science",
    "Machine Learning"
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  // Fetch all courses and user's enrolled courses
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all available courses
        const coursesResponse = await courseService.getAllCourses({
          page: 1,
          limit: 50, // Get more courses to start with
          sort: 'newest'
        });

        // Fetch user's enrolled courses
        const dashboardResponse = await dashboardService.getDashboardData();

        if (coursesResponse.success && coursesResponse.data) {
          // coursesResponse.data is the courses array directly
          const allCourses = Array.isArray(coursesResponse.data) 
            ? coursesResponse.data 
            : (coursesResponse.data as any).courses || [];
          
          const userEnrolledCourses = dashboardResponse.success && dashboardResponse.data 
            ? dashboardResponse.data.enrolledCourses || []
            : [];

          // Transform and merge course data with enrollment status
          const transformedCourses: Course[] = allCourses.map((course: any) => {
            const enrollment = userEnrolledCourses.find((enrolled: any) => enrolled.id === course.id);
            
            return {
              id: course.id,
              title: course.title,
              description: course.description,
              thumbnail: typeof course.thumbnail === 'string' 
                ? course.thumbnail 
                : course.thumbnail?.url || '/api/placeholder/400/200',
              instructor: {
                id: course.instructor.id,
                name: course.instructor.name,
                avatar: course.instructor.avatar || '/api/placeholder/100/100',
                bio: course.instructor.bio
              },
              duration: typeof course.duration === 'object' 
                ? `${course.duration.hours}h ${course.duration.minutes}m`
                : course.duration || 'Duration TBD',
              studentsCount: course.totalEnrollments || 0,
              rating: course.averageRating || 0,
              reviewsCount: course.totalRatings || 0,
              price: course.price,
              category: course.category,
              level: course.level,
              status: enrollment 
                ? (enrollment.status === 'completed' ? 'completed' : 'enrolled')
                : 'available',
              progress: enrollment?.progress || 0,
              lastAccessed: enrollment?.lastAccessed,
              isPremium: course.isPremium,
              isFeatured: course.isFeatured,
              tags: course.tags
            };
          });

          setCourses(transformedCourses);
          setEnrolledCourses(userEnrolledCourses);

          // Calculate course statistics
          const stats: CourseStats = {
            totalCourses: transformedCourses.length,
            enrolledCourses: userEnrolledCourses.length,
            completedCourses: userEnrolledCourses.filter(c => c.status === 'completed').length,
            averageRating: transformedCourses.length > 0 
              ? transformedCourses.reduce((sum, course) => sum + (course.rating || 0), 0) / transformedCourses.length
              : 0
          };

          console.log('🔍 Final Course Stats:', stats);
          console.log('🔍 Transformed Courses Count:', transformedCourses.length);

          setCourseStats(stats);

        } else {
          setError(coursesResponse.error || 'Failed to fetch courses');
        }
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError('An error occurred while loading courses');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle course enrollment
  const handleEnrollInCourse = async (courseId: string) => {
    if (enrollingCourseId) return; // Prevent double enrollment
    
    setEnrollingCourseId(courseId);
    try {
      const response = await courseService.enrollInCourse(courseId);
      
      if (response.success) {
        // Update the course status locally
        setCourses(prevCourses => 
          prevCourses.map(course => 
            course.id === courseId 
              ? { ...course, status: 'enrolled' as const, progress: 0 }
              : course
          )
        );
        
        // Update stats
        setCourseStats(prevStats => ({
          ...prevStats,
          enrolledCourses: prevStats.enrolledCourses + 1
        }));
        
        // Show success message (if toast is available)
        console.log('Successfully enrolled in course!');
        
        // Refresh data to get updated enrollment info
        const dashboardResponse = await dashboardService.getDashboardData();
        if (dashboardResponse.success && dashboardResponse.data) {
          setEnrolledCourses(dashboardResponse.data.enrolledCourses);
        }
      } else {
        console.error('Enrollment failed:', response.error);
        alert('Failed to enroll in course. Please try again.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred while enrolling. Please try again.');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  // Handle course navigation (continue learning)
  const handleContinueLearning = (courseId: string) => {
    // Navigate to course learning page
    window.location.href = `/courses/${courseId}/learn`;
  };

  // Handle view certificate
  const handleViewCertificate = (courseId: string) => {
    // Navigate to certificate page
    window.location.href = `/certificates/${courseId}`;
  };

  // Helper function to format duration
  const formatDuration = (duration: string | { hours: number; minutes: number }): string => {
    if (typeof duration === 'string') {
      return duration;
    }
    return `${duration.hours}h ${duration.minutes}m`;
  };

  // Helper function to get thumbnail URL
  const getThumbnailUrl = (thumbnail: string | { url: string }): string => {
    if (typeof thumbnail === 'string') {
      return thumbnail;
    }
    return thumbnail.url || '/api/placeholder/400/200';
  };
  const getStatusBadge = (course: Course) => {
    switch (course.status) {
      case "enrolled":
        return (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium">
              Enrolled
            </span>
            {course.progress && course.progress > 0 && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium">
                {course.progress}% Complete
              </span>
            )}
          </div>
        );
      case "completed":
        return (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium">
            Completed
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium">
            Available
          </span>
        );
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || course.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesTab = activeTab === "all" || course.status === activeTab;

    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-8 p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-8 p-8">
        <div className="text-center py-12">
          <div className="text-red-400 mb-4">
            <span className="text-4xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Failed to Load Courses</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 p-8">
        {/* User Welcome Section */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              {user?.profilePicture &&
              typeof user.profilePicture === "string" &&
              user.profilePicture.trim() !== "" ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-pink-500 to-orange-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-semibold text-lg">
                  {getUserInitials(user?.name || "User")}
                </div>
              )}
              {user?.isPremium && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Welcome back, {user?.name || "Student"}! 👋
              </h2>
              <p className="text-gray-400">
                Continue your learning journey with personalized courses
                {user?.isPremium && (
                  <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold">
                    Premium Member
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Course Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-pink-400" />
              <span className="text-2xl font-bold text-white">
                {courseStats.totalCourses}
              </span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              Total Courses
            </h4>
            <p className="text-xs text-gray-500">Available to enroll</p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Play className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400">
                {courseStats.enrolledCourses}
              </span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">Enrolled</h4>
            <p className="text-xs text-gray-500">Active learning</p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">
                {courseStats.completedCourses}
              </span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              Completed
            </h4>
            <p className="text-xs text-gray-500">Certificates earned</p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Star className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">
                {courseStats.averageRating > 0 ? courseStats.averageRating.toFixed(1) : '0.0'}
              </span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              Avg. Rating
            </h4>
            <p className="text-xs text-gray-500">Course quality</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3  bg-gray-900/50 border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3  bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-800 text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="lg:w-48">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3  bg-gray-900/50 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-300"
              >
                {levels.map((level) => (
                  <option
                    key={level}
                    value={level}
                    className="bg-gray-800 text-white"
                  >
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setActiveTab("enrolled")}
              className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === "enrolled"
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-8 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === "completed"
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
            <div
              key={course.id}
              className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 overflow-hidden hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={getThumbnailUrl(course.thumbnail)}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(course)}
                </div>
                {course.status === "enrolled" && (
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <Play className="h-6 w-6" />
                  </button>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-400">
                    {course.instructor.name}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300">
                  {course.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{(course.studentsCount || course.totalEnrollments || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{(course.rating || course.averageRating || 0).toFixed(1)}</span>
                  </div>
                </div>

                {course.progress && course.progress > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ${course.price.toFixed(2)}
                  </span>

                  {course.status === "enrolled" ? (
                    <button 
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
                      onClick={() => handleContinueLearning(course.id)}
                    >
                      Continue Learning
                    </button>
                  ) : course.status === "completed" ? (
                    <button 
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-300"
                      onClick={() => handleViewCertificate(course.id)}
                    >
                      View Certificate
                    </button>
                  ) : (
                    <button 
                      className="px-6 py-3 bg-gray-700/50 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleEnrollInCourse(course.id)}
                      disabled={enrollingCourseId === course.id}
                    >
                      {enrollingCourseId === course.id ? 'Enrolling...' : 'Enroll Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "All" || selectedLevel !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "No courses are available at the moment"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
