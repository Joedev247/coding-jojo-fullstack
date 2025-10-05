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
import teacherService from "../../services/teacherService";

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

interface InstructorData {
  _id?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  profilePicture?: string;
  avatar?: string;
}

const InstructorBreadcrumb: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [instructor, setInstructor] = useState<InstructorData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Mock notifications for instructor
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "New Student Enrolled",
      message: "Alice Johnson enrolled in your JavaScript course",
      time: "5 min ago",
      read: false,
      type: "success"
    },
    {
      id: "2",
      title: "Course Review",
      message: "New 5-star review on React Fundamentals",
      time: "1 hour ago",
      read: false,
      type: "info"
    },
    {
      id: "3",
      title: "Live Session Reminder",
      message: "Live session starts in 30 minutes",
      time: "2 hours ago",
      read: true,
      type: "warning"
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Load instructor data
  useEffect(() => {
    const instructorInfo = localStorage.getItem('teacher_info') || sessionStorage.getItem('teacher_info');
    if (instructorInfo) {
      try {
        const parsedInstructor = JSON.parse(instructorInfo);
        setInstructor(parsedInstructor);
      } catch (error) {
        console.error('Error parsing instructor info:', error);
      }
    }
  }, []);

  const getUserInitials = (name: string) => {
    if (!name) return "I";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Map path segments to readable names
    const segmentMap: Record<string, string> = {
      'instructor': 'Instructor',
      'courses': 'Courses',
      'new': 'New Course',
      'edit': 'Edit Course',
      'live-sessions': 'Live Sessions',
      'certificates': 'Certificates',
      'students': 'Students',
      'settings': 'Settings',
      'dashboard': 'Dashboard'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      if (segment !== 'instructor') {
        const label = segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
        const isActive = currentPath === pathname;
        
        breadcrumbs.push({
          label,
          href: currentPath,
          isActive
        });
      }
    });

    // If we're on the instructor root or no breadcrumbs were added, show dashboard
    if (breadcrumbs.length === 0 || pathname === '/instructor') {
      breadcrumbs.push({
        label: 'Dashboard',
        href: '/instructor/dashboard',
        isActive: pathname === '/instructor/dashboard'
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Mock search results for instructor features
      const mockResults: SearchResult[] = [
        {
          title: "Create New Course",
          href: "/instructor/courses/new",
          description: "Start building your next course",
          type: "feature" as const
        },
        {
          title: "Student Management",
          href: "/instructor/students",
          description: "View and manage your students",
          type: "page" as const
        },
        {
          title: "Live Sessions",
          href: "/instructor/live-sessions",
          description: "Schedule and manage live teaching sessions",
          type: "feature" as const
        }
      ].filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleLogout = async () => {
    // Use instructor-specific logout
    await teacherService.logout();
    router.push('/instructor/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-900/20 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-30">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
                <Link
                  href={crumb.href}
                  className={`
                    hover:text-pink-400 transition-colors
                    ${crumb.isActive 
                      ? 'text-pink-400 font-medium' 
                      : 'text-gray-400'
                    }
                  `}
                >
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search instructor features..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-gray-800/60 backdrop-blur-sm border border-gray-700  text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700  shadow-lg max-h-64 overflow-y-auto z-50">
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.href}
                      className="block px-4 py-3 hover:bg-gray-700/60 border-b border-gray-700 last:border-0"
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-2 h-2 rounded-full
                          ${result.type === 'page' ? 'bg-blue-400' : 
                            result.type === 'course' ? 'bg-green-400' : 'bg-pink-400'}
                        `} />
                        <div>
                          <p className="text-white font-medium">{result.title}</p>
                          <p className="text-gray-400 text-xs">{result.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors  hover:bg-gray-800/60"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800/95 backdrop-blur-sm border border-gray-700  shadow-lg z-50">
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-white font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-700 last:border-0 hover:bg-gray-700/40 cursor-pointer ${
                          !notification.read ? 'bg-gray-700/20' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`
                            w-2 h-2 rounded-full mt-2
                            ${notification.type === 'success' ? 'bg-green-400' :
                              notification.type === 'warning' ? 'bg-yellow-400' :
                              notification.type === 'error' ? 'bg-red-400' : 'bg-blue-400'}
                          `} />
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{notification.title}</p>
                            <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                            <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2  hover:bg-gray-800/60 transition-colors"
              >
                <div className="relative">
                  {(instructor?.profilePicture || instructor?.avatar) ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-600"
                      src={instructor.profilePicture || instructor.avatar}
                      alt={instructor?.name || instructor?.firstName || "Instructor"}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-600">
                      {getUserInitials(
                        instructor?.name || 
                        (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                        instructor?.email || 
                        "Instructor"
                      )}
                    </div>
                  )}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">⭐</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-white text-sm font-medium">
                    {instructor?.name || 
                     (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                     instructor?.email || 
                     "Instructor"}
                  </p>
                  <p className="text-gray-400 text-xs">Instructor</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-sm border border-gray-700  shadow-lg z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {(instructor?.profilePicture || instructor?.avatar) ? (
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={instructor.profilePicture || instructor.avatar}
                            alt={instructor?.name || instructor?.firstName || "Instructor"}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold">
                            {getUserInitials(
                              instructor?.name || 
                              (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                              instructor?.email || 
                              "Instructor"
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {instructor?.name || 
                           (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                           instructor?.email || 
                           "Instructor"}
                        </p>
                        <p className="text-gray-400 text-sm">{instructor?.email}</p>
                        <p className="text-pink-400 text-xs font-medium">Instructor Panel</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Link
                      href="/instructor/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/60 hover:text-white"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/60 hover:text-white"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
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

export default InstructorBreadcrumb;
