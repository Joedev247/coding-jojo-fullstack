"use client";

import React from "react";
import Image from "next/image";
import { Bell, ChevronDown, Search } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Left Side - Title and Search */}
        <div className="flex items-center space-x-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="relative max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, tasks and more..."
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-72 bg-gray-50 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={user?.profilePicture || "/testimonial-avatar.jpg"}
                alt={user?.name || "User"}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-gray-100"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
            </div>
            <div className="flex items-center">
              <div className="mr-2">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || "Martin nel"}
                </p>
                <p className="text-xs text-gray-500">Premium User</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}