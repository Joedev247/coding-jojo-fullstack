"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import CourseProgressCards from "../../components/dashboard/CourseProgressCards";
import EnrolledCourses from "../../components/dashboard/EnrolledCourses";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import QuickStats from "../../components/dashboard/QuickStats";
import TransactionHistory from "../../components/dashboard/TransactionHistory";
import { useDashboard } from "../../hooks/useDashboard";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { dashboardData, isLoading, error } = useDashboard();
  const searchParams = useSearchParams();
  const toast = useToast();

  // Check for welcome parameter and show welcome message for OAuth users
  useEffect(() => {
    const isWelcome = searchParams.get("welcome");
    if (isWelcome === "true" && user) {
      toast.success(
        `Welcome to Coding JoJo, ${
          user.name?.split(" ")[0] || "Developer"
        }! 🎉 Your account has been set up successfully.`
      );
    }
  }, [searchParams, user, toast]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Login</h2>
          <p className="text-gray-400">
            You need to be logged in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="sm" text="Loading Dashboard..." />
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-400">
            {error || "Unable to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <WelcomeSection /> {/* Quick Stats Overview */}
      <QuickStats />
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {dashboardData.courseProgress &&
          dashboardData.courseProgress.length > 0 ? (
            <CourseProgressCards
              courses={dashboardData.courseProgress.map((course) => ({
                ...course,
                lastChapter: course.lastChapter || "",
                category: course.category || "General",
                lastAccessed: course.lastAccessed || new Date().toISOString(),
              }))}
            />
          ) : (
            <div className="p-8   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                No Courses in Progress
              </h3>
              <p className="text-gray-400 mb-4">
                Start learning by enrolling in a course!
              </p>{" "}
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white  hover:from-pink-600 hover:to-orange-600 transition-all duration-300"
              >
                Browse Courses
              </Link>
            </div>
          )}

          {dashboardData.enrolledCourses &&
          dashboardData.enrolledCourses.length > 0 ? (
            <EnrolledCourses
              courses={dashboardData.enrolledCourses.map((course) => ({
                ...course,
                lastChapter: course.lastChapter || "",
                category: course.category || "General",
                lastAccessed: course.lastAccessed || new Date().toISOString(),
              }))}
            />
          ) : (
            <div className="p-8   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50  text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                No Enrolled Courses
              </h3>
              <p className="text-gray-400 mb-4">
                Enroll in courses to start your learning journey!
              </p>{" "}
              <Link
                href="/courses"
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white  hover:from-pink-600 hover:to-orange-600 transition-all duration-300"
              >
                Explore Courses
              </Link>
            </div>
          )}

          {/* Bottom widgets for main area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Achievements */}
            <div className="p-6   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 ">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Achievements
              </h3>
              {dashboardData.achievements &&
              dashboardData.achievements.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.achievements.slice(0, 3).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center gap-3 p-3  bg-gray-900/50 "
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="text-white font-medium">
                          {achievement.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  Complete courses to earn achievements!
                </p>
              )}
            </div>

            {/* Recent Activity */}
            <div className="p-6   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 ">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Activity
              </h3>
              {dashboardData.recentActivity &&
              dashboardData.recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.recentActivity.slice(0, 3).map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3  bg-gray-900/50 "
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div>
                        <p className="text-white text-sm">{activity.title}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">
                  Start learning to see your activity!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Subscription Card */}
          <div className="p-6   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 ">
            <h3 className="text-lg font-semibold text-white mb-4">
              Subscription
            </h3>
            <p className="text-gray-400">
              Plan: {user?.isPremium ? "Premium" : "Free"}
            </p>
          </div>

          {/* Notifications */}
          <NotificationsWidget notifications={dashboardData.notifications} />

          {/* Upcoming Events */}
          <div className="p-6   bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 ">
            <h3 className="text-lg font-semibold text-white mb-4">
              Upcoming Events
            </h3>
            <p className="text-gray-400">No upcoming events</p>
          </div>
        </div>
      </div>
      {/* Transaction History Section */}
      <div className="mt-8">
        <TransactionHistory />
      </div>
    </div>
  );
}
