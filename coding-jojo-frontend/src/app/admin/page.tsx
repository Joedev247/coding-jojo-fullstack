// pages/dashboard/index.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Bell, Search, LogOut } from "lucide-react";
import Image from "next/image";

// Components
import Sidebar from "../../components/admin/Sidebar";
import OverviewContent from "../../components/admin/OverviewContent";
import CoursesContent from "../../components/admin/CoursesContent";
import UsersContent from "../../components/admin/UsersContent";
import CommunityContent from "../../components/admin/CommunityContent";
import PurchasesContent from "../../components/admin/PurchasesContent";
import AdminVerificationDashboard from "../../components/admin/AdminVerificationDashboard";
import InstructorManagement from "../../components/admin/InstructorManagement";
import EarningsManagement from "../../components/admin/EarningsManagement";
import CourseForm from "../../components/forms/CourseForm";
import PostForm from "../../components/forms/PostForm";
import EventForm, { EventFormData } from "../../components/forms/EventForm";
import NotificationDropdown from "../../components/ui/NotificationDropdown";

// Types and services
import { PostFormData, User, Post, Course } from "../../types/admin";
import {
  adminService,
  AdminCourse,
  AdminUser,
} from "../../services/adminService";
import { formatCourseDuration } from "../../utils/formatters";
import { useToast } from "../../contexts/ToastContext";
import AnimatedBackground from "../../components/ui/AnimatedBackground";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

// Define CourseFormData locally since it's not exported from courses module
interface CourseFormData {
  title: string;
  category: string;
  description?: string;
  price: string | number;
  level: string;
  duration: string;
  thumbnail: File | null;
  featured: boolean;
}

