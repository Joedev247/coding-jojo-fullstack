"use client";
import React, { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number | null;
  bgClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change = null,
  bgClass = "",
}) => {
  const getBgForIcon = (title: string) => {
    const bgClasses: Record<string, string> = {
      "Total Students": "bg-purple-500/20 text-purple-400",
      "Total Revenue": "bg-blue-500/20 text-blue-400",
      "New Users": "bg-blue-500/20 text-blue-400",
      "Monthly Revenue": "bg-pink-500/20 text-pink-400",
      "Completion Rate": "bg-amber-500/20 text-amber-400",
      "Engagement Rate": "bg-cyan-500/20 text-cyan-400",
      "Course Ratings": "bg-yellow-500/20 text-yellow-400",
      "Active Users": "bg-teal-500/20 text-teal-400",
    };
    return bgClasses[title] || "bg-gray-700/50 text-gray-300";
  };

  return (
    <div
      className={`  bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-5 hover:shadow-lg transition duration-300 ${bgClass}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-white">{value}</h4>
          {change !== null && (
            <div
              className={`flex items-center mt-2 ${
                change >= 0 ? "text-blue-400" : "text-red-400"
              }`}
            >
              <span className="text-xs font-medium flex items-center">
                {change >= 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${getBgForIcon(title)}`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
