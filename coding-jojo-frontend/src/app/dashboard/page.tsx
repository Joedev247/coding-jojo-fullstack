"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Star,
  Bell,
  MoreVertical,
  User,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";

import { dashboardService } from "../../lib/dashboardService";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [learningTimeFilter, setLearningTimeFilter] = useState("Today");
  const [activityFilter, setActivityFilter] = useState("Weekly");
  const [courseFilter, setCourseFilter] = useState("All");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<any>(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await dashboardService.getStats({
          timeFilter: learningTimeFilter as any,
          activityFilter: activityFilter as any,
          courseFilter: courseFilter as any,
        });

        if (response.success && response.data) {
          setDashboardStats(response.data);
        } else {
          console.error("Failed to fetch dashboard stats:", response.error);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, [isAuthenticated, learningTimeFilter, activityFilter, courseFilter]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600">
            You need to be logged in to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const userName = user?.name?.split(" ")[0] || "Martin";

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Header title="Dashboard" />

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
                {isLoading ? (
                  <div className="space-y-6">
                    <div className="bg-gray-200 h-48 animate-pulse"></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-200 h-64 animate-pulse"></div>
                      <div className="bg-gray-200 h-64 animate-pulse"></div>
                    </div>
                    <div className="bg-gray-200 h-96 animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    {/* Welcome Card */}
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900  p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Hi {userName}!</h2>
                  <p className="text-emerald-50">
                    You have completed 5 lesson in last day. Start your learning
                    today.
                  </p>
                </div>
                {/* Illustration */}
                <div className="absolute right-0 top-0 h-full w-1/3">
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full"
                    fill="none"
                  >
                    <circle cx="100" cy="80" r="30" fill="#FFFFFF" opacity="0.2" />
                    <rect
                      x="70"
                      y="110"
                      width="60"
                      height="80"
                      rx="5"
                      fill="#FFFFFF"
                      opacity="0.3"
                    />
                    <rect
                      x="80"
                      y="60"
                      width="40"
                      height="60"
                      rx="20"
                      fill="#FFA500"
                    />
                    <circle cx="100" cy="70" r="15" fill="#FFE4C4" />
                  </svg>
                </div>
              </div>

              {/* Learning Time and Activity Charts */}
              <div className="grid grid-cols-2 gap-6">
                {/* Learning Time */}
                <div className="bg-white  p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Learning Time
                    </h3>
                    <select
                      value={learningTimeFilter}
                      onChange={(e) => setLearningTimeFilter(e.target.value)}
                      className="text-sm border border-gray-200  px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Today</option>
                      <option>Week</option>
                      <option>Month</option>
                    </select>
                  </div>

                  {/* Circular Progress */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#E5E7EB"
                          strokeWidth="12"
                          fill="none"
                        />
                        {dashboardStats?.learningTime && (
                          <>
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="#EF4444"  // Reading (red)
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              strokeDashoffset={`${2 * Math.PI * 56 * (1 - dashboardStats.learningTime.reading / 100)}`}
                              strokeLinecap="round"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="#3B82F6"  // Writing (blue)
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              strokeDashoffset={`${2 * Math.PI * 56 * (1 - dashboardStats.learningTime.writing / 100)}`}
                              strokeLinecap="round"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="#8B5CF6"  // Video (purple)
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              strokeDashoffset={`${2 * Math.PI * 56 * (1 - dashboardStats.learningTime.video / 100)}`}
                              strokeLinecap="round"
                            />
                            <circle
                              cx="64"
                              cy="64"
                              r="56"
                              stroke="#9CA3AF"  // Assignment (gray)
                              strokeWidth="12"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              strokeDashoffset={`${2 * Math.PI * 56 * (1 - dashboardStats.learningTime.assignment / 100)}`}
                              strokeLinecap="round"
                            />
                          </>
                        )}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {dashboardStats?.learningTime?.total || "0h 0m"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-600">Reading</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600">Writing</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-600">Video</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <span className="text-gray-600">Assignment</span>
                    </div>
                  </div>
                </div>

                {/* My Activity */}
                <div className="bg-white  p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">My Activity</h3>
                    <select
                      value={activityFilter}
                      onChange={(e) => setActivityFilter(e.target.value)}
                      className="text-sm border border-gray-200  px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>

                  {/* Activity Chart */}
                  <div className="h-32 relative">
                    {dashboardStats?.activity ? (
                      <>
                        <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
                          <path
                            d={
                              dashboardStats.activity.length > 0
                                ? dashboardStats.activity
                                    .map((item: any, index: number) => {
                                      const x = (index * 300) / (dashboardStats.activity.length - 1 || 1);
                                      const y = 100 - Math.min(100, Math.max(0, item.value));
                                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                                    })
                                    .join(' ')
                                : 'M 0 80 L 300 20'
                            }
                            stroke="#10B981"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                          />
                          {dashboardStats.activity.map((item: any, index: number) => (
                            <circle
                              key={item.day || index}
                              cx={(index * 300) / (dashboardStats.activity.length - 1 || 1)}
                              cy={100 - Math.min(100, Math.max(0, item.value))}
                              r="4"
                              fill="#10B981"
                            />
                          ))}
                        </svg>

                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-2">
                          {dashboardStats.activity.map((item: any, index: number) => (
                            <span key={item.day || index} className={index === dashboardStats.activity.length - 1 ? 'font-semibold text-emerald-600' : ''}>
                              {item.day}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">No activity data</div>
                    )}
                  </div>
                </div>
              </div>

              {/* My Courses */}
              <div className="bg-white  p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">My Courses</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCourseFilter("All")}
                      className={`px-3 py-1 text-sm  ${
                        courseFilter === "All"
                          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setCourseFilter("Ongoing")}
                      className={`px-3 py-1 text-sm  ${
                        courseFilter === "Ongoing"
                          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Ongoing
                    </button>
                    <button
                      onClick={() => setCourseFilter("Complete")}
                      className={`px-3 py-1 text-sm  ${
                        courseFilter === "Complete"
                          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Complete
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {dashboardStats?.courses?.length ? (
                    dashboardStats.courses.map((course: any) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                            {course.thumbnail ? (
                              <Image src={course.thumbnail} alt={course.title} width={48} height={48} className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xl">📘</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">{course.title}</h4>
                            <p className="text-xs text-gray-500 mb-2">By {course.instructor?.name || course.instructor || 'Instructor'}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-xs">
                                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 h-1.5 rounded-full" style={{ width: `${course.progress ?? 0}%` }}></div>
                              </div>
                              <span className="text-xs text-gray-600">{course.progress ?? 0}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold text-gray-900">{course.rating ?? '-'}</span>
                          </div>
                          <button className="px-4 py-2 border border-emerald-500 text-emerald-600  text-sm font-medium hover:bg-emerald-50 transition-colors">View Course</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">No courses found</div>
                  )}
                </div>
              </div>
                  </>
                )}
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Calendar */}
              <div className="bg-white  p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900">
                    {monthNames[currentDate.getMonth()]} {currentDate.getDate()}{" "}
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                      currentDate.getDay()
                    ]}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        setCurrentDate(
                          new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentDate(
                          new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                    <div key={`empty-${index}`} className="aspect-square"></div>
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    const isToday =
                      isCurrentMonth && day === today.getDate();
                    const isSelected = day === 18;

                    return (
                      <button
                        key={day}
                        className={`aspect-square flex items-center justify-center text-sm rounded-full transition-colors ${
                          isToday
                            ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-bold"
                            : isSelected
                            ? "bg-blue-500 text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Upcoming Task */}
              <div className="bg-white  p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900">
                    Upcoming Task
                  </h3>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700">
                    See all
                  </button>
                </div>
                  <p className="text-xs text-gray-500 mb-4">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>

                <div className="space-y-3">
                    {dashboardStats?.upcomingTasks?.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50  hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-10 h-10 ${task.color} rounded-full flex-shrink-0`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-500">{task.time}</p>
                      </div>
                      <button className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white  p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900">
                    Payment History
                  </h3>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700">
                    See all
                  </button>
                </div>

                <div className="space-y-3">
                    {dashboardStats?.paymentHistory?.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 bg-gray-50  hover:bg-gray-100 transition-colors"
                    >
                        <div>
                          <span className="text-sm text-gray-700">{payment.description}</span>
                          <span className="text-xs text-gray-500 block">{new Date(payment.date).toLocaleDateString()}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">
                          ${payment.amount.toFixed(2)}
                        </span>
                    </div>
                  ))}
                    {(!dashboardStats?.paymentHistory || dashboardStats.paymentHistory.length === 0) && (
                      <div className="text-center py-4 text-gray-500">
                        <p className="text-sm">No payment history available</p>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
