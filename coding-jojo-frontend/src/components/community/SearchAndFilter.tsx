"use client";

import React, { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: "recent" | "popular" | "trending" | "oldest";
  setSortOrder: (order: "recent" | "popular" | "trending" | "oldest") => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  categories: { id: string; name: string; count: number }[];
}

export default function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  activeTab,
  setActiveTab,
  categories,
}: SearchAndFilterProps) {
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const handleClearFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
    setSortOrder("recent");
  };

  return (
    <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 mb-6 hover:shadow-purple-900/20 transition duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search discussions..."
                  className="w-full h-11 pl-12 pr-4 backdrop-blur-sm bg-gradient-to-r from-pink-500/10 to-orange-500/10 p-5 backdrop-blur-sm shadow-lg focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 text-white dark:text-white text-gray-900 text-sm outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-500/10 placeholder-slate-400 dark:placeholder-slate-400 placeholder-slate-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="bg-gray-800 px-4 py-2.5 flex items-center text-gray-300 hover:bg-gray-700 transition duration-200"
            >
              <Filter className="w-4 h-4 mr-2 text-pink-400" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  showMobileFilters ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-gray-400">Sort by:</span>{" "}
            <select
              className="bg-gray-800 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value as "recent" | "popular" | "trending" | "oldest"
                )
              }
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="trending">Trending</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {showMobileFilters && (
        <div className="mt-4 md:hidden border-t border-gray-700 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Categories
              </label>
              <select
                className="w-full  bg-gray-900 px-3 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories
                  .filter((cat) => cat.id !== "all")
                  .map((category) => (
                    <option
                      key={category.id}
                      value={category.name.toLowerCase()}
                    >
                      {category.name} ({category.count})
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Sort by
              </label>{" "}
              <select
                className="w-full  bg-gray-900 px-3 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(
                    e.target.value as
                      | "recent"
                      | "popular"
                      | "trending"
                      | "oldest"
                  )
                }
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleClearFilters}
              className="text-pink-400 hover:text-pink-300 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
