"use client";

import React from "react";
import { Users, TrendingUp } from "lucide-react";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  count: number;
  icon?: React.ReactNode;
}

interface Member {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  lastActive: string;
}

interface LeftSidebarProps {
  categories: Category[];
  trendingTopics: string[];
  featuredMembers: Member[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function LeftSidebar({
  categories,
  trendingTopics,
  featuredMembers,
  activeTab,
  setActiveTab,
}: LeftSidebarProps) {
  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="space-y-6 sticky top-[156px]">
        {/* Categories Section */}
        <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300">
          <h3 className="text-xs font-semibold text-gray-800 mb-3 flex items-center">
            <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
            Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() =>
                    setActiveTab(
                      category.id === "all"
                        ? "all"
                        : category.name.toLowerCase()
                    )
                  }
                  className={`w-full text-left flex items-center justify-between py-2 px-2.5  transition duration-200 ${
                    activeTab ===
                    (category.id === "all"
                      ? "all"
                      : category.name.toLowerCase())
                      ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-500"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2 text-sm">{category.name}</span>
                  </div>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 ${
                      activeTab ===
                      (category.id === "all"
                        ? "all"
                        : category.name.toLowerCase())
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending Topics */}
        <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300">
          <h3 className="text-xs font-semibold text-gray-800 mb-3 flex items-center">
            <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-xs px-2.5 py-1 rounded-full transition duration-200"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* Active Members */}
        <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-800 flex items-center">
              <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Active Members
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
              View all
            </button>
          </div>
          <ul className="space-y-3">
            {featuredMembers.slice(0, 5).map((member) => (
              <li key={member.id} className="flex items-center space-x-2.5">
                <div className="relative w-8 h-8">
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover border-2 border-gray-200"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                      member.lastActive === "Online now"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    } border-2 border-white`}
                  ></div>
                </div>
                <div>
                  <p className="font-medium text-gray-700 text-sm">{member.name}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        member.lastActive === "Online now"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                      } mr-1`}
                    ></span>
                    {member.lastActive === "Online now"
                      ? "Active now"
                      : member.lastActive}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
