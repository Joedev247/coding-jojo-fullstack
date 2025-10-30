"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar as CalendarIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  User,
  Award,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname() || "/";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900  flex items-center justify-center">
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
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/dashboard") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </a>

        <a
          href="/dashboard/courses"
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/dashboard/courses") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Course</span>
        </a>

        <a
          href="/dashboard/certification"
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/dashboard/certification") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Award className="w-5 h-5" />
          <span>Certification</span>
        </a>

        <a
          href="/community"
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/community") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Chat</span>
        </a>

        <a
          href="/dashboard/schedule"
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/dashboard/schedule") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <CalendarIcon className="w-5 h-5" />
          <span>Schedule</span>
        </a>

        <a
          href="/dashboard/settings"
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/dashboard/settings") || isActive("/profile")
              ? "bg-gray-100 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </a>

        <a
          href="/dashboard/billing"
          className={`flex items-center space-x-3 px-3 py-2 text-sm font-medium  ${
            isActive("/dashboard/billing") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Setting</span>
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
            <p className="text-xs text-gray-600 mb-2">Upgrade to PRO for more resources</p>
          </div>
        </div>
        <button className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-3  text-sm font-semibold hover:from-emerald-500 hover:to-cyan-600 transition-all">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
