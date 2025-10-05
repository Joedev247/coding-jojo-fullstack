import React from "react";
import {
  Play,
  ShoppingCart,
  Download,
  Users,
  Clock,
  BookOpen,
  Award,
  Share2,
  Heart,
} from "lucide-react";
import { Course } from "../../types/courses";

interface CourseSidePanelProps {
  course: Course;
  handleSaveCourse: (id: string) => void;
}

const CourseSidePanel: React.FC<CourseSidePanelProps> = ({
  course,
  handleSaveCourse,
}) => {
  return (
    <div className="lg:sticky lg:top-6 space-y-6">
      {/* Course Preview Card */}
      <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800  overflow-hidden shadow-xl">
        <div className="relative h-48">
          <img
            src={typeof course.thumbnail === "string" && course.thumbnail.trim() !== "" ? course.thumbnail : "/default-course.jpg"}
            alt={course.title}
            style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            className="object-cover w-full h-full absolute top-0 left-0"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition duration-300 cursor-pointer">
            <div className="bg-pink-500/30 backdrop-blur-sm rounded-full p-4 hover:bg-pink-500/50 transition duration-300 transform hover:scale-110">
              <Play className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <button
              onClick={() => handleSaveCourse(course.id)}
              className="p-2   bg-gray-900/70 hover:bg-gray-800 rounded-full transition duration-200"
            >
              <Heart
                className={`w-4 h-4 ${
                  course.isSaved ? "text-pink-500 fill-pink-500" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-2xl text-white">
              {typeof course.price === "number"
                ? `$${course.price.toFixed(2)}`
                : course.price}
            </div>
            {course.isNew && (
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-xs font-bold text-white px-2.5 py-1 rounded-full">
                30% OFF
              </span>
            )}
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white py-3  font-medium transition duration-200 flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Enroll Now
            </button>

            <button className="w-full  bg-gray-900 hover:bg-gray-700 border border-gray-700 text-white py-3  font-medium transition duration-200 flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Preview This Course
            </button>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-800">
            <h4 className="text-white font-medium mb-3">
              This course includes:
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 text-pink-400 mr-3" />
                {course.duration} on-demand video
              </li>
              <li className="flex items-center text-gray-300">
                <BookOpen className="w-4 h-4 text-pink-400 mr-3" />
                {course.lectures} lessons
              </li>
              <li className="flex items-center text-gray-300">
                <Download className="w-4 h-4 text-pink-400 mr-3" />
                15 downloadable resources
              </li>
              <li className="flex items-center text-gray-300">
                <Users className="w-4 h-4 text-pink-400 mr-3" />
                Forum access & community
              </li>
              <li className="flex items-center text-gray-300">
                <Award className="w-4 h-4 text-pink-400 mr-3" />
                Certificate of completion
              </li>
            </ul>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-800 flex justify-center">
            <button className="text-pink-400 hover:text-pink-300 font-medium flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share This Course
            </button>
          </div>
        </div>
      </div>

      {/* Instructor Card */}
      <div className="  bg-gray-900/50 backdrop-blur-sm border border-gray-800  overflow-hidden shadow-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          About the Instructor
        </h3>
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-500 text-white font-bold text-2xl border-2 border-pink-500">
            {course.instructor && course.instructor.name
              ? course.instructor.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'U'}
          </div>
          <div className="ml-3">
            <h4 className="text-white font-medium">{course.instructor.name}</h4>
            <p className="text-gray-400 text-sm">{course.instructor.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-800/70 rounded p-3 text-center">
            <div className="text-pink-400 font-bold text-xl">12</div>
            <div className="text-gray-400 text-sm">Courses</div>
          </div>
          <div className="bg-gray-800/70 rounded p-3 text-center">
            <div className="text-pink-400 font-bold text-xl">45K+</div>
            <div className="text-gray-400 text-sm">Students</div>
          </div>
          <div className="bg-gray-800/70 rounded p-3 text-center">
            <div className="text-pink-400 font-bold text-xl">4.9</div>
            <div className="text-gray-400 text-sm">Rating</div>
          </div>
          <div className="bg-gray-800/70 rounded p-3 text-center">
            <div className="text-pink-400 font-bold text-xl">5+</div>
            <div className="text-gray-400 text-sm">Years Exp.</div>
          </div>
        </div>
        <p className="text-gray-300 text-sm">
          Expert instructor with years of industry experience in the field.
          Passionate about teaching and helping students achieve their goals.
        </p>
        <button className="w-full mt-4  bg-gray-900 hover:bg-gray-700 text-white py-2  font-medium transition duration-200">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default CourseSidePanel;
