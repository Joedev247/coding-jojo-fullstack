"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  BookOpen,
  BarChart3,
  Video,
  Award,
  Settings,
  Users,
  Plus,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Code2,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
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

interface InstructorSidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const InstructorSidebar: React.FC<InstructorSidebarProps> = ({ onCollapseChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [instructor, setInstructor] = useState<InstructorData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Notify parent component about collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  useEffect(() => {
    // Get instructor data from localStorage/sessionStorage
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

  const navigation: NavItem[] = [
    {
      name: "Dashboard",
      href: "/instructor/dashboard",
      icon: <BarChart3 className="w-3.5 h-3.5" />,
    },
    {
      name: "Courses",
      href: "/instructor/courses",
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      name: "New Course",
      href: "/instructor/courses/new",
      icon: <Plus className="w-3.5 h-3.5" />,
    },
    {
      name: "Live Sessions",
      href: "/instructor/live-sessions",
      icon: <Video className="w-3.5 h-3.5" />,
    },
    {
      name: "Certificates",
      href: "/instructor/certificates",
      icon: <Award className="w-3.5 h-3.5" />,
    },
    {
      name: "Students",
      href: "/instructor/students",
      icon: <Users className="w-3.5 h-3.5" />,
    },
    {
      name: "Settings",
      href: "/instructor/settings",
      icon: <Settings className="w-3.5 h-3.5" />,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-3 left-3 z-50 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2  bg-blue-600/90 backdrop-blur-sm shadow-sm hover:bg-blue-700 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 z-40">
        <div className={`flex flex-col flex-grow bg-gradient-to-br from-blue-600 to-blue-800 border-r border-blue-500/30 shadow-lg overflow-y-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-14' : 'md:w-56'
        }`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-3'} h-12 border-b border-blue-500/30 flex-shrink-0`}>
            {!isCollapsed && (
              <Link href="/instructor/dashboard">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-white/10  flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-white">Coding Jojo</span>
                </div>
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1  hover:bg-blue-700/50 text-blue-200 hover:text-white transition-all duration-200 ${isCollapsed ? 'mx-auto' : ''}`}
            >
              {isCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5 transition-transform duration-300" />
              )}
            </button>
          </div>
          <div className="mt-1 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-0.5">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const isParentActive =
                  pathname.startsWith(item.href) && item.href !== "/instructor/dashboard";
                const activeState = isActive || isParentActive;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    title={isCollapsed ? item.name : undefined}
                    className={`
                      group flex items-center  transition-all duration-200 ease-in-out relative
                      ${isCollapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2'}
                      ${
                        activeState
                          ? "bg-white/10 text-white shadow-sm border-l-2 border-white/50"
                          : "text-blue-100 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`transition-all duration-200 ${isCollapsed ? 'transform hover:scale-110' : ''} ${
                        activeState
                          ? "text-white"
                          : "text-blue-200 group-hover:text-white"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span
                        className={`ml-3 text-sm transition-all duration-200 ${
                          activeState
                            ? "font-medium text-white"
                            : "group-hover:font-medium"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                    {activeState && !isCollapsed && (
                      <div className="ml-auto">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          {!isCollapsed && (
            <div className="flex-shrink-0 border-t border-blue-500/30 bg-blue-700/30 p-3">
              <div className="flex items-center">
                <div className="relative">
                  {(instructor?.profilePicture || instructor?.avatar) ? (
                    <img
                      className="inline-block rounded-full h-8 w-8 object-cover border-2 border-white/20"
                      src={instructor.profilePicture || instructor.avatar}
                      alt={instructor?.name || instructor?.firstName || "Instructor Avatar"}
                    />
                  ) : (
                    <div className="inline-block rounded-full h-8 w-8 bg-white/20 flex items-center justify-center text-white font-medium text-xs border-2 border-white/20">
                      {getUserInitials(
                        instructor?.name || 
                        (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                        instructor?.email || 
                        "Instructor"
                      )}
                    </div>
                  )}
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 rounded-full border border-blue-700">
                  </div>
                </div>
                <div className="ml-2 min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    {instructor?.name || 
                     (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                     instructor?.email || 
                     "Instructor"}
                  </p>
                  <p className="text-xs text-blue-200">
                    Instructor
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur"
            onClick={toggleMobileMenu}
          ></div>

          <div className="relative flex-1 flex flex-col max-w-xs w-full rounded-r-lg bg-gradient-to-br from-blue-600 to-blue-800 backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-8 w-8  bg-blue-600/80 hover:bg-blue-700 text-white transition-colors"
                onClick={toggleMobileMenu}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-4 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4 mb-6">
                <Link
                  href="/instructor/dashboard"
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-white/10  flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-xs">
                      Coding Jojo
                    </span>
                    <span className="text-xs text-blue-200 font-medium">
                      Instructor
                    </span>
                  </div>
                </Link>
              </div>
              <nav className="mt-1 px-2 space-y-0.5">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  const isParentActive =
                    pathname.startsWith(item.href) &&
                    item.href !== "/instructor/dashboard";
                  const activeState = isActive || isParentActive;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group flex items-center px-3 py-2 text-sm font-medium 
                        transition-all duration-200 ease-in-out
                        ${
                          activeState
                            ? "bg-white/10 text-white shadow-sm border-l-2 border-white/50"
                            : "text-blue-100 hover:bg-white/5 hover:text-white"
                        }
                      `}
                      onClick={toggleMobileMenu}
                    >
                      <span
                        className={`mr-3 transition-all duration-200 ${
                          activeState
                            ? "text-white"
                            : "text-blue-200 group-hover:text-white"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`transition-all duration-200 ${
                          activeState
                            ? "font-medium text-white"
                            : "group-hover:font-medium"
                        }`}
                      >
                        {item.name}
                      </span>
                      {activeState && (
                        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 border-t border-blue-500/30 bg-blue-700/30 p-3">
              <div className="flex items-center">
                <div className="relative">
                  {(instructor?.profilePicture || instructor?.avatar) ? (
                    <img
                      className="inline-block rounded-full h-8 w-8 object-cover border-2 border-white/20"
                      src={instructor.profilePicture || instructor.avatar}
                      alt={instructor?.name || instructor?.firstName || "Instructor Avatar"}
                    />
                  ) : (
                    <div className="inline-block rounded-full h-8 w-8 bg-white/20 flex items-center justify-center text-white font-medium text-xs border-2 border-white/20">
                      {getUserInitials(
                        instructor?.name || 
                        (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                        instructor?.email || 
                        "Instructor"
                      )}
                    </div>
                  )}
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 rounded-full border border-blue-700">
                  </div>
                </div>
                <div className="ml-2 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {instructor?.name || 
                     (instructor?.firstName && instructor?.lastName ? `${instructor.firstName} ${instructor.lastName}` : '') ||
                     instructor?.email || 
                     "Instructor"}
                  </p>
                  <p className="text-xs text-blue-200">
                    Instructor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorSidebar;
