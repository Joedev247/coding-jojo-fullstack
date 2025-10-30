"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  Clock,
  Home,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Bell,
  MoreVertical,
  User,
  Award,
  Grid3x3,
  List,
  Filter,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  SkipBack,
  Volume2,
  Maximize,
  Settings as SettingsIcon,
  Share2,
  Download,
  PlayCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Sidebar from "../../../components/dashboard/Sidebar";
import CourseCard from "../../../components/courses/CourseCard";
import { dashboardService } from "../../../lib/dashboardService";
import { Course } from "../../../types/courses";

// backend-driven courses state
const [/* placeholder for static mock removal */] = [];

export default function CoursesPage() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [sortBy, setSortBy] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "faq" | "discussion" | "reviews">("overview");
  const [expandedModules, setExpandedModules] = useState<number[]>([2]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user's enrolled courses from backend and map to Course type used by CourseCard
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      // Debug auth state
      console.debug('Dashboard Auth State:', {
        isAuthenticated,
        hasUser: !!user,
        userId: user?.id,
        userEmail: user?.email,
        token: localStorage.getItem('auth_token')?.substring(0, 10) + '...',
      });

      setLoadingCourses(true);
      try {
        console.debug('Fetching user courses...');
        const res = await dashboardService.getUserCourses();
        console.debug("dashboardService.getUserCourses response:", {
          success: res.success,
          error: res.error,
          dataExists: !!res.data,
          coursesLength: res.data?.length || 0
        });
        
        if (!mounted) return;
        if (res.success && res.data) {
          console.debug("mapping enrolled courses count:", res.data.length);
          // map enrolled courses to Course shape expected by CourseCard
          const mapped: Course[] = res.data.map((ec: any) => ({
            id: String(ec.id),
            title: ec.title,
            description: ec.description || "",
            thumbnail: ec.thumbnail || "/placeholder-course.jpg",
            thumbnailUrl: ec.thumbnail || ec.thumbnailUrl || "/placeholder-course.jpg",
            courseContent: [],
            instructor: {
              id: ec.instructor?.id || "",
              name: ec.instructor?.name || "",
              avatarUrl: ec.instructor?.avatar || "/testimonial-avatar.jpg",
              role: "instructor",
            },
            category: ec.category || "",
            tags: ec.tags || [],
            level: (ec.level as any) || "beginner",
            duration: ec.duration || ec.duration || "",
            lectures: ec.totalLessons || ec.lectures || 0,
            studentsEnrolled: ec.studentsEnrolled || 0,
            rating: ec.rating || 0,
            ratingCount: ec.ratingCount || 0,
            progress: ec.progress || 0,
            price: typeof ec.price === 'number' ? ec.price : ec.price ? Number(ec.price) : 0,
            originalPrice: ec.originalPrice,
            isFeatured: !!ec.isFeatured,
            isNew: !!ec.isNew,
            isSaved: !!ec.isSaved,
            createdAt: ec.enrolledAt || new Date().toISOString(),
            status: (ec.status as any) || 'published',
          }));

          setCourses(mapped);
          console.debug("mapped courses length:", mapped.length);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error('Error loading enrolled courses', err);
        setCourses([]);
      } finally {
        if (mounted) setLoadingCourses(false);
      }
    };

    load();
    return () => { mounted = false };
  }, []);

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">
            You need to be logged in to access your courses.
          </p>
        </div>
      </div>
    );
  }

  // Course Detail View
  if (selectedCourse) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />

        {/* Main Content - Course Detail */}
        <div className="flex-1 overflow-auto">
          {/* Top Header */}
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-100  transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-900">My Course</h2>
              </div>

              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 ">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <Image
                    src={user?.profilePicture || "/testimonial-avatar.jpg"}
                    alt={user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || "Martin nel"}
                    </p>
                    <ChevronDown className="w-4 h-4 text-gray-500 inline" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-8">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Content - Left */}
              <div className="col-span-8">
                {/* Video Player */}
                <div className="bg-gradient-to-br from-indigo-400 to-purple-500  overflow-hidden mb-6 relative">
                  <div className="aspect-video relative">
                    {/* Video Illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 400 300" className="w-full h-full">
                        {/* Document illustration */}
                        <rect x="100" y="60" width="150" height="180" rx="8" fill="white" opacity="0.9" />
                        <line x1="120" y1="90" x2="230" y2="90" stroke="#4F46E5" strokeWidth="2" />
                        <line x1="120" y1="110" x2="230" y2="110" stroke="#4F46E5" strokeWidth="2" />
                        <line x1="120" y1="130" x2="180" y2="130" stroke="#4F46E5" strokeWidth="2" />
                        
                        {/* Graph on document */}
                        <polyline
                          points="130,160 145,150 160,155 175,145 190,150 205,140 220,145"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                        />
                        <circle cx="130" cy="160" r="3" fill="#10B981" />
                        <circle cx="220" cy="145" r="3" fill="#10B981" />
                        
                        {/* Person */}
                        <circle cx="300" cy="120" r="20" fill="#FFE4C4" />
                        <rect x="280" y="140" width="40" height="60" rx="20" fill="#4ADE80" />
                        
                        {/* Plant decoration */}
                        <ellipse cx="50" cy="240" rx="15" ry="8" fill="#10B981" />
                        <path d="M 50 240 Q 45 220, 50 200" stroke="#10B981" strokeWidth="2" fill="none" />
                      </svg>
                    </div>

                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center space-x-4 mb-2">
                        <button className="p-2 bg-white rounded-full text-indigo-600 hover:bg-gray-100">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-white hover:text-gray-200">
                          <SkipBack className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-white hover:text-gray-200">
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <span className="text-white text-sm">01:34 / 100:00</span>
                        <div className="flex-1"></div>
                        <button className="p-1 text-white hover:text-gray-200">
                          <SettingsIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-white hover:text-gray-200">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-white hover:text-gray-200">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-white hover:text-gray-200">
                          <Maximize className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-white/30 rounded-full h-1">
                        <div className="bg-white h-1 rounded-full" style={{ width: "1.5%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Title and Instructor */}
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {selectedCourse.title}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <Image
                      src={selectedCourse.instructorAvatar}
                      alt={selectedCourse.instructor}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {selectedCourse.instructor}
                    </span>
                    <span className="text-sm text-gray-500">Figma</span>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      + Follow
                    </button>
                  </div>

                  <button className="px-6 py-2.5 border-2 border-emerald-500 text-emerald-600  font-semibold hover:bg-emerald-50 transition-colors">
                    Become a mentor
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className={`pb-3 text-sm font-medium transition-colors ${
                        activeTab === "overview"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab("faq")}
                      className={`pb-3 text-sm font-medium transition-colors ${
                        activeTab === "faq"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      FAQ
                    </button>
                    <button
                      onClick={() => setActiveTab("discussion")}
                      className={`pb-3 text-sm font-medium transition-colors ${
                        activeTab === "discussion"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Discussion
                    </button>
                    <button
                      onClick={() => setActiveTab("reviews")}
                      className={`pb-3 text-sm font-medium transition-colors ${
                        activeTab === "reviews"
                          ? "text-indigo-600 border-b-2 border-indigo-600"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Reviews
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Course Description */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Course Description
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {selectedCourse.description}
                      </p>
                    </div>

                    {/* Course Outcomes */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        Course Outcomes
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <ul className="space-y-2">
                          {selectedCourse.outcomes?.map((outcome, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                              <span className="text-emerald-600 mt-1">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="space-y-2">
                          {selectedCourse.designOutcomes?.map((outcome, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                              <span className="text-emerald-600 mt-1">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Audience */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Audience</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Credibly reintermediate parallel sources and visionary mindshare. Conveniently fabricate out-of-the-box functionalities vis-a-vis excellent core competencies. Compellingly re-engineer user friendly scenarios vis-a-vis magnetic infrastructures. Intrinsically enhance world-class paradigms for standardized
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "faq" && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">FAQ content coming soon...</p>
                  </div>
                )}

                {activeTab === "discussion" && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Discussion forum coming soon...</p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Reviews section coming soon...</p>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Course Content */}
              <div className="col-span-4">
                <div className="bg-white  border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Course Content</h3>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mb-6">Section 01 / Week 01</p>

                  {/* Modules List */}
                  <div className="space-y-4">
                    {selectedCourse.modules?.map((module) => (
                      <div key={module.id} className="border-b border-gray-100 pb-4">
                        <div
                          className="flex items-start justify-between cursor-pointer"
                          onClick={() => toggleModule(module.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-bold text-gray-900">{module.title}</h4>
                              <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{module.subtitle}</p>
                            <div className="flex items-center space-x-3 text-xs text-gray-500">
                              <span>📖 {module.lectures} Lecture</span>
                              <span>⏰ {module.duration}</span>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              expandedModules.includes(module.id) ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Lessons */}
                        {expandedModules.includes(module.id) && module.lessons && module.lessons.length > 0 && (
                          <div className="mt-3 ml-4 space-y-2">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center space-x-2 text-xs"
                              >
                                <div className={`w-1 h-8 rounded ${lesson.completed ? "bg-emerald-600" : "bg-gray-200"}`}></div>
                                <div className="flex-1">
                                  <p className="text-gray-700 font-medium">{lesson.title}</p>
                                  <p className="text-gray-500 flex items-center space-x-1">
                                    <PlayCircle className="w-3 h-3" />
                                    <span>1 Video | {lesson.duration}</span>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Course List View (Original)
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500  flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Estudy</h1>
              <p className="text-xs text-gray-500">Learn From Home</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <a
            href="/dashboard"
            className="flex items-center space-x-3 px-3 py-2  text-gray-600 hover:bg-gray-50"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a
            href="/dashboard/courses"
            className="flex items-center space-x-3 px-3 py-2  bg-gray-100 text-gray-900"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Course</span>
          </a>
          <a
            href="/dashboard/certification"
            className="flex items-center space-x-3 px-3 py-2  text-gray-600 hover:bg-gray-50"
          >
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">Certification</span>
          </a>
          <a
            href="/community"
            className="flex items-center space-x-3 px-3 py-2  text-gray-600 hover:bg-gray-50"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">Chat</span>
          </a>
          <a
            href="/dashboard/schedule"
            className="flex items-center space-x-3 px-3 py-2  text-gray-600 hover:bg-gray-50"
          >
            <CalendarIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Schedule</span>
          </a>
          <a
            href="/dashboard/settings"
            className="flex items-center space-x-3 px-3 py-2  text-gray-600 hover:bg-gray-50"
          >
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Profile</span>
          </a>
          <a
            href="/dashboard/billing"
            className="flex items-center space-x-3 px-3 py-2  text-gray-600 hover:bg-gray-50"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium">Setting</span>
          </a>
        </nav>

        {/* Bottom Illustration and Upgrade Button */}
        <div className="p-4">
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50  p-4 mb-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-2 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#E0E7FF" />
                  <circle cx="50" cy="40" r="15" fill="#4F46E5" />
                  <path
                    d="M 30 70 Q 50 60, 70 70"
                    fill="#4F46E5"
                    stroke="#4F46E5"
                    strokeWidth="8"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 mb-2">
                Upgrade to PRO for more resources
              </p>
            </div>
          </div>
          <button className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-3  text-sm font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">My Course</h2>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 ">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src={user?.profilePicture || "/testimonial-avatar.jpg"}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "Martin nel"}
                  </p>
                  <ChevronDown className="w-4 h-4 text-gray-500 inline" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 ">
                <Filter className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Sort by:</span>
                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200  hover:bg-gray-50">
                  <span>{sortBy}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2  ${
                  viewMode === "grid"
                    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2  ${
                  viewMode === "list"
                    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="p-8">
          <div className="grid grid-cols-4 gap-6">
            {loadingCourses ? (
              <div className="col-span-4 flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : courses.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">No courses found.</div>
            ) : (
              courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => {
                    // build a selectedCourse payload compatible with the detail view
                    setSelectedCourse({
                      id: course.id,
                      title: course.title,
                      description: course.description,
                      instructor: course.instructor.name,
                      instructorAvatar: course.instructor.avatarUrl,
                      lessons: course.lectures,
                      hours: course.duration,
                      progress: course.progress,
                      completed: course.progress >= 100,
                      outcomes: [],
                      designOutcomes: [],
                      modules: [],
                    });
                  }}
                  className="cursor-pointer"
                >
                  <CourseCard course={course} handleSaveCourse={() => {}} />
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-8 space-x-2">
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200  hover:bg-gray-50 text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white  font-semibold">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200  hover:bg-gray-50 text-gray-600">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-gray-200  hover:bg-gray-50 text-gray-600">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