const AdminDashboard: React.FC = () => {
  // State for UI
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeForm, setActiveForm] = useState<
    "course" | "post" | "event" | null
  >(null);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [eventToEdit, setEventToEdit] = useState<any | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // State for data
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [purchases] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { success: showSuccess, error: showError } = useToast();

  // Memoized default stats to prevent unnecessary re-renders
  const defaultStats = React.useMemo(
    () => ({
      totalStudents: 0,
      totalCourses: 0,
      totalRevenue: 0,
      activeUsers: 0,
      newUsers: { count: "0", percentChange: 0 },
      revenue: { count: 0, percentChange: 0 },
      completionRate: { count: 0 },
      engagementRate: { count: 0 },
      monthlySales: [],
      categoryDistribution: [],
      recentActivity: [],
    }),
    []
  );

  // Load initial data - Fixed dependencies to prevent unnecessary re-renders
  useEffect(() => {
    let mounted = true; // Flag to prevent state updates after component unmount

    const loadData = async () => {
      try {
        if (!mounted) return;
        setLoading(true);

        // Check if we have an auth token
        const token =
          localStorage.getItem("auth_token") ||
          sessionStorage.getItem("auth_token");
        if (!token) {
          console.warn("No auth token found. Please log in first.");
          if (mounted) {
            setStats(defaultStats);
            setLoading(false);
          }
          return;
        }
        // Load all admin data in parallel
        const [statsResponse, coursesResponse, usersResponse, postsResponse] =
          await Promise.all([
            adminService.getAdminStats(),
            adminService.getCourses(),
            adminService.getUsers(),
            adminService.getCommunityPosts(),
          ]);

        // Only update state if component is still mounted
        if (!mounted) return;

        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        } else {
          console.warn("Failed to load stats:", statsResponse.error);
          setStats(defaultStats);
        }

        if (coursesResponse.success && coursesResponse.data) {
          setCourses(coursesResponse.data);
        } else {
          console.warn("Failed to load courses:", coursesResponse.error);
        }

        if (usersResponse.success && usersResponse.data) {
          setUsers(usersResponse.data);
        } else {
          console.warn("Failed to load users:", usersResponse.error);
        }

        if (postsResponse.success && postsResponse.data) {
          setPosts(postsResponse.data);
        } else {
          console.warn("Failed to load community posts:", postsResponse.error);
        }
      } catch (error) {
        console.error("Error loading admin data:", error);
        if (mounted) {
          setStats(defaultStats);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function to prevent memory leaks
    return () => {
      mounted = false;
    };
  }, []); // Removed showError dependency to prevent unnecessary re-renders

  // Memoized error handler to prevent useEffect re-runs
  const handleError = React.useCallback(
    (message: string) => {
      showError(message);
    },
    [showError]
  );

  // Token validation and refresh mechanism to prevent instability
  const validateAndRefreshToken = React.useCallback(async () => {
    const token =
      localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token");
    if (!token) return false;

    try {
      const response = await fetch(
        "https://codingjojo-backend.onrender.com/api/auth/verify-token",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Token is invalid, clear it
        localStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_token");
        localStorage.removeItem("user_info");
        sessionStorage.removeItem("user_info");
        handleError("Session expired. Please log in again.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  }, [handleError]);

  // Periodic token validation (every 5 minutes) to prevent session expiry issues
  useEffect(() => {
    const intervalId = setInterval(() => {
      validateAndRefreshToken();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [validateAndRefreshToken]);

  // Handle course operations
  const handleAddCourse = () => {
    setCourseToEdit(null);
    setActiveForm("course");
  };
  const handleEditCourse = (course: AdminCourse) => {
    setCourseToEdit(course as any); // Type conversion needed
    setActiveForm("course");
  };
  const handleCourseFormSubmit = React.useCallback(
    async (data: CourseFormData) => {
      try {
        const numericPrice = typeof data.price === "string" ? parseFloat(data.price) : data.price;
        const numericDuration = parseFloat(data.duration) || 0;
        if (courseToEdit) {
          // Update existing course - only send fields that can change
            const response = await adminService.updateCourse(
            (courseToEdit as any)._id,
            {
              title: data.title,
              category: data.category,
              price: numericPrice,
              level: data.level as any,
              duration: numericDuration,
              isFeatured: data.featured,
            }
          );
          if (response.success && response.data) {
            const updatedCourse = response.data as AdminCourse; // ensure non-undefined type
            setCourses((prev) =>
              prev.map((course) =>
                course._id === (courseToEdit as any)._id ? updatedCourse : course
              )
            );
            showSuccess("Course updated successfully");
          } else {
            const errorMsg = response.error || response.message || "Unknown error occurred";
            handleError("Failed to update course: " + errorMsg);
          }
        } else {
          // Add new course - fulfill CreateCourseData contract
          const response = await adminService.createCourse({
            title: data.title,
            category: data.category,
            description: data.description || "",
            instructor: "Admin", // TODO: replace with selected instructor
            duration: numericDuration,
            price: numericPrice,
            level: data.level as any,
            isPaid: numericPrice > 0,
            isFeatured: data.featured,
            videoUrls: [],
            lessons: [],
          });
          if (response.success && response.data) {
            // Narrow the possibly undefined union to a concrete AdminCourse for state update
            const newCourse = response.data as AdminCourse;
            setCourses((prev) => [...prev, newCourse]);
            showSuccess("Course created successfully");
            setTimeout(async () => {
              try {
                const coursesResponse = await adminService.getCourses();
                if (coursesResponse.success && coursesResponse.data) {
                  setCourses(coursesResponse.data);
                }
              } catch (error) {
                console.warn("Failed to reload courses:", error);
              }
            }, 1000);
          } else {
            const errorMsg = response.error || response.message || "Unknown error occurred";
            handleError("Failed to create course: " + errorMsg);
          }
        }
      } catch (error) {
        console.error("Error saving course:", error);
        handleError("Failed to save course");
      } finally {
        setCourseToEdit(null);
        setActiveForm(null);
      }
    },
    [courseToEdit, showSuccess, handleError]
  );
  const handleDeleteCourse = React.useCallback(
    async (id: string) => {
      try {
        const response = await adminService.deleteCourse(id);
        if (response.success) {
          setCourses((prev) => prev.filter((course) => course._id !== id));
          showSuccess("Course deleted successfully");
        } else {
          const errorMsg =
            response.error || response.message || "Unknown error occurred";
          handleError("Failed to delete course: " + errorMsg);
        }
      } catch (error) {
        console.error("Error deleting course:", error);
        handleError("Failed to delete course");
      }
    },
    [showSuccess, handleError]
  );

  // Handle refresh courses
  const handleRefreshCourses = React.useCallback(async () => {
    try {
      const coursesResponse = await adminService.getCourses();
      if (coursesResponse.success && coursesResponse.data) {
        setCourses(coursesResponse.data);
      }
    } catch (error) {
      console.error("Error refreshing courses:", error);
      handleError("Failed to refresh courses");
    }
  }, [handleError]);
  // Handle post operations - Memoized to prevent unnecessary re-renders
  const handleAddPost = React.useCallback(() => {
    setPostToEdit(null);
    setActiveForm("post");
  }, []);

  const handleEditPost = React.useCallback((post: Post) => {
    setPostToEdit(post);
    setActiveForm("post");
  }, []);
  const handlePostFormSubmit = React.useCallback(
    async (data: PostFormData) => {
      try {
        if (postToEdit) {
          // Update existing post
          const response = await adminService.updateCommunityPost(
            postToEdit.id,
            {
              title: data.title,
              content: data.content,
              type: data.type,
              pinned: data.pinned,
            }
          );

          if (response.success && response.data) {
            setPosts((prev) =>
              prev.map((post) =>
                post.id === postToEdit.id ? response.data : post
              )
            );
            showSuccess("Post updated successfully");
          } else {
            const errorMsg = response.error || "Failed to update post";
            handleError(errorMsg);
          }
        } else {
          // Add new post
          const response = await adminService.createCommunityPost({
            title: data.title,
            content: data.content,
            type: data.type,
            pinned: data.pinned,
            category: "general",
            tags: [],
          });

          if (response.success && response.data) {
            setPosts((prev) => [...prev, response.data]);
            showSuccess("Post created successfully");

            // Add notification for new post creation
            const newNotification = {
              id: `n${Date.now()}`,
              type: "success" as const,
              title: "Post Published",
              message: `Your "${data.title}" post has been published to the community.`,
              time: "1 second ago",
              read: false,
            };
            setNotifications((prev) => [newNotification, ...prev]);
          } else {
            const errorMsg = response.error || "Failed to create post";
            handleError(errorMsg);
          }
        }
      } catch (error) {
        console.error("Error saving post:", error);
        handleError("Failed to save post");
      } finally {
        setPostToEdit(null);
        setActiveForm(null);
      }
    },
    [postToEdit, showSuccess, handleError]
  );

  const handleDeletePost = React.useCallback(
    async (id: string) => {
      try {
        const response = await adminService.deleteCommunityPost(id);

        if (response.success) {
          const deletedPost = posts.find((post) => post.id === id);
          setPosts((prev) => prev.filter((post) => post.id !== id));
          showSuccess("Post deleted successfully");

          // Add notification for deletion
          const newNotification = {
            id: `n${Date.now()}`,
            type: "info" as const,
            title: "Post Deleted",
            message: `"${deletedPost?.title}" has been deleted from the community.`,
            time: "1 second ago",
            read: false,
          };
          setNotifications((prev) => [newNotification, ...prev]);
        } else {
          const errorMsg = response.error || "Failed to delete post";
          handleError(errorMsg);
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        handleError("Failed to delete post");
      }
    },
    [posts, showSuccess, handleError]
  );

  // Handle event operations
  const handleAddEvent = React.useCallback(() => {
    setEventToEdit(null);
    setActiveForm("event");
  }, []);

  const handleEditEvent = React.useCallback((event: any) => {
    setEventToEdit(event);
    setActiveForm("event");
  }, []);

  const handleEventFormSubmit = React.useCallback(
    async (data: EventFormData) => {
      try {
        if (eventToEdit) {
          // Update existing event (not implemented yet)
          console.log("Update event:", data);
          showSuccess("Event updated successfully");
        } else {
          // Add new event
          const response = await adminService.createCommunityEvent({
            title: data.title,
            description: data.description,
            type: data.type,
            startDate: data.startDate,
            endDate: data.endDate || '',
            location: data.location || '',
            maxAttendees: data.maxAttendees,
            tags: data.tags,
            isVirtual: data.isVirtual,
          });

          if (response.success && response.data) {
            setEvents((prev) => [...prev, response.data]);
            showSuccess("Event created successfully");

            // Add notification for new event creation
            const newNotification = {
              id: `n${Date.now()}`,
              type: "success" as const,
              title: "Event Created",
              message: `Your event "${data.title}" has been created and published.`,
              time: "1 second ago",
              read: false,
            };
            setNotifications((prev) => [newNotification, ...prev]);
          } else {
            const errorMsg = response.error || "Failed to create event";
            handleError(errorMsg);
          }
        }
      } catch (error) {
        console.error("Error saving event:", error);
        handleError("Failed to save event");
      } finally {
        setEventToEdit(null);
        setActiveForm(null);
      }
    },
    [eventToEdit, showSuccess, handleError]
  );

  const handleDeleteEvent = React.useCallback(
    async (id: string) => {
      try {
        // In real implementation, this would call the delete API
        const deletedEvent = events.find((event) => event.id === id);
        setEvents((prev) => prev.filter((event) => event.id !== id));
        showSuccess("Event deleted successfully");

        // Add notification for deletion
        const newNotification = {
          id: `n${Date.now()}`,
          type: "info" as const,
          title: "Event Deleted",
          message: `"${deletedEvent?.title}" has been deleted.`,
          time: "1 second ago",
          read: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
      } catch (error) {
        console.error("Error deleting event:", error);
        handleError("Failed to delete event");
      }
    },
    [events, showSuccess, handleError]
  );

  // Handle user operations - Memoized to prevent unnecessary re-renders
  const handleEditUser = React.useCallback((user: User) => {
    // In a real application, this would open a user edit form
    console.log("Edit user:", user);
  }, []);

  const handleDeleteUser = React.useCallback(
    (id: string) => {
      const deletedUser = users.find((user) => user._id === id);
      setUsers((prev) => prev.filter((user) => user._id !== id));

      // Add notification for deletion
      const newNotification = {
        id: `n${Date.now()}`,
        type: "warning" as const,
        title: "User Deleted",
        message: `"${deletedUser?.name}" has been deleted.`,
        time: "1 second ago",
        read: false,
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    [users]
  );
  // Notification functions - Memoized to prevent unnecessary re-renders
  const handleMarkNotificationAsRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const handleMarkAllNotificationsAsRead = React.useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("auth_token");
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("user_info");

    // Redirect to admin login
    window.location.href = "/admin/login";
  };

  // Toggle notifications dropdown
  const toggleNotifications = React.useCallback(() => {
    setNotificationsOpen((prev) => !prev);
  }, []);

  // Bulk publish courses function
  const handleBulkPublishCourses = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://codingjojo-backend.onrender.com/api/admin/courses/bulk-publish",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token") ||
              sessionStorage.getItem("auth_token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        showSuccess(
          `Successfully updated ${data.modifiedCount} courses to be published and featured`
        );

        // Reload courses after bulk update
        setTimeout(async () => {
          try {
            const coursesResponse = await adminService.getCourses();
            if (coursesResponse.success && coursesResponse.data) {
              setCourses(coursesResponse.data);
            }
          } catch (error) {
            console.warn("Failed to reload courses:", error);
          }
        }, 1000);
      } else {
        handleError("Failed to bulk publish courses");
      }
    } catch (error) {
      console.error("Bulk publish error:", error);
      handleError("Failed to bulk publish courses");
    }
  }, [showSuccess, handleError]);

  // Debug courses function
  const handleDebugCourses = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://codingjojo-backend.onrender.com/api/admin/courses/debug",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token") ||
              sessionStorage.getItem("auth_token")
              }`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Debug courses:", data);
        showSuccess(
          `Found ${data.totalCourses} courses. Check console for details.`
        );
      } else {
        handleError("Failed to debug courses");
      }
    } catch (error) {
      console.error("Debug courses error:", error);
      handleError("Failed to debug courses");
    }
  }, [showSuccess, handleError]);

  // Transform API courses to component-compatible format
  const transformCoursesForComponent = (apiCourses: any[]) => {
    return apiCourses.map((course) => ({
      id: course._id,
      title: course.title,
      category: course.category,
      tags: course.tags || [],
      level: course.level,
      duration: formatCourseDuration(course.duration),
      lectures: course.totalLessons || 0,
      ratingCount: course.ratingCount || 0,
      description: course.description || "",
      thumbnail: course.thumbnail || "",
      instructor: {
        id: course.instructor?._id || "",
        name: course.instructor?.name || "Unknown",
        avatarUrl: course.instructor?.avatarUrl || "/default-avatar.png",
        role: course.instructor?.role || "Instructor",
      },
      studentsEnrolled: course.studentsEnrolled || 0,
      rating: course.rating || 0,
      price: course.price || 0,
      createdAt: course.createdAt,
      status: course.status || "draft",
      isFeatured: course.isFeatured || false,
      isNew: course.isNew || false,
      isSaved: course.isSaved || false,
    }));
  };

  // Render the appropriate content based on active sidebar
  const renderDashboardContent = () => {
    switch (activeSidebar) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <OverviewContent stats={stats} />
            {/* Debug Tools Section */}
            <div className="bg-yellow-900/20 border border-yellow-500/50  p-4">
              <h3 className="text-lg font-semibold text-yellow-200 mb-3">
                🛠️ Debug Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleBulkPublishCourses}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  transition-colors"
                >
                  Publish All Courses
                </button>
                <button
                  onClick={handleDebugCourses}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white  transition-colors"
                >
                  Debug Courses
                </button>
              </div>
              <p className="text-yellow-300 text-sm mt-2">
                Use these tools to fix course visibility issues. "Publish All
                Courses" makes all courses visible on the public site.
              </p>
            </div>
          </div>
        );
      case "courses":
        return (
          <CoursesContent
            courses={transformCoursesForComponent(courses)}
            onAddCourse={handleAddCourse}
            onEditCourse={handleEditCourse as any}
            onDeleteCourse={handleDeleteCourse}
            onRefresh={handleRefreshCourses}
          />
        );
      case "users":
        return (
          <UsersContent
            users={users as any}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      case "community":
        return (
          <CommunityContent
            posts={posts}
            events={events}
            onAddPost={handleAddPost}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        );
      case "purchases":
        return <PurchasesContent />;
      case "verification":
        return <AdminVerificationDashboard />;
      case "instructors":
        return <InstructorManagement />;
      case "earnings":
        return <EarningsManagement />;
      default:
        return <OverviewContent stats={stats || {}} />;
    }
  };

  // Get the count of unread notifications
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <LoadingSpinner size="sm" />
      </div>
    );
  }

  // Check for authentication
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token") ||
      sessionStorage.getItem("auth_token")
      : null;

  if (!token) {
    return (
      <div className="min-h-screen   bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-gray-800  p-8 border border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-4">
              Authentication Required
            </h1>
            <p className="text-gray-400 mb-6">
              You need to be authenticated to access the admin dashboard.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => (window.location.href = "/admin/login")}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-4 py-3  transition-all duration-300 font-medium shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30"
              >
                Admin Login
              </button>
              <p className="text-sm text-gray-500">
                Enter your admin credentials to continue
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Mobile Header */}
      <header className="lg:hidden relative z-10   bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500  p-1">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">EduPlatform</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="text-gray-400 hover:text-white transition-colors focus:outline-none relative"
              onClick={toggleNotifications}
            >
              <Bell className="h-6 w-6" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-pink-500 text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800  transition-colors focus:outline-none"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <div className="h-8 w-8 rounded-full  bg-gray-900 flex items-center justify-center">
              <span className="text-sm font-medium text-white">JD</span>
            </div>
          </div>
        </div>
        {notificationsOpen && (
          <NotificationDropdown
            isOpen={notificationsOpen}
            notifications={notifications}
            onClose={() => setNotificationsOpen(false)}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          />
        )}
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/90 pt-16">
          <div className="overflow-y-auto h-full">
            <Sidebar
              activeSidebar={activeSidebar}
              setActiveSidebar={(sidebar) => {
                setActiveSidebar(sidebar);
                setShowMobileMenu(false);
              }}
              setActiveForm={setActiveForm}
            />
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex min-h-screen relative z-10">
        {/* Desktop Sidebar */}
        <div
          className={`hidden lg:block   bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 w-64 flex-shrink-0 fixed inset-y-0 z-20 transition-all duration-300 ${sidebarOpen ? "left-0" : "-left-64"
            }`}
        >
          <Sidebar
            activeSidebar={activeSidebar}
            setActiveSidebar={setActiveSidebar}
            setActiveForm={setActiveForm}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-0"
            }`}
        >
          {/* Desktop Header */}
          <header className="hidden lg:flex sticky top-0 z-20   bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 shadow-lg">
            <div className="flex-1 flex items-center justify-between px-6 py-4">
              <div>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-800/70 border border-gray-700  pl-10 pr-4 py-1.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent w-64"
                  />
                </div>
                <div className="border-l border-gray-800 h-6"></div>
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-white transition-colors focus:outline-none relative"
                    onClick={toggleNotifications}
                  >
                    <Bell className="h-6 w-6" />
                    {unreadNotificationsCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs rounded-full bg-pink-500 text-white">
                        {unreadNotificationsCount}
                      </span>
                    )}
                  </button>
                  {notificationsOpen && (
                    <NotificationDropdown
                      isOpen={notificationsOpen}
                      notifications={notifications}
                      onClose={() => setNotificationsOpen(false)}
                      onMarkAsRead={handleMarkNotificationAsRead}
                      onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                    />
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative h-8 w-8 rounded-full border border-gray-700 overflow-hidden">
                    <Image
                      src="https://picsum.photos/150/150"
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Joedev247
                    </div>
                    <div className="text-xs text-gray-500">Administrator</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-2 p-2 text-gray-400 hover:text-white hover:bg-gray-800  transition-colors focus:outline-none"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">
                {activeSidebar.charAt(0).toUpperCase() + activeSidebar.slice(1)}
              </h1>
              <p className="text-gray-400 mt-1">
                Manage and monitor your e-learning platform
                <span className="text-pink-400 ml-1">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </p>
            </div>

            {renderDashboardContent()}
          </main>
        </div>
      </div>

      {/* Forms */}
      {activeForm === "course" && (
        <CourseForm
          initialData={
            courseToEdit
              ? {
                title: courseToEdit.title,
                category: courseToEdit.category,
                description: courseToEdit.description || "",
                price: courseToEdit.price.toString(),
                level: courseToEdit.level,
                duration: courseToEdit.duration,
                thumbnail: null,
                featured: courseToEdit.isFeatured,
              }
              : undefined
          }
          onSubmit={handleCourseFormSubmit}
          onCancel={() => {
            setActiveForm(null);
            setCourseToEdit(null);
          }}
          isEditing={!!courseToEdit}
        />
      )}

      {activeForm === "post" && (
        <PostForm
          initialData={
            postToEdit
              ? {
                title: postToEdit.title,
                content: postToEdit.content || "",
                type:
                  postToEdit.type === "resource"
                    ? "discussion"
                    : postToEdit.type, // Convert 'resource' to compatible type
                pinned: !!postToEdit.pinned,
              }
              : undefined
          }
          onSubmit={handlePostFormSubmit}
          onCancel={() => {
            setActiveForm(null);
            setPostToEdit(null);
          }}
          isEditing={!!postToEdit}
        />
      )}

      {activeForm === "event" && (
        <EventForm
          isOpen={true}
          initialData={
            eventToEdit
              ? {
                title: eventToEdit.title,
                description: eventToEdit.description || "",
                type: eventToEdit.type,
                startDate: eventToEdit.startDate,
                endDate: eventToEdit.endDate,
                location: eventToEdit.location,
                maxAttendees: eventToEdit.maxAttendees,
                tags: eventToEdit.tags || [],
                isVirtual: !!eventToEdit.isVirtual,
              }
              : undefined
          }
          onSubmit={handleEventFormSubmit}
          onClose={() => {
            setActiveForm(null);
            setEventToEdit(null);
          }}
          isLoading={loading}
        />
      )}

      {/* Debug and Bulk Actions - Only for development, remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleBulkPublishCourses}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4  shadow-md transition-all duration-300 mr-2"
          >
            Bulk Publish Courses
          </button>
          <button
            onClick={handleDebugCourses}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4  shadow-md transition-all duration-300"
          >
            Debug Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
