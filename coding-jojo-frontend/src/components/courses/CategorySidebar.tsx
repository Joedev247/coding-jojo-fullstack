import React from "react";
import Image from "next/image";
import {
  BookMarked,
  Layers,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
} from "lucide-react";
import { Category, Instructor } from "../../types/courses";
import RatingStars from "./RatingStars";

interface CategorySidebarProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeLevel: string;
  setActiveLevel: (level: string) => void;
  trendingCourses: string[];
  featuredInstructors: Instructor[];
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  activeLevel,
  setActiveLevel,
  trendingCourses,
  featuredInstructors,
}) => {
  // Add appropriate icons to categories
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "all":
        return <BookMarked className="w-4 h-4 text-gray-400" />;
      case "development":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-blue-400"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case "data science":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-green-400"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        );
      case "mobile":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-orange-400"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12.01" y2="18"></line>
          </svg>
        );
      case "design":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-pink-400"
          >
            <circle cx="13.5" cy="6.5" r="3.5"></circle>
            <circle cx="6.5" cy="17.5" r="3.5"></circle>
            <circle cx="17.5" cy="17.5" r="3.5"></circle>
            <line x1="6.5" y1="17.5" x2="17.5" y2="17.5"></line>
            <line x1="13.5" y1="6.5" x2="17.5" y2="17.5"></line>
            <line x1="13.5" y1="6.5" x2="6.5" y2="17.5"></line>
          </svg>
        );
      case "cryptocurrency":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-yellow-400"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        );
      case "business":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-purple-400"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
        );
      default:
        return <BookMarked className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="space-y-6">
        {/* Categories Section */}
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-purple-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            Course Categories
          </h3>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() =>
                    setActiveCategory(
                      category.id === "all"
                        ? "all"
                        : category.name.toLowerCase()
                    )
                  }
                  className={`w-full text-left flex items-center justify-between py-2.5 px-3 transition duration-200 ${
                    activeCategory ===
                    (category.id === "all"
                      ? "all"
                      : category.name.toLowerCase())
                      ? "bg-gradient-to-r from-pink-600/20 to-orange-600/20 text-pink-400 font-medium border-l-4 border-pink-500"
                      : "hover:bg-gray-800/70 text-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    {category.icon || getCategoryIcon(category.id)}
                    <span className="ml-2">{category.name}</span>
                  </div>
                  <span
                    className={`text-xs rounded-full px-2.5 py-1 ${
                      activeCategory ===
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

        {/* Skill Levels */}
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-orange-900/20 transition duration-300">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
            <Layers className="w-4 h-4 mr-2 text-orange-400" />
            Skill Level
          </h3>
          <div className="space-y-2">
            {["all", "beginner", "intermediate", "advanced"].map(
              (level, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLevel(level)}
                  className={`w-full text-left flex items-center justify-between py-2.5 px-3 transition duration-200 ${
                    activeLevel === level
                      ? "bg-gradient-to-r from-orange-600/20 to-pink-600/20 text-orange-400 font-medium"
                      : "hover:bg-gray-800/70 text-gray-300"
                  }`}
                >
                  <span className="capitalize">
                    {level === "all" ? "All Levels" : level}
                  </span>
                  {activeLevel === level && (
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {/* Trending Courses */}
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-blue-900/20 transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
              Trending Now
            </h3>
          </div>
          <ul className="space-y-4">
            {trendingCourses.map((course, index) => (
              <li key={index} className="group">
                <button className="flex items-start space-x-3 w-full text-left">
                  <div className="flex-shrink-0 w-2 font-bold text-pink-500">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-200 group-hover:text-pink-400 transition-colors">
                      {course}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-400" />
                      Trending this week
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Instructors */}
        <div className="  bg-gray-900/50 backdrop-blur-sm shadow-xl p-5 hover:shadow-blue-900/20 transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 w-1 h-5 mr-3 rounded-full"></span>
              <Users className="w-4 h-4 mr-2 text-blue-400" />
              Featured Instructors
            </h3>
            <button className="text-sm text-pink-400 hover:text-pink-300 font-medium">
              View all
            </button>
          </div>
          <ul className="space-y-4">
            {featuredInstructors.slice(0, 3).map((instructor) => (
              <li key={instructor.id} className="group">
                <button className="flex items-center space-x-3 w-full text-left">
                  <div className="relative w-10 h-10">
                    <Image
                      src={instructor.avatarUrl}
                      alt={instructor.name}
                      fill
                      className="rounded-full object-cover border-2 border-gray-700 group-hover:border-pink-500 transition-colors"
                    />
                    {instructor.role === "Senior Instructor" && (
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full p-1 border border-gray-900">
                        <Star className="w-2 h-2 text-white" fill="white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-200 group-hover:text-pink-400 transition-colors">
                      {instructor.name}
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      {instructor.rating && (
                        <RatingStars rating={instructor.rating} />
                      )}
                      <span className="ml-1">{instructor.rating}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
