"use client";

import React from "react";
import { BookOpen, Award, Calendar, HelpCircle, Send } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="hidden xl:block w-72 flex-shrink-0">
      <div className="space-y-6 sticky top-[156px]">
        {/* Community Stats */}
        <div className="  bg-gray-900/50 backdrop-blur-sm  shadow-xl p-5 hover:shadow-purple-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            Community Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/70 p-4 text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">
                1,245
              </div>
              <div className="text-sm text-gray-400 mt-1">Members</div>
            </div>
            <div className="bg-gray-800/70 p-4 text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">
                347
              </div>
              <div className="text-sm text-gray-400 mt-1">Posts</div>
            </div>
            <div className="bg-gray-800/70 p-4 text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">
                89%
              </div>
              <div className="text-sm text-gray-400 mt-1">Engagement</div>
            </div>
            <div className="bg-gray-800/70 p-4 text-center">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">
                52
              </div>
              <div className="text-sm text-gray-400 mt-1">Online</div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="  bg-gray-900/50 backdrop-blur-sm  shadow-xl p-5 hover:shadow-blue-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center justify-between text-gray-300 hover:text-pink-400 transition duration-200 py-2 px-3 hover:bg-gray-800/50"
              >
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-3 text-gray-500" />
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
                className="flex items-center justify-between text-gray-300 hover:text-pink-400 transition duration-200 py-2 px-3 hover:bg-gray-800/50"
              >
                <span className="flex items-center">
                  <Award className="w-4 h-4 mr-3 text-gray-500" />
                  Badges & Rewards
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
                className="flex items-center justify-between text-gray-300 hover:text-pink-400 transition duration-200 py-2 px-3 hover:bg-gray-800/50"
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-500" />
                  Upcoming Events
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
                className="flex items-center justify-between text-gray-300 hover:text-pink-400 transition duration-200 py-2 px-3 hover:bg-gray-800/50"
              >
                <span className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
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
        <div className="  bg-gray-900/50 backdrop-blur-sm  shadow-xl p-5 hover:shadow-orange-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            Start a Discussion
          </h3>
          <div className="mb-3">
            <textarea
              placeholder="What's on your mind?"
              className="w-full  bg-gray-900/70 p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 min-h-24 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-4 py-2 flex items-center font-medium transition duration-200 shadow-md">
              <Send className="w-4 h-4 mr-2" />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
