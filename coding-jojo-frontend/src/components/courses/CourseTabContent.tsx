import React from "react";
import Image from "next/image";
import {
  CheckCircle,
  Clock,
  Lock,
  PlayCircle,
  FileText,
  Award,
} from "lucide-react";

interface Lecture {
  id: string;
  title: string;
  description: string;
  duration: string;
  isFree: boolean;
  type: "video" | "document" | "certificate";
}

interface CourseTabContentProps {
  activeTab: string;
  lectures?: Lecture[];
  courseDescription?: string;
  courseRequirements?: string[];
}

// Mock data for lectures if needed
const mockLectures: Lecture[] = [
  {
    id: "1",
    title: "Introduction to the Course",
    description: "Overview of what we will cover in this course",
    duration: "12:00",
    isFree: true,
    type: "video",
  },
  {
    id: "2",
    title: "Setting Up Your Development Environment",
    description: "How to set up all the tools needed for this course",
    duration: "24:30",
    isFree: true,
    type: "video",
  },
  {
    id: "3",
    title: "Course Resources and Downloads",
    description: "All the files and resources you need to follow along",
    duration: "05:15",
    isFree: true,
    type: "document",
  },
  {
    id: "4",
    title: "Core Concepts",
    description: "Understanding the fundamentals before we dive deep",
    duration: "38:20",
    isFree: false,
    type: "video",
  },
  {
    id: "5",
    title: "Building Your First Project",
    description: "Step by step guide to create your first complete project",
    duration: "55:45",
    isFree: false,
    type: "video",
  },
  {
    id: "6",
    title: "Project Resources",
    description: "Download the starter and completed project files",
    duration: "03:10",
    isFree: false,
    type: "document",
  },
  {
    id: "7",
    title: "Advanced Techniques",
    description: "Taking your skills to the next level",
    duration: "42:15",
    isFree: false,
    type: "video",
  },
  {
    id: "8",
    title: "Final Project",
    description: "Create a complete production-ready application",
    duration: "1:12:30",
    isFree: false,
    type: "video",
  },
  {
    id: "9",
    title: "Course Completion Certificate",
    description: "Download your course completion certificate",
    duration: "01:00",
    isFree: false,
    type: "certificate",
  },
];

// Mock course requirements
const mockRequirements = [
  "Basic understanding of programming concepts",
  "A computer with at least 8GB RAM and 100GB free disk space",
  "Willingness to learn and practice regularly",
  "Internet connection for downloading course materials",
];

