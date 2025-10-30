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
    <div className="bg-white border border-gray-200  shadow-sm mb-4 overflow-hidden transition duration-300">
      <div className="flex border-b border-gray-200 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex items-center justify-center whitespace-nowrap py-3 px-4 font-medium text-sm transition duration-200 ${
            activeTab === "all"
              ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          <Globe
            className={`w-4 h-4 mr-1.5 ${
              activeTab === "all" ? "text-blue-600" : "text-gray-500"
            }`}
          />
          All Discussions
        </button>
        <button
          onClick={() => setActiveTab("questions")}
          className={`flex items-center justify-center whitespace-nowrap py-3 px-4 font-medium text-sm transition duration-200 ${
            activeTab === "questions"
              ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          <HelpCircle
            className={`w-4 h-4 mr-1.5 ${
              activeTab === "questions" ? "text-blue-600" : "text-gray-500"
            }`}
          />
          Questions
        </button>
        <button
          onClick={() => setActiveTab("discussions")}
          className={`flex items-center justify-center whitespace-nowrap py-3 px-4 font-medium text-sm transition duration-200 ${
            activeTab === "discussions"
              ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          <MessageCircle
            className={`w-4 h-4 mr-1.5 ${
              activeTab === "discussions" ? "text-blue-600" : "text-gray-500"
            }`}
          />
          Discussions
        </button>
        <button
          onClick={() => setActiveTab("announcements")}
          className={`flex items-center justify-center whitespace-nowrap py-3 px-4 font-medium text-sm transition duration-200 ${
            activeTab === "announcements"
              ? "text-blue-600 border-b-2 border-blue-500 bg-blue-50"
              : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          <Bell
            className={`w-4 h-4 mr-1.5 ${
              activeTab === "announcements" ? "text-blue-600" : "text-gray-500"
            }`}
          />
          Announcements
        </button>
      </div>
    </div>
  );
}
