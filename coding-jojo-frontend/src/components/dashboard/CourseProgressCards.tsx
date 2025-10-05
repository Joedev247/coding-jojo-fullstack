import React from "react";
import { Play, BookOpen } from "lucide-react";
import ProgressBar from "../ui/ProgressBar";
import Button from "../ui/button";

interface Course {
  id: string;
  title: string;
  progress: number;
  lastChapter: string;
  category: string;
  thumbnail: string;
  lastAccessed: string;
}

interface CourseProgressCardsProps {
  courses: Course[];
}

const CourseProgressCards: React.FC<CourseProgressCardsProps> = ({
  courses,
}) => {
  // Only display the most recently accessed courses (top 3)
  const recentCourses = courses.slice(0, 3);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
        <Button variant="ghost" size="sm">
          View All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col h-full  bg-gray-900 hover:bg-gray-750 transition-colors p-5"
          >
            <div className="relative h-32 mb-4 -mx-5 -mt-5 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-xs px-2 py-1 text-gray-300">
                {course.category}
              </div>
            </div>

            <h3 className="text-white font-medium mb-2 line-clamp-2">
              {course.title}
            </h3>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-medium text-purple-400">
                  {course.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-gray-400 flex items-center mb-4">
              <BookOpen className="h-4 w-4 mr-1 text-gray-500" />
              <span>Last: {course.lastChapter}</span>
            </div>

            <div className="mt-auto">
              <Button variant="primary" className="w-full">
                <Play className="h-4 w-4 mr-1" />
                Continue
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseProgressCards;
