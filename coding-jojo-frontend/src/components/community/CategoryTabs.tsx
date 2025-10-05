"use client";

import React from "react";
import { Globe, HelpCircle, MessageCircle, Bell } from "lucide-react";

interface CategoryTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function CategoryTabs({
  activeTab,
  setActiveTab,
}: CategoryTabsProps) {
  return (
    <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl mb-6 overflow-hidden transition duration-300">
      <div className="flex border-b border-gray-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center justify-center whitespace-nowrap py-4 px-6 font-medium text-sm transition duration-200 ${
            activeTab === "all"
              ? "text-pink-400 border-b-2 border-pink-500 bg-pink-900/10"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
          }`}
        >
          <Globe
            className={`w-4 h-4 mr-2 ${
              activeTab === "all" ? "text-pink-400" : "text-gray-500"
            }`}
          />
          All Discussions
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`flex items-center justify-center whitespace-nowrap py-4 px-6 font-medium text-sm transition duration-200 ${
            activeTab === "questions"
              ? "text-pink-400 border-b-2 border-pink-500 bg-pink-900/10"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
          }`}
        >
          <HelpCircle
            className={`w-4 h-4 mr-2 ${
              activeTab === "questions" ? "text-pink-400" : "text-gray-500"
            }`}
          />
          Questions
        </button>
        <button
          onClick={() => setActiveTab("discussions")}
          className={`flex items-center justify-center whitespace-nowrap py-4 px-6 font-medium text-sm transition duration-200 ${
            activeTab === "discussions"
              ? "text-pink-400 border-b-2 border-pink-500 bg-pink-900/10"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
          }`}
        >
          <MessageCircle
            className={`w-4 h-4 mr-2 ${
              activeTab === "discussions" ? "text-pink-400" : "text-gray-500"
            }`}
          />
          Discussions
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`flex items-center justify-center whitespace-nowrap py-4 px-6 font-medium text-sm transition duration-200 ${
            activeTab === "announcements"
              ? "text-pink-400 border-b-2 border-pink-500 bg-pink-900/10"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
          }`}
        >
          <Bell
            className={`w-4 h-4 mr-2 ${
              activeTab === "announcements" ? "text-pink-400" : "text-gray-500"
            }`}
          />
          Announcements
        </button>
      </div>
    </div>
  );
}