const CourseTabContent: React.FC<CourseTabContentProps> = ({
  activeTab,
  lectures = mockLectures,
  courseDescription = "This comprehensive course takes you from beginner to advanced level. You'll learn through practical projects and gain valuable skills that can be applied immediately in real-world scenarios.",
  courseRequirements = mockRequirements,
}) => {
  // Define the ratings percentages object with proper typing
  const percentages: { [key: number]: number } = {
    5: 78,
    4: 16,
    3: 4,
    2: 1,
    1: 1,
  };

  return (
    <div className="bg-white border border-gray-200  p-4 mt-4">
      {activeTab === "overview" && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              About This Course
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">{courseDescription}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              What You&apos;ll Learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Master all core concepts",
                "Build real-world projects",
                "Understand advanced patterns",
                "Deploy applications to production",
                "Optimize for performance",
                "Write clean, maintainable code",
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Requirements
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
              {courseRequirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Who This Course Is For
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
              <li>Beginners looking to gain practical skills</li>
              <li>Intermediate developers wanting to level up</li>
              <li>Professionals transitioning to a new technology stack</li>
              <li>Anyone who wants to build real-world projects</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "curriculum" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Course Curriculum
            </h3>
            <div className="text-sm text-gray-600">
              <span className="text-blue-600 font-medium">9 lectures</span> • 4h
              15m total length
            </div>
          </div>

          <div className="space-y-3">
            {/* Section 1 */}
            <div className="border border-gray-200  overflow-hidden">
              <div className="bg-gray-50 px-3 py-2 flex justify-between items-center">
                <div className="font-medium text-gray-800 text-sm">Getting Started</div>
                <div className="text-sm text-gray-600">3 lectures • 41:45</div>
              </div>
              <div className="divide-y divide-gray-100">
                {lectures.slice(0, 3).map((lecture) => (
                  <div
                    key={lecture.id}
                    className="px-3 py-2.5 hover:bg-gray-50 flex items-center justify-between transition duration-200"
                  >
                    <div className="flex items-center">
                      {lecture.type === "video" ? (
                        <PlayCircle className="w-4 h-4 text-blue-600 mr-2.5 flex-shrink-0" />
                      ) : lecture.type === "document" ? (
                        <FileText className="w-4 h-4 text-indigo-600 mr-2.5 flex-shrink-0" />
                      ) : (
                        <Award className="w-4 h-4 text-yellow-500 mr-2.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-gray-700 font-medium text-sm">
                          {lecture.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lecture.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lecture.isFree && (
                        <span className="text-xs text-blue-600 font-medium bg-blue-100 px-1.5 py-0.5 rounded mr-2">
                          FREE
                        </span>
                      )}
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {lecture.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2 */}
            <div className="border border-gray-800  overflow-hidden">
              <div className="bg-gray-800/70 px-4 py-3 flex justify-between items-center">
                <div className="font-medium text-white">Core Concepts</div>
                <div className="text-sm text-gray-400">
                  3 lectures • 1h 37:15
                </div>
              </div>
              <div className="divide-y divide-gray-800">
                {lectures.slice(3, 6).map((lecture) => (
                  <div
                    key={lecture.id}
                    className="px-4 py-3 hover:bg-gray-800/30 flex items-center justify-between transition duration-200"
                  >
                    <div className="flex items-center">
                      {lecture.type === "video" ? (
                        <PlayCircle className="w-5 h-5 text-pink-400 mr-3 flex-shrink-0" />
                      ) : lecture.type === "document" ? (
                        <FileText className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      ) : (
                        <Award className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-gray-200 font-medium">
                          {lecture.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lecture.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lecture.isFree && (
                        <span className="text-xs text-blue-400 font-medium bg-blue-900/30 px-2 py-1 rounded mr-3">
                          FREE
                        </span>
                      )}
                      {!lecture.isFree && (
                        <Lock className="w-3.5 h-3.5 text-gray-500 mr-3" />
                      )}
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {lecture.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="border border-gray-800  overflow-hidden">
              <div className="bg-gray-800/70 px-4 py-3 flex justify-between items-center">
                <div className="font-medium text-white">
                  Advanced Topics & Completion
                </div>
                <div className="text-sm text-gray-400">
                  3 lectures • 1h 55:45
                </div>
              </div>
              <div className="divide-y divide-gray-800">
                {lectures.slice(6, 9).map((lecture) => (
                  <div
                    key={lecture.id}
                    className="px-4 py-3 hover:bg-gray-800/30 flex items-center justify-between transition duration-200"
                  >
                    <div className="flex items-center">
                      {lecture.type === "video" ? (
                        <PlayCircle className="w-5 h-5 text-pink-400 mr-3 flex-shrink-0" />
                      ) : lecture.type === "document" ? (
                        <FileText className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                      ) : (
                        <Award className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-gray-200 font-medium">
                          {lecture.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {lecture.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lecture.isFree && (
                        <span className="text-xs text-blue-400 font-medium bg-blue-900/30 px-2 py-1 rounded mr-3">
                          FREE
                        </span>
                      )}
                      {!lecture.isFree && (
                        <Lock className="w-3.5 h-3.5 text-gray-500 mr-3" />
                      )}
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {lecture.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="bg-gray-800/70  p-6 flex flex-col items-center justify-center flex-grow md:flex-grow-0">
              <div className="text-5xl font-bold text-white mb-1">4.8</div>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400 fill-yellow-400 opacity-50"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="text-gray-400 text-sm">Course Rating</div>
            </div>

            <div className="flex-grow">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  return (
                    <div key={rating} className="flex items-center">
                      <div className="w-12 text-gray-400 text-sm flex items-center">
                        <span>{rating}</span>
                        <svg
                          className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div className="flex-grow mx-3 h-2 rounded-full bg-gray-700">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"
                          style={{ width: `${percentages[rating]}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right text-gray-400 text-sm">
                        {percentages[rating]}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Reviews list */}
            {[
              {
                name: "Jennifer K.",
                avatar: "https://api.placeholderapi.com/150",
                rating: 5,
                date: "3 weeks ago",
                comment:
                  "Absolutely the best course I've taken on this subject! The instructor explains complex topics in a way that's easy to understand, and the projects are incredibly practical. I've already applied what I've learned to my work.",
              },
              {
                name: "Michael T.",
                avatar: "https://api.placeholderapi.com/150",
                rating: 4,
                date: "1 month ago",
                comment:
                  "Great course with in-depth content. The only reason I'm giving 4 stars instead of 5 is that some sections could use more practical examples. Otherwise, it's excellent and I learned a lot.",
              },
              {
                name: "Sarah D.",
                avatar: "https://api.placeholderapi.com/150",
                rating: 5,
                date: "2 months ago",
                comment:
                  "This course exceeded my expectations! The instructor is knowledgeable and explains concepts clearly. The course projects are challenging but achievable, and I feel much more confident in my skills now.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="border border-gray-800  p-5"
              >
                <div className="flex items-start">
                  <div className="relative w-10 h-10 mr-4">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{review.name}</h4>
                      <span className="text-gray-500 text-sm">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          }`}
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 mt-3">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-6">
              <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium px-6 py-2.5  flex items-center transition duration-200">
                Load more reviews
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTabContent;
