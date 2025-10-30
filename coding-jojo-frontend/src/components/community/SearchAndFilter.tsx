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
    <div className="bg-white border border-gray-200  shadow-sm p-4 mb-4 hover:shadow-md transition duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full bg-gray-50 border border-gray-300  pl-10 pr-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
              className="bg-gray-100 px-3 py-2  flex items-center text-gray-700 hover:bg-gray-200 transition duration-200"
            >
              <Filter className="w-4 h-4 mr-2 text-blue-600" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                  showMobileFilters ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Sort by:</span>{" "}
            <select
              className="bg-gray-50 border border-gray-300  px-2.5 py-1.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
        <div className="mt-3 md:hidden border-t border-gray-200 pt-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Categories
              </label>
              <select
                className="w-full bg-gray-50 border border-gray-300  px-2.5 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm text-gray-600 mb-1">
                Sort by
              </label>{" "}
              <select
                className="w-full bg-gray-50 border border-gray-300  px-2.5 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleClearFilters}
              className="text-blue-600 hover:text-blue-700 text-xs font-medium"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
