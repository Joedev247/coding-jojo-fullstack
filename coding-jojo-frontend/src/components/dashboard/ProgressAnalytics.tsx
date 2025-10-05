import React from "react";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";
import { CheckCircle, Clock, BarChart3 } from "lucide-react";

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  chaptersCompleted: number;
  totalChapters: number;
  lastActivity: string;
}

interface QuizScore {
  id: string;
  title: string;
  score: number;
  maxScore: number;
  date: string;
  course: string;
}

interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  course: string;
  credentialUrl: string;
}

interface ProgressAnalyticsProps {
  courseProgresses: CourseProgress[];
  quizScores: QuizScore[];
  certificates: Certificate[];
  streakDays: number;
  totalLearningTime: number;
  completionRate: number;
}

const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({
  courseProgresses,
  quizScores,
  certificates,
  streakDays,
  totalLearningTime,
  completionRate,
}) => {
  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center p-6  bg-gray-900">
          <div className="p-3 bg-purple-500/20 mr-4">
            <BarChart3 className="h-8 w-8 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Completion Rate</p>
            <p className="text-2xl font-bold text-white">{completionRate}%</p>
          </div>
        </div>

        <div className="flex items-center p-6  bg-gray-900">
          <div className="p-3 bg-yellow-500/20 mr-4">
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Learning Time</p>
            <p className="text-2xl font-bold text-white">
              {totalLearningTime}h
            </p>
          </div>
        </div>

        <div className="flex items-center p-6  bg-gray-900">
          <div className="p-3 bg-green-500/20 mr-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Learning Streak</p>
            <p className="text-2xl font-bold text-white">{streakDays} days</p>
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="p-6  bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Course Progress</h2>
          <div className="px-3 py-1 bg-gray-700 text-gray-300 text-sm">
            {Math.round(
              courseProgresses.reduce(
                (total, course) => total + course.progress,
                0
              ) / courseProgresses.length
            )}
            % Avg
          </div>
        </div>

        <div className="space-y-6">
          {courseProgresses.map((course) => (
            <div key={course.id}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-white">
                  {course.title}
                </h3>
                <div className="text-xs text-gray-400">
                  {course.chaptersCompleted}/{course.totalChapters} chapters
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1 mr-4">
                  <div className="w-full h-2 bg-gray-700">
                    <div
                      className={`h-full ${
                        course.progress === 100
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="w-16 text-center">
                  <span
                    className={`text-sm font-medium ${
                      course.progress === 100
                        ? "text-green-400"
                        : "text-purple-400"
                    }`}
                  >
                    {course.progress}%
                  </span>
                </div>
              </div>

              <div className="mt-1 text-xs text-gray-400">
                Last activity: {course.lastActivity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Scores */}
      <div className="p-6  bg-gray-900">
        <h2 className="text-lg font-semibold text-white mb-6">
          Quiz & Test Scores
        </h2>

        <div className="space-y-4">
          {quizScores.map((quiz) => (
            <div key={quiz.id} className="p-4 bg-gray-750">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{quiz.course}</p>
                </div>

                <div className="mt-2 md:mt-0 flex items-center">
                  <div className="w-20 h-20 relative mr-3">
                    <svg
                      className="w-20 h-20 transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={`${
                          quiz.score / quiz.maxScore >= 0.75
                            ? "text-green-500"
                            : quiz.score / quiz.maxScore >= 0.5
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                        strokeWidth="8"
                        strokeDasharray={`${
                          (quiz.score / quiz.maxScore) * 251.2
                        } 251.2`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {Math.round((quiz.score / quiz.maxScore) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-white">
                      Score:{" "}
                      <span className="font-medium">
                        {quiz.score}/{quiz.maxScore}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{quiz.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="p-6  bg-gray-900">
        <h2 className="text-lg font-semibold text-white mb-6">
          Certifications Earned
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30"
            >
              <div className="flex items-start">
                <div className="p-2 bg-purple-500/20 mr-3">
                  <CheckCircle className="h-8 w-8 text-purple-400" />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{cert.course}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Issued: {cert.issueDate}
                  </p>

                  <div className="mt-3 flex space-x-2">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      View Certificate
                    </a>
                    <span className="text-gray-600">|</span>
                    <a
                      href="#"
                      className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;
