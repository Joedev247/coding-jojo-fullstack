"use client";

import React, { useState } from "react";
import {
  Play,
  Clock,
  Users,
  Star,
  MoreHorizontal,
  BookOpen,
  Download,
  Heart,
  Share2,
  Calendar,
  Filter,
  Search,
  Grid,
  List,
} from "lucide-react";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  progress: number;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  status: "enrolled" | "completed" | "paused";
  lastAccessed?: string;
  rating?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  category?: string;
}

interface EnrolledCoursesListProps {
  courses: Course[];
  onContinue: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
}

export default function EnrolledCoursesList({
  courses,
  onContinue,
  onViewDetails,
}: EnrolledCoursesListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "enrolled" | "completed" | "paused"
  >("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "paused":
        return "bg-yellow-500/20 text-yellow-400";
      case "enrolled":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Courses</h2>
          <p className="text-gray-400">
            Manage and continue your learning journey
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2  bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-colors w-64"
            />
          </div>

          {/* Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-gray-800/50 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="enrolled">Enrolled</option>
            <option value="completed">Completed</option>
            <option value="paused">Paused</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex  bg-gray-900/50 p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? "bg-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? "bg-pink-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredCourses.map((course) => (
          <div key={course.id}>
            {viewMode === "list" ? (
              // List View
              <div className="group   bg-gray-900/50 backdrop-blur-sm p-6 hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex items-center gap-6">
                  {/* Course Thumbnail */}
                  <div className="relative w-24 h-24 overflow-hidden flex-shrink-0">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 ml-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium ${getStatusColor(
                            course.status
                          )}`}
                        >
                          {course.status.charAt(0).toUpperCase() +
                            course.status.slice(1)}
                        </span>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.instructor.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      {course.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-yellow-400">
                            {course.rating}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-1">
                        <div className="w-full bg-gray-700 h-2">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm font-medium w-12">
                        {course.progress}%
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onContinue(course.id)}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium px-4 py-2 transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="h-4 w-4" />
                        {course.progress > 0 ? "Continue" : "Start"}
                      </button>

                      <button
                        onClick={() => onViewDetails(course.id)}
                        className="px-4 py-2  bg-gray-900/50 hover:bg-gray-700/50 text-gray-300 hover:text-white font-medium transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Grid View
              <div className="group   bg-gray-900/50 backdrop-blur-sm overflow-hidden hover:bg-gray-800/50 transition-all duration-300">
                {/* Course Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium ${getStatusColor(
                        course.status
                      )}`}
                    >
                      {course.status.charAt(0).toUpperCase() +
                        course.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-pink-400 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm text-gray-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onContinue(course.id)}
                    className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white font-medium py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    {course.progress > 0 ? "Continue Learning" : "Start Course"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
