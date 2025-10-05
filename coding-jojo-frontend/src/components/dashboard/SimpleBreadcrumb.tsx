"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  X,
  Code2,
  Calendar,
  Clock,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

interface SearchResult {
  title: string;
  href: string;
  description: string;
  type: "page" | "course" | "feature";
}

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mock notifications data
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "Course Update",
      message: "New chapter added to JavaScript Fundamentals",
      time: "2h ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Assignment Due",
      message: "React project submission due tomorrow",
      time: "4h ago",
      read: false,
      type: "warning",
    },
    {
      id: "3",
      title: "Achievement Unlocked",
      message: "Completed 10 coding challenges",
      time: "1d ago",
      read: true,
      type: "success",
    },
  ];

  // Define route mappings for better breadcrumb labels and descriptions
  const routeLabels: Record<string, { label: string; description?: string }> = {
    dashboard: {
      label: "Dashboard",
      description: "Overview and progress tracking",
    },
    courses: { label: "Courses", description: "My learning content" },
    analytics: { label: "Analytics", description: "Performance insights" },
    schedule: { label: "Schedule", description: "Upcoming sessions" },
    assignments: { label: "Assignments", description: "Tasks and projects" },
    certifications: {
      label: "Certifications",
      description: "Achievements and badges",
    },
    messages: { label: "Messages", description: "Communication hub" },
    settings: { label: "Settings", description: "Account preferences" },
    billing: { label: "Billing", description: "Payment and subscription" },
  };

  // Search data
  const searchData: SearchResult[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      description: "Main dashboard overview",
      type: "page",
    },
    {
      title: "My Courses",
      href: "/dashboard/courses",
      description: "View enrolled courses",
      type: "page",
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      description: "Learning progress insights",
      type: "page",
    },
    {
      title: "Schedule",
      href: "/dashboard/schedule",
      description: "Upcoming classes and events",
      type: "page",
    },
    {
      title: "Assignments",
      href: "/dashboard/assignments",
      description: "Tasks and homework",
      type: "page",
    },
    {
      title: "Certifications",
      href: "/dashboard/certifications",
      description: "Your achievements",
      type: "page",
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      description: "Communication center",
      type: "page",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      description: "Account preferences",
      type: "page",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      description: "Payment and subscription",
      type: "page",
    },
    {
      title: "JavaScript Fundamentals",
      href: "/courses/javascript",
      description: "Learn JS basics",
      type: "course",
    },
    {
      title: "React Development",
      href: "/courses/react",
      description: "Build with React",
      type: "course",
    },
    {
      title: "AI Assistant",
      href: "#",
      description: "Get coding help",
      type: "feature",
    },
  ];

  // Generate breadcrumb items from the current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with Dashboard as the root for dashboard routes
    if (pathSegments[0] === "dashboard") {
      breadcrumbs.push({
        label: "Dashboard",
        href: "/dashboard",
        isActive: pathSegments.length === 1,
      });

      // Add subsequent segments
      for (let i = 1; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        const href = "/" + pathSegments.slice(0, i + 1).join("/");
        const routeInfo = routeLabels[segment];
        const label =
          routeInfo?.label ||
          segment.charAt(0).toUpperCase() + segment.slice(1);

        breadcrumbs.push({
          label,
          href,
          isActive: i === pathSegments.length - 1,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Get current page info for description
  const currentPath = pathname
    .split("/")
    .filter((segment) => segment)
    .pop();
  const currentPageInfo = currentPath
    ? routeLabels[currentPath]
    : routeLabels["dashboard"];

  // Filter search results based on query
  const filteredSearchResults = searchQuery.trim()
    ? searchData
        .filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearch = (result: SearchResult) => {
    if (result.href !== "#") {
      router.push(result.href);
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Format current date and time
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Don't show breadcrumb on non-dashboard pages
  if (!pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div className="sticky top-0 z-30   bg-gray-900/70 backdrop-blur-sm  border-b border-gray-800/50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Left side - Interactive Brand and Breadcrumbs */}
          <div className="flex items-center">
            <div className="flex flex-col items-center space-x-1">
              <div className="flex items-center">
                <span className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  WELCOME
                </span>
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-white font-bold text-xl bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                  HOME
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-gray-400 font-medium tracking-wider">
                  LEARN • BUILD • GROW
                </span>
                <Star className="w-3 h-3 text-yellow-400" />
              </div>
            </div>
          </div>
          {/* Live Date & Time Display */}
          <div className="hidden lg:flex items-center space-x-3 px-3 py-2  bg-gray-900/40 border border-gray-700/50">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">
                {formatDate(currentTime)}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-pink-400" />
              <span className="text-gray-300 text-sm font-medium font-mono">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          {/* Mobile Date/Time */}
          <div className="lg:hidden flex items-center space-x-1 px-2 py-1  bg-gray-900/40 rounded border border-gray-700/50">
            <Clock className="w-3 h-3 text-purple-400" />
            <span className="text-gray-300 text-xs font-mono">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Right side - Search, Notifications, User Profile */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search Bar */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.trim().length > 0);
                  }}
                  className="w-32 md:w-64  bg-gray-900/60 border border-gray-700/50 pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && filteredSearchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2  bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50">
                  {filteredSearchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(result)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700/50 transition-colors duration-200 border-b border-gray-700/30 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">
                            {result.title}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {result.description}
                          </p>
                        </div>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded capitalize">
                          {result.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80  bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700/50">
                    <h3 className="text-white font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-700/30 last:border-b-0 hover:bg-gray-700/30 transition-colors ${
                          !notification.read ? "bg-blue-500/10" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">
                              {notification.title}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              {notification.message}
                            </p>
                            <p className="text-gray-500 text-xs mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-700/50">
                    <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-1 hover:bg-gray-800/50 transition-all duration-200"
              >
                <div className="relative">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-600">
                      {getUserInitials()}
                    </div>
                  )}
                  {user?.isPremium && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-white text-sm font-medium">
                    {user?.name || "User"}
                  </p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-64  bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700/50">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {user?.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name || "User"}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-600">
                            {getUserInitials()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user?.name || "User"}
                        </p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                        {user?.isPremium && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gradient-to-r from-pink-500 to-orange-500 text-white mt-1">
                            ★ Premium
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
