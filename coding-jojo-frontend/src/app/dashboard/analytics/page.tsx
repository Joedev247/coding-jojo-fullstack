"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  Target,
  Loader,
} from "lucide-react";
import { analyticsService, AnalyticsData } from "../../../lib/analyticsService";
import { getProgressColor } from "../../../utils/progressUtils";

const getGrowthIcon = (growth: number) => {
  return growth > 0 ? (
    <TrendingUp className="h-3 w-3 text-blue-600" />
  ) : (
    <TrendingDown className="h-3 w-3 text-red-600" />
  );
};

const calculateLearningTimeChange = (analytics: AnalyticsData) => {
  const change = ((analytics.learningTime.thisWeek - analytics.learningTime.lastWeek) / Math.max(analytics.learningTime.lastWeek, 1)) * 100;
  return {
    percentage: Math.abs(change).toFixed(1),
    isPositive: change > 0
  };
};

const Analytics: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await analyticsService.getAnalyticsData();
        
        if (response.success && response.data) {
          setAnalytics(response.data);
          setError(null);
        } else {
          setError('Failed to load analytics data');
        }
      } catch (err) {
        setError('Error loading analytics data');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
          <p className="text-gray-600 text-sm">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <p className="text-red-600 mb-2 text-sm">{error || 'Failed to load analytics'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-600 hover:text-blue-700 underline text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const learningTimeChange = calculateLearningTimeChange(analytics);

  return (
    <>
      <div className="space-y-4 p-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4 text-center">
            <Clock className="h-4 w-4 text-blue-600 mx-auto mb-2" />
            <h4 className="text-gray-600 text-xs font-medium mb-1">
              This Week
            </h4>
            <p className="text-xl font-bold text-blue-600">
              {analytics.learningTime.thisWeek}h
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {getGrowthIcon(learningTimeChange.isPositive ? 1 : -1)}
              <span
                className={`text-xs ${
                  learningTimeChange.isPositive
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                {learningTimeChange.percentage}%
              </span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4 text-center">
            <Target className="h-4 w-4 text-blue-600 mx-auto mb-2" />
            <h4 className="text-gray-600 text-xs font-medium mb-1">
              Learning Streak
            </h4>
            <p className="text-xl font-bold text-blue-600">
              {analytics.achievements.streak}
            </p>
            <p className="text-gray-500 text-xs mt-1">Days in a row</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4 text-center">
            <BookOpen className="h-4 w-4 text-blue-600 mx-auto mb-2" />
            <h4 className="text-gray-600 text-xs font-medium mb-1">
              Courses Active
            </h4>
            <p className="text-xl font-bold text-blue-600">
              {analytics.courseProgress.length}
            </p>
            <p className="text-gray-500 text-xs mt-1">Currently enrolled</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4 text-center">
            <Award className="h-4 w-4 text-blue-600 mx-auto mb-2" />
            <h4 className="text-gray-600 text-xs font-medium mb-1">
              Certificates
            </h4>
            <p className="text-xl font-bold text-blue-600">
              {analytics.achievements.certificates}
            </p>
            <p className="text-gray-500 text-xs mt-1">Earned this year</p>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Learning Activity</h3>
            <div className="flex bg-gray-100  overflow-hidden">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  timeframe === "week"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  timeframe === "month"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  timeframe === "year"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Year
              </button>
            </div>
          </div>

          {/* Daily Learning Chart */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {analytics.learningTime.dailyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 h-20 flex items-end justify-center p-1 mb-1 rounded">
                  <div
                    className="bg-gradient-to-t from-blue-600 to-blue-700 w-full "
                    style={{
                      height: `${(day.hours / 4) * 100}%`,
                      minHeight: day.hours > 0 ? "4px" : "0",
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{day.day}</p>
                <p className="text-xs text-gray-500">{day.hours}h</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Course Progress</h3>
          <div className="space-y-3">
            {analytics.courseProgress.map((course, index) => (
              <div key={index} className="bg-blue-50/50 backdrop-blur-sm border border-blue-100  p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {course.course}
                    </h4>
                    <p className="text-xs text-gray-600">
                      Last accessed:{" "}
                      {new Date(course.lastAccess).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Time Spent</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {course.timeSpent}h
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(
                        course.progress
                      )}`}
                    >
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Skills Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.skillsProgress.map((skill, index) => (
              <div key={index} className="bg-blue-50/50 backdrop-blur-sm border border-blue-100  p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-800">
                    {skill.skill}
                  </h4>
                  <div className="flex items-center gap-1">
                    {getGrowthIcon(skill.growth)}
                    <span className="text-xs text-blue-600">
                      +{skill.growth}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">Proficiency</span>
                  <span className="text-gray-800 font-medium text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-200  p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Learning Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50/50 backdrop-blur-sm border border-blue-100  p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 ">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Weekly Goal
                  </h4>
                  <p className="text-xs text-gray-600">20 hours of learning</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Progress</span>
                <span className="text-gray-800 font-medium text-sm">{analytics.learningTime.thisWeek} / 20 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full"
                  style={{ width: `${Math.min((analytics.learningTime.thisWeek / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-blue-50/50 backdrop-blur-sm border border-blue-100  p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 ">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Monthly Goal
                  </h4>
                  <p className="text-xs text-gray-600">Complete 2 courses</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Progress</span>
                <span className="text-gray-800 font-medium text-sm">{analytics.achievements.totalCompleted} / 2 courses</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full"
                  style={{ width: `${Math.min((analytics.achievements.totalCompleted / 2) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
