"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import Badge from "../ui/Badge";
import { Search, Bookmark, CheckCircle, Clock, Heart } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  avatar: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  instructor: Instructor;
  rating: number;
  totalStudents: number;
  isWishlisted: boolean;
  status: "not-enrolled" | "enrolled" | "completed";
  progress?: number;
}

interface CourseLibraryProps {
  enrolledCourses: Course[];
  completedCourses: Course[];
  wishlistedCourses: Course[];
  recommendedCourses: Course[];
}

const CourseLibrary: React.FC<CourseLibraryProps> = ({
  enrolledCourses,
  completedCourses,
  wishlistedCourses,
  recommendedCourses,
}) => {
  const [activeTab, setActiveTab] = useState<string>("enrolled");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getCoursesForTab = () => {
    switch (activeTab) {
      case "enrolled":
        return enrolledCourses;
      case "completed":
        return completedCourses;
      case "wishlisted":
        return wishlistedCourses;
      case "recommended":
        return recommendedCourses;
      default:
        return enrolledCourses;
    }
  };

  const filteredCourses = getCoursesForTab().filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return <Badge variant="success">Beginner</Badge>;
      case "intermediate":
        return <Badge variant="warning">Intermediate</Badge>;
      case "advanced":
        return <Badge>Advanced</Badge>;
      default:
        return null;
    }
  };

  const getCourseActionButton = (course: Course) => {
    switch (course.status) {
      case "not-enrolled":
        return (
          <Button variant="primary" size="sm">
            Enroll Now
          </Button>
        );
      case "enrolled":
        return (
          <Button variant="primary" size="sm">
            <Clock className="h-4 w-4 mr-1" />
            Continue
          </Button>
        );
      case "completed":
        return (
          <Button variant="secondary" size="sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Review
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full  bg-gray-900 py-2 pl-10 pr-4 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <Search className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Button
            variant={activeTab === "enrolled" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("enrolled")}
          >
            Enrolled
          </Button>
          <Button
            variant={activeTab === "completed" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
          <Button
            variant={activeTab === "wishlisted" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("wishlisted")}
          >
            Wishlist
          </Button>
          <Button
            variant={activeTab === "recommended" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("recommended")}
          >
            Recommended
          </Button>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="py-12  bg-gray-900">
          <div className="text-center">
            <Bookmark className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              {searchQuery
                ? `No courses matching "${searchQuery}" found in ${activeTab} courses.`
                : `You don't have any ${activeTab} courses yet.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col h-full  bg-gray-900 hover:bg-gray-750 transition-colors p-5"
            >
              <div className="relative">
                <div className="h-40 -mx-5 -mt-5 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                </div>

                <div className="absolute top-2 right-2">
                  <button className="p-1.5   bg-gray-900/80 backdrop-blur-sm">
                    <Heart
                      className={`h-5 w-5 ${
                        course.isWishlisted
                          ? "text-red-500 fill-red-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                </div>

                <div className="absolute bottom-2 left-2 flex space-x-2">
                  <Badge>{course.category}</Badge>
                  {getDifficultyBadge(course.difficulty)}
                </div>
              </div>

              <div className="flex-1 mt-4">
                <h3 className="text-white font-medium mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center text-xs text-gray-400 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="h-5 w-5 mr-2"
                  />
                  <span>{course.instructor.name}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>

                {course.progress !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-purple-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <div className="flex">
                    {"★"
                      .repeat(Math.floor(course.rating))
                      .split("")
                      .map((star, i) => (
                        <span key={i} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                    {"☆"
                      .repeat(5 - Math.floor(course.rating))
                      .split("")
                      .map((star, i) => (
                        <span key={i} className="text-gray-600 text-sm">
                          ☆
                        </span>
                      ))}
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    ({course.totalStudents})
                  </span>
                </div>

                {getCourseActionButton(course)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLibrary;
