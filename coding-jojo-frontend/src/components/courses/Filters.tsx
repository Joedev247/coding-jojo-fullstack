import React from "react";
import { Search, Filter, Grid, List, ChevronDown } from "lucide-react";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeLevel: string;
  setActiveLevel: (level: string) => void;
  handleClearFilters: () => void;
  categories: { id: string; name: string; count: number }[];
}

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  setSearchQuery,
  showMobileFilters,
  setShowMobileFilters,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
  activeCategory,
  setActiveCategory,
  activeLevel,
  setActiveLevel,
  handleClearFilters,
  categories,
}) => {
  return (
    <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 mb-6 hover:shadow-purple-900/20 transition duration-300">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full  bg-gray-900/70 pl-10 pr-4 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
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
            <span className="text-gray-400">Sort by:</span>
            <select
              className="bg-gray-800 px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          <div className="hidden md:flex items-center space-x-2 border-l border-gray-700 pl-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-gray-700 text-pink-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${
                viewMode === "list"
                  ? "bg-gray-700 text-pink-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
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
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
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
                Level
              </label>
              <select
                className="w-full  bg-gray-900 px-3 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={activeLevel}
                onChange={(e) => setActiveLevel(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">
                Sort by
              </label>
              <select
                className="w-full  bg-gray-900 px-3 py-2.5 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">View</label>
              <div className="flex  bg-gray-900 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 py-2.5 flex items-center justify-center ${
                    viewMode === "grid"
                      ? "bg-gray-700 text-pink-400"
                      : "text-gray-400"
                  }`}
                >
                  <Grid className="w-5 h-5 mr-2" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 py-2.5 flex items-center justify-center ${
                    viewMode === "list"
                      ? "bg-gray-700 text-pink-400"
                      : "text-gray-400"
                  }`}
                >
                  <List className="w-5 h-5 mr-2" />
                  List
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleClearFilters}
              className="text-pink-400 hover:text-pink-300 text-sm font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
