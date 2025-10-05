"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home,
  BookOpen,
  BarChart3,
  Calendar,
  ClipboardList,
  GraduationCap,
  MessageCircle,
  Settings,
  CreditCard,
  Menu,
  X,
  Zap,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getUserInitials = (name: string) => {
    if (!name) return "U";
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
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Courses",
      href: "/dashboard/courses",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Progress",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Certifications",
      href: "/dashboard/certifications",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard className="w-5 h-5" />,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2   bg-gray-900/80 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-300" />
          )}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow   bg-gray-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="flex items-center mt-5 mb-10 justify-center flex-shrink-0 px-4">
            <div className="flex flex-col items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="flex items-center space-x-4">
                {/* Interactive Logo */}
                <Link
                  href="/"
                  className="group flex items-center space-x-2 hover:scale-105 transition-all duration-300"
                  title="Dashboard Home"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative transition-colors duration-300">
                      <img
                        src="/loading-spinner.png"
                        className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                        alt="#"
                      />
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col">
                    <span className="text-white font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      CODING JOJO
                    </span>
                    <span className="text-xs text-gray-400 font-medium tracking-wide">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-2 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const isParentActive =
                  pathname.startsWith(item.href) && item.href !== "/dashboard";
                const activeState = isActive || isParentActive;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-4 py-3 text-sm font-medium
                      transition-all duration-300 ease-in-out transform
                      ${
                        activeState
                          ? "bg-gradient-to-r from-pink-600/40 to-orange-600/40 text-white shadow-lg scale-105 border-l-4 border-purple-400"
                          : "text-gray-300 hover:bg-gray-800/60 hover:text-white hover:scale-102 hover:shadow-md"
                      }
                    `}
                  >
                    <span
                      className={`mr-3 transition-all duration-300 ${
                        activeState
                          ? "text-purple-300 scale-110"
                          : "text-gray-400 group-hover:text-purple-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`transition-all duration-300 ${
                        activeState
                          ? "font-semibold"
                          : "group-hover:font-medium"
                      }`}
                    >
                      {item.name}
                    </span>
                    {activeState && (
                      <div className="ml-auto flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <div className="w-1.5 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full shadow-lg" />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex  bg-gray-900 p-4">
            <div className="flex items-center">
              <div className="relative">
                {user?.profilePicture ? (
                  <img
                    className="inline-block rounded-full h-9 w-9 object-cover border-2 border-gray-600"
                    src={user.profilePicture}
                    alt={user.name || "User Avatar"}
                  />
                ) : (
                  <div className="inline-block rounded-full h-9 w-9 bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-600">
                    {getUserInitials(user?.name || user?.email || "User")}
                  </div>
                )}
                {user?.isPremium && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">★</span>
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">
                  {user?.name || user?.email || "User"}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  {user?.isPremium ? "Premium Member" : "View Profile"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur"
            onClick={toggleMobileMenu}
          ></div>

          <div className="relative flex-1 flex flex-col max-w-xs w-full   bg-gray-900/90 backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Close sidebar</span>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 overflow-y-auto">
              <div className="flex items-center justify-center flex-shrink-0 px-4 mb-8">
                <div className="flex flex-col items-center justify-center group cursor-pointer transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    {/* Interactive Logo */}
                    <Link
                      href="/"
                      className="group flex items-center space-x-2 hover:scale-105 transition-all duration-300"
                      title="Dashboard Home"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative transition-colors duration-300">
                          <img
                            src="/loading-spinner.png"
                            className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                            alt="#"
                          />
                        </div>
                      </div>
                      <div className="hidden md:flex flex-col">
                        <span className="text-white font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                          CODING JOJO
                        </span>
                        <span className="text-xs text-gray-400 font-medium tracking-wide">
                          Dashboard
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <nav className="mt-2 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  const isParentActive =
                    pathname.startsWith(item.href) &&
                    item.href !== "/dashboard";
                  const activeState = isActive || isParentActive;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        group flex items-center px-4 py-3 text-sm font-medium
                        transition-all duration-300 ease-in-out transform
                        ${
                          activeState
                            ? "bg-gradient-to-r from-pink-600/40 to-orange-600/40 text-white shadow-lg scale-105 border-l-4 border-purple-400"
                            : "text-gray-300 hover:bg-gray-800/60 hover:text-white hover:scale-102"
                        }
                      `}
                      onClick={toggleMobileMenu}
                    >
                      <span
                        className={`mr-3 transition-all duration-300 ${
                          activeState
                            ? "text-purple-300 scale-110"
                            : "text-gray-400 group-hover:text-purple-400"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`transition-all duration-300 ${
                          activeState
                            ? "font-semibold"
                            : "group-hover:font-medium"
                        }`}
                      >
                        {item.name}
                      </span>
                      {activeState && (
                        <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <div className="flex-shrink-0 flex  bg-gray-900 p-4">
              <div className="flex items-center">
                <div className="relative">
                  {user?.profilePicture ? (
                    <img
                      className="inline-block rounded-full h-9 w-9 object-cover border-2 border-gray-600"
                      src={user.profilePicture}
                      alt={user.name || "User Avatar"}
                    />
                  ) : (
                    <div className="inline-block rounded-full h-9 w-9 bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-gray-600">
                      {getUserInitials(user?.name || user?.email || "User")}
                    </div>
                  )}
                  {user?.isPremium && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">★</span>
                    </div>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-300">
                    {user?.name || user?.email || "User"}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {user?.isPremium ? "Premium Member" : "View Profile"}
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

export default Sidebar;
