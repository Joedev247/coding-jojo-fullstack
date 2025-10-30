import React from "react";
import {
  TrendingUp,
  Users,
  Clock,
  Award,
  BookOpen,
  Target,
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";

interface QuickStatsProps {
  stats?: {
    totalLearners?: number;
    totalCourses?: number;
    totalHours?: number;
    certificatesIssued?: number;
    averageCompletion?: number;
    newThisWeek?: number;
  };
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats = {} }) => {
  const { dashboardData, isLoading } = useDashboard();

  if (isLoading || !dashboardData) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm p-4">
        <div className="animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-300 "></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userStats = dashboardData.stats || {};
  const quickStats = dashboardData.quickStats || {};

  const statItems = [
    {
      label: "Courses Enrolled",
      value: userStats.totalCourses?.toString() || "0",
      icon: <BookOpen className="h-5 w-5 text-purple-600" />,
      change:
        userStats.coursesInProgress > 0
          ? `+${userStats.coursesInProgress}`
          : "0",
      changeColor:
        userStats.coursesInProgress > 0 ? "text-blue-600" : "text-gray-500",
    },
    {
      label: "Completed Courses",
      value: userStats.coursesCompleted?.toString() || "0",
      icon: <Award className="h-5 w-5 text-yellow-600" />,
      change:
        userStats.coursesCompleted > 0
          ? `${Math.round(
              (userStats.coursesCompleted /
                Math.max(userStats.totalCourses, 1)) *
                100
            )}%`
          : "0%",
      changeColor:
        userStats.coursesCompleted > 0 ? "text-blue-600" : "text-gray-500",
    },
    {
      label: "Learning Hours",
      value: userStats.totalHoursLearned?.toString() || "0",
      icon: <Clock className="h-5 w-5 text-orange-600" />,
      change: quickStats.weeklyProgress?.hoursLearned
        ? `+${quickStats.weeklyProgress.hoursLearned}h`
        : "0h",
      changeColor:
        quickStats.weeklyProgress?.hoursLearned > 0
          ? "text-blue-600"
          : "text-gray-500",
    },
    {
      label: "Certificates",
      value: userStats.certificatesEarned?.toString() || "0",
      icon: <Award className="h-5 w-5 text-blue-600" />,
      change: userStats.certificatesEarned > 0 ? "Earned" : "None",
      changeColor:
        userStats.certificatesEarned > 0 ? "text-blue-600" : "text-gray-500",
    },
    {
      label: "Avg. Progress",
      value:
        userStats.totalCourses > 0
          ? `${Math.round(
              (userStats.coursesCompleted / userStats.totalCourses) * 100
            )}%`
          : "0%",
      icon: <Target className="h-5 w-5 text-blue-600" />,
      change: userStats.coursesInProgress > 0 ? "Active" : "Idle",
      changeColor:
        userStats.coursesInProgress > 0 ? "text-blue-600" : "text-gray-500",
    },
    {
      label: "Current Streak",
      value: `${quickStats.weeklyProgress?.streakDays || 1} days`,
      icon: <TrendingUp className="h-5 w-5 text-blue-600" />,
      change: quickStats.weeklyProgress?.streakDays > 1 ? "Growing" : "Start",
      changeColor:
        quickStats.weeklyProgress?.streakDays > 1
          ? "text-blue-600"
          : "text-gray-500",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-blue-200  shadow-sm p-4">
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          Platform Stats
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Real-time learning analytics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-blue-50 border border-blue-200  p-3 hover:border-blue-300 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-white  group-hover:bg-blue-100 transition-all duration-300">
                {item.icon}
              </div>
              <div
                className={`text-xs font-medium ${item.changeColor} flex items-center gap-1`}
              >
                <TrendingUp className="h-3 w-3" />
                {item.change}
              </div>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900 mb-1">{item.value}</p>
              <p className="text-xs text-gray-600 leading-tight">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-blue-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last updated: Just now</span>
          <button className="text-blue-600 hover:text-blue-700 transition-colors">
            View detailed analytics →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
