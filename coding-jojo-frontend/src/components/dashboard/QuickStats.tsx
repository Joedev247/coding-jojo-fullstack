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
      <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 "></div>
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
      icon: <BookOpen className="h-6 w-6 text-purple-400" />,
      change:
        userStats.coursesInProgress > 0
          ? `+${userStats.coursesInProgress}`
          : "0",
      changeColor:
        userStats.coursesInProgress > 0 ? "text-green-400" : "text-gray-400",
    },
    {
      label: "Completed Courses",
      value: userStats.coursesCompleted?.toString() || "0",
      icon: <Award className="h-6 w-6 text-yellow-400" />,
      change:
        userStats.coursesCompleted > 0
          ? `${Math.round(
              (userStats.coursesCompleted /
                Math.max(userStats.totalCourses, 1)) *
                100
            )}%`
          : "0%",
      changeColor:
        userStats.coursesCompleted > 0 ? "text-green-400" : "text-gray-400",
    },
    {
      label: "Learning Hours",
      value: userStats.totalHoursLearned?.toString() || "0",
      icon: <Clock className="h-6 w-6 text-orange-400" />,
      change: quickStats.weeklyProgress?.hoursLearned
        ? `+${quickStats.weeklyProgress.hoursLearned}h`
        : "0h",
      changeColor:
        quickStats.weeklyProgress?.hoursLearned > 0
          ? "text-green-400"
          : "text-gray-400",
    },
    {
      label: "Certificates",
      value: userStats.certificatesEarned?.toString() || "0",
      icon: <Award className="h-6 w-6 text-pink-400" />,
      change: userStats.certificatesEarned > 0 ? "Earned" : "None",
      changeColor:
        userStats.certificatesEarned > 0 ? "text-green-400" : "text-gray-400",
    },
    {
      label: "Avg. Progress",
      value:
        userStats.totalCourses > 0
          ? `${Math.round(
              (userStats.coursesCompleted / userStats.totalCourses) * 100
            )}%`
          : "0%",
      icon: <Target className="h-6 w-6 text-blue-400" />,
      change: userStats.coursesInProgress > 0 ? "Active" : "Idle",
      changeColor:
        userStats.coursesInProgress > 0 ? "text-green-400" : "text-gray-400",
    },
    {
      label: "Current Streak",
      value: `${quickStats.weeklyProgress?.streakDays || 1} days`,
      icon: <TrendingUp className="h-6 w-6 text-green-400" />,
      change: quickStats.weeklyProgress?.streakDays > 1 ? "Growing" : "Start",
      changeColor:
        quickStats.weeklyProgress?.streakDays > 1
          ? "text-green-400"
          : "text-gray-400",
    },
  ];

  return (
    <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-pink-400" />
          Platform Stats
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Real-time learning analytics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 hover:border-pink-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-gray-700/50 group-hover:bg-gradient-to-br group-hover:from-pink-500/20 group-hover:to-orange-500/20 transition-all duration-300">
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
              <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
              <p className="text-xs text-gray-400 leading-tight">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Last updated: Just now</span>
          <button className="text-pink-400 hover:text-pink-300 transition-colors">
            View detailed analytics →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
