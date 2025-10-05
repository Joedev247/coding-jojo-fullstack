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
    <TrendingUp className="h-4 w-4 text-green-400" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-400" />
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-pink-400" />
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-400 mb-2">{error || 'Failed to load analytics'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-pink-400 hover:text-pink-300 underline"
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
      <div className="space-y-12 p-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="  bg-gray-900/80 backdrop-blur-sm p-8 text-center">
            <Clock className="h-8 w-8 text-blue-400 mx-auto mb-4" />
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              This Week
            </h4>
            <p className="text-3xl font-bold text-blue-400">
              {analytics.learningTime.thisWeek}h
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {getGrowthIcon(learningTimeChange.isPositive ? 1 : -1)}
              <span
                className={`text-sm ${
                  learningTimeChange.isPositive
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {learningTimeChange.percentage}%
              </span>
            </div>
          </div>

          <div className="  bg-gray-900/80 backdrop-blur-sm p-8 text-center">
            <Target className="h-8 w-8 text-pink-400 mx-auto mb-4" />
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              Learning Streak
            </h4>
            <p className="text-3xl font-bold text-pink-400">
              {analytics.achievements.streak}
            </p>
            <p className="text-gray-500 text-sm mt-2">Days in a row</p>
          </div>

          <div className="  bg-gray-900/80 backdrop-blur-sm p-8 text-center">
            <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-4" />
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              Courses Active
            </h4>
            <p className="text-3xl font-bold text-green-400">
              {analytics.courseProgress.length}
            </p>
            <p className="text-gray-500 text-sm mt-2">Currently enrolled</p>
          </div>

          <div className="  bg-gray-900/80 backdrop-blur-sm p-8 text-center">
            <Award className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
            <h4 className="text-gray-400 text-sm font-medium mb-2">
              Certificates
            </h4>
            <p className="text-3xl font-bold text-yellow-400">
              {analytics.achievements.certificates}
            </p>
            <p className="text-gray-500 text-sm mt-2">Earned this year</p>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Learning Activity</h3>
            <div className="flex bg-gray-700">
              <button
                onClick={() => setTimeframe("week")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  timeframe === "week"
                    ? "bg-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  timeframe === "month"
                    ? "bg-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTimeframe("year")}
                className={`px-6 py-3 text-sm font-medium transition-colors rounded-r-lg ${
                  timeframe === "year"
                    ? "bg-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Year
              </button>
            </div>
          </div>

          {/* Daily Learning Chart */}
          <div className="grid grid-cols-7 gap-4 mb-8">
            {analytics.learningTime.dailyData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-700 h-32 flex items-end justify-center p-2 mb-2">
                  <div
                    className="bg-gradient-to-t from-pink-600 to-orange-600 w-full"
                    style={{
                      height: `${(day.hours / 4) * 100}%`,
                      minHeight: day.hours > 0 ? "8px" : "0",
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">{day.day}</p>
                <p className="text-xs text-gray-500">{day.hours}h</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
          <h3 className="text-xl font-bold text-white mb-8">Course Progress</h3>
          <div className="space-y-6">
            {analytics.courseProgress.map((course, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-white">
                      {course.course}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Last accessed:{" "}
                      {new Date(course.lastAccess).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Time Spent</p>
                      <p className="text-white font-medium">
                        {course.timeSpent}h
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(
                        course.progress
                      )}`}
                    >
                      {course.progress}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-pink-600 to-orange-600 h-3 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress */}
        <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
          <h3 className="text-xl font-bold text-white mb-8">
            Skills Development
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {analytics.skillsProgress.map((skill, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">
                    {skill.skill}
                  </h4>
                  <div className="flex items-center gap-2">
                    {getGrowthIcon(skill.growth)}
                    <span className="text-sm text-green-400">
                      +{skill.growth}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Proficiency</span>
                  <span className="text-white font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-pink-600 to-orange-600 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <div className="  bg-gray-900/80 backdrop-blur-sm p-8">
          <h3 className="text-xl font-bold text-white mb-8">Learning Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20">
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">
                    Weekly Goal
                  </h4>
                  <p className="text-sm text-gray-400">20 hours of learning</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-white font-medium">{analytics.learningTime.thisWeek} / 20 hours</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full"
                  style={{ width: `${Math.min((analytics.learningTime.thisWeek / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20">
                  <Calendar className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-white">
                    Monthly Goal
                  </h4>
                  <p className="text-sm text-gray-400">Complete 2 courses</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-white font-medium">{analytics.achievements.totalCompleted} / 2 courses</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-600 to-emerald-600 h-3 rounded-full"
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
