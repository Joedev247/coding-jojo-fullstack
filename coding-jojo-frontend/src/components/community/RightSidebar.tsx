"use client";

import React from "react";
import { BookOpen, Award, Calendar, HelpCircle, Send } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="hidden xl:block w-72 flex-shrink-0">
      <div className="space-y-6 sticky top-[156px]">
        {/* Community Stats */}
        <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300">
          <h3 className="text-xs font-semibold text-gray-800 mb-3 flex items-center">
            <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
            Community Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3  text-center">
              <div className="text-xl font-bold text-blue-600">
                1,245
              </div>
              <div className="text-xs text-gray-600 mt-1">Members</div>
            </div>
            <div className="bg-gray-50 p-3  text-center">
              <div className="text-xl font-bold text-blue-600">
                347
              </div>
              <div className="text-xs text-gray-600 mt-1">Posts</div>
            </div>
            <div className="bg-gray-50 p-3  text-center">
              <div className="text-xl font-bold text-blue-600">
                89%
              </div>
              <div className="text-xs text-gray-600 mt-1">Engagement</div>
            </div>
            <div className="bg-gray-50 p-3  text-center">
              <div className="text-xl font-bold text-blue-600">
                52
              </div>
              <div className="text-xs text-gray-600 mt-1">Online</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300">
          <h3 className="text-xs font-semibold text-gray-800 mb-3 flex items-center">
            <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
            Quick Links
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition duration-200 py-1.5 px-2 hover:bg-gray-50  text-sm"
              >
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                  Community Guidelines
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition duration-200 py-1.5 px-2 hover:bg-gray-50  text-sm"
              >
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-gray-500" />
                  Badges & Rewards
                </span>
                <svg
                  className="w-3 h-3 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition duration-200 py-1.5 px-2 hover:bg-gray-50  text-sm"
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Upcoming Events
                </span>
                <svg
                  className="w-3 h-3 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition duration-200 py-1.5 px-2 hover:bg-gray-50  text-sm"
              >
                <span className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2 text-gray-500" />
                  FAQ & Support
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        {/* Post a Message */}
        <div className="bg-white border border-gray-200  shadow-sm p-4 hover:shadow-md transition duration-300">
          <h3 className="text-xs font-semibold text-gray-800 mb-3 flex items-center">
            <span className="bg-blue-600 w-1 h-4 mr-2 rounded-full"></span>
            Start a Discussion
          </h3>
          <div className="mb-2">
            <textarea
              placeholder="What's on your mind?"
              className="w-full bg-gray-50 border border-gray-300  p-2.5 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 min-h-20 resize-none text-sm"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5  flex items-center font-medium text-sm transition duration-200">
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
