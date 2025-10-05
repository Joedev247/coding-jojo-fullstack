"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Video,
  FileText,
  Users,
  Plus,
  Star,
  CalendarDays,
  AlertCircle,
  Target,
  Loader,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { scheduleService, ScheduleEvent, ScheduleData } from "../../../lib/scheduleService";

// Define proper types - keeping the interface for compatibility
interface Event {
  id: string;
  title: string;
  type: "live-session" | "assignment" | "quiz" | "deadline" | "meeting";
  date: string;
  time: string;
  duration?: string;
  course: string;
  instructor?: string;
  isImportant: boolean;
  status: "upcoming" | "ongoing" | "completed";
}

// Helper function to get user initials
const getUserInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const response = await scheduleService.getScheduleData();
        
        if (response.success && response.data) {
          setScheduleData(response.data);
          setError(null);
        } else {
          setError('Failed to load schedule data');
        }
      } catch (err) {
        setError('Error loading schedule data');
        console.error('Schedule fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "live-session":
        return <Video className="h-5 w-5 text-blue-400" />;
      case "assignment":
        return <FileText className="h-5 w-5 text-yellow-400" />;
      case "quiz":
        return <FileText className="h-5 w-5 text-pink-400" />;
      case "meeting":
        return <Users className="h-5 w-5 text-green-400" />;
      default:
        return <Calendar className="h-5 w-5 text-gray-400" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "live-session":
        return "bg-blue-500/20 text-blue-400";
      case "assignment":
        return "bg-yellow-500/20 text-yellow-400";
      case "quiz":
        return "bg-pink-500/20 text-pink-400";
      case "meeting":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(
        currentDate.getMonth() + (direction === "next" ? 1 : -1)
      );
    }
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-pink-400" />
          <p className="text-gray-400">Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (error || !scheduleData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-400 mb-2">{error || 'Failed to load schedule'}</p>
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

  const events = scheduleData.events;
  const stats = scheduleData.stats;

  return (
    <>
      <div className="space-y-8 p-8">
        {/* User Welcome Section */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative">
              {user?.profilePicture &&
              typeof user.profilePicture === "string" &&
              user.profilePicture.trim() !== "" ? (
                <img
                  src={user.profilePicture}
                  alt={user.name || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gradient-to-r from-pink-500 to-orange-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white font-semibold text-lg">
                  {getUserInitials(user?.name || "User")}
                </div>
              )}
              {user?.isPremium && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                  <Star className="h-4 w-4 text-white fill-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Your schedule, {user?.name || "Student"}! 📅
              </h2>
              <p className="text-gray-400">
                Stay organized with your learning timeline and upcoming events
                {user?.isPremium && (
                  <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-semibold">
                    Premium Member
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-pink-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <CalendarDays className="h-8 w-8 text-pink-400" />
              <span className="text-2xl font-bold text-white">{stats.thisWeek}</span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              This Week
            </h4>
            <p className="text-xs text-gray-500">Scheduled events</p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Video className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-blue-400">{stats.liveSessions}</span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              Live Sessions
            </h4>
            <p className="text-xs text-gray-500">This month</p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">{stats.deadlines}</span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              Deadlines
            </h4>
            <p className="text-xs text-gray-500">Coming up</p>
          </div>

          <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">{stats.attendance}%</span>
            </div>
            <h4 className="text-gray-400 text-sm font-medium mb-1">
              Attendance
            </h4>
            <p className="text-xs text-gray-500">This semester</p>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigateDate("prev")}
                className="p-3  bg-gray-900/50 border border-gray-700/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-white min-w-[200px] text-center">
                {formatDate(currentDate)}
              </h2>

              <button
                onClick={() => navigateDate("next")}
                className="p-3  bg-gray-900/50 border border-gray-700/50 hover:bg-gray-700/50 text-gray-300 hover:text-white transition-all duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex  bg-gray-900/50 border border-gray-700/50 overflow-hidden">
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    viewMode === "week"
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    viewMode === "month"
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  Month
                </button>
              </div>

              <button className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-6 py-3 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <Plus className="h-4 w-4" />
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="  bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Upcoming Events</h3>
            <p className="text-gray-400 text-sm">
              {events.length} events scheduled
            </p>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No upcoming events</p>
              <p className="text-gray-500 text-sm">
                Enroll in courses to see upcoming sessions and assignments
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-6  bg-gray-900 border border-gray-700/30 hover:border-pink-500/30 hover:bg-gray-700/30 transition-all duration-300 group ${
                    event.isImportant
                      ? "border-orange-500/50 bg-orange-500/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className="p-3 bg-gray-700/50 border border-gray-600/50 group-hover:border-pink-500/30 transition-all duration-300">
                      {getEventIcon(event.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300">
                            {event.title}
                          </h4>
                          <p className="text-gray-400 mb-4">{event.course}</p>

                          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            {event.duration && (
                              <span className="text-gray-500">
                                ({event.duration})
                              </span>
                            )}
                            {event.instructor && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{event.instructor}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                          <span
                            className={`px-4 py-2 text-xs font-medium ${getEventTypeColor(
                              event.type
                            )}`}
                          >
                            {event.type.replace("-", " ").toUpperCase()}
                          </span>

                          <div className="flex gap-3">
                            <button className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-300 hover:text-white text-sm font-medium transition-all duration-300">
                              View Details
                            </button>
                            {event.type === "live-session" && (
                              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                                Join Session
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Schedule;
