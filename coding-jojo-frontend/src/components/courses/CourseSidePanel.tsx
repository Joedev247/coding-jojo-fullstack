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
      <div className="bg-white border border-gray-200  overflow-hidden shadow-sm">
        <div className="relative h-40">
          <img
            src={typeof course.thumbnail === "string" && course.thumbnail.trim() !== "" ? course.thumbnail : "/default-course.jpg"}
            alt={course.title}
            style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            className="object-cover w-full h-full absolute top-0 left-0"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition duration-300 cursor-pointer">
            <div className="bg-blue-600/80 backdrop-blur-sm rounded-full p-3 hover:bg-blue-600 transition duration-300 transform hover:scale-110">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute top-2 right-2">
            <button
              onClick={() => handleSaveCourse(course.id)}
              className="p-1.5 bg-white/90 hover:bg-white rounded-full transition duration-200"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  course.isSaved ? "text-blue-600 fill-blue-600" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-xl text-gray-800">
              {typeof course.price === "number"
                ? `$${course.price.toFixed(2)}`
                : course.price}
            </div>
            {course.isNew && (
              <span className="bg-blue-600 text-xs font-bold text-white px-2 py-0.5 rounded-full">
                30% OFF
              </span>
            )}
          </div>

          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5  font-medium text-sm transition duration-200 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              Enroll Now
            </button>

            <button className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2.5  font-medium text-sm transition duration-200 flex items-center justify-center">
              <Play className="w-4 h-4 mr-1.5" />
              Preview This Course
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200">
            <h4 className="text-gray-800 font-medium mb-2 text-sm">
              This course includes:
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 text-sm">
                <Clock className="w-3.5 h-3.5 text-blue-600 mr-2" />
                {course.duration} on-demand video
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <BookOpen className="w-3.5 h-3.5 text-blue-600 mr-2" />
                {course.lectures} lessons
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <Download className="w-3.5 h-3.5 text-blue-600 mr-2" />
                15 downloadable resources
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <Users className="w-3.5 h-3.5 text-blue-600 mr-2" />
                Forum access & community
              </li>
              <li className="flex items-center text-gray-600 text-sm">
                <Award className="w-3.5 h-3.5 text-blue-600 mr-2" />
                Certificate of completion
              </li>
            </ul>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 flex justify-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center text-sm">
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share This Course
            </button>
          </div>
        </div>
      </div>

      {/* Instructor Card */}
      <div className="bg-white border border-gray-200  overflow-hidden shadow-sm p-4">
        <h3 className="text-xs font-semibold text-gray-800 mb-3">
          About the Instructor
        </h3>
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
            {course.instructor && course.instructor.name
              ? course.instructor.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : 'U'}
          </div>
          <div className="ml-2.5">
            <h4 className="text-gray-800 font-medium text-sm">{course.instructor.name}</h4>
            <p className="text-gray-600 text-xs">{course.instructor.role}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50  p-2 text-center">
            <div className="text-blue-600 font-bold text-lg">12</div>
            <div className="text-gray-600 text-xs">Courses</div>
          </div>
          <div className="bg-gray-50  p-2 text-center">
            <div className="text-blue-600 font-bold text-lg">45K+</div>
            <div className="text-gray-600 text-xs">Students</div>
          </div>
          <div className="bg-gray-50  p-2 text-center">
            <div className="text-blue-600 font-bold text-lg">4.9</div>
            <div className="text-gray-600 text-xs">Rating</div>
          </div>
          <div className="bg-gray-50  p-2 text-center">
            <div className="text-blue-600 font-bold text-lg">5+</div>
            <div className="text-gray-600 text-xs">Years Exp.</div>
          </div>
        </div>
        <p className="text-gray-600 text-xs mb-3">
          Expert instructor with years of industry experience in the field.
          Passionate about teaching and helping students achieve their goals.
        </p>
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2  font-medium text-sm transition duration-200">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default CourseSidePanel;
