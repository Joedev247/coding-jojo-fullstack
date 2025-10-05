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
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-purple-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
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
                  className={`w-full text-left flex items-center justify-between py-2.5 px-3 transition duration-200 ${
                    activeTab ===
                    (category.id === "all"
                      ? "all"
                      : category.name.toLowerCase())
                      ? "bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium border-l-4 border-pink-500"
                      : "hover:bg-gray-800/70 text-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </div>
                  <span
                    className={`text-xs rounded-full px-2.5 py-1 ${
                      activeTab ===
                      (category.id === "all"
                        ? "all"
                        : category.name.toLowerCase())
                        ? "bg-pink-500/20 text-pink-400"
                        : "bg-gray-800 text-gray-400"
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
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-orange-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            <TrendingUp className="w-4 h-4 mr-2 text-orange-400" />
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                className="bg-gray-800 hover:bg-pink-900/40 text-gray-300 hover:text-pink-300 text-sm px-3 py-1.5 transition duration-200 hover:border-pink-700"
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* Active Members */}
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-blue-900/20 transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              <Users className="w-4 h-4 mr-2 text-blue-400" />
              Active Members
            </h3>
            <button className="text-sm text-pink-400 hover:text-pink-300 font-medium">
              View all
            </button>
          </div>
          <ul className="space-y-4">
            {featuredMembers.slice(0, 5).map((member) => (
              <li key={member.id} className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={member.avatarUrl}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover border-2 border-gray-700"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      member.lastActive === "Online now"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } border-2 border-gray-900`}
                  ></div>
                </div>
                <div>
                  <p className="font-medium text-gray-200">{member.name}</p>
                  <p className="text-xs text-gray-400 flex items-center">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        member.lastActive === "Online now"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      } mr-1.5`}
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
