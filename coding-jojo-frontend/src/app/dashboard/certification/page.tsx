"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Bell,
  User,
  Award,
  Download,
  Share2,
  Trophy,
  Star,
  CheckCircle,
  Lock,
  TrendingUp,
  Target,
  Zap,
  Medal,
  Clock,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import Sidebar from "../../../components/dashboard/Sidebar";

// Mock certification data
const earnedCertificates = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    issueDate: "March 15, 2024",
    credentialId: "WDF-2024-001234",
    instructor: "John Doe",
    skills: ["HTML", "CSS", "JavaScript"],
    image: "/certificate-badge-1.png",
    verified: true,
  },
  {
    id: 2,
    title: "Advanced React & Next.js",
    issueDate: "February 20, 2024",
    credentialId: "ARN-2024-005678",
    instructor: "Jane Smith",
    skills: ["React", "Next.js", "TypeScript"],
    image: "/certificate-badge-2.png",
    verified: true,
  },
  {
    id: 3,
    title: "UI/UX Design Mastery",
    issueDate: "January 10, 2024",
    credentialId: "UXD-2024-009012",
    instructor: "Mike Johnson",
    skills: ["Figma", "Design Systems", "User Research"],
    image: "/certificate-badge-3.png",
    verified: true,
  },
];

const inProgressCertifications = [
  {
    id: 4,
    title: "Full Stack Development",
    progress: 75,
    lessonsCompleted: 45,
    totalLessons: 60,
    estimatedCompletion: "2 weeks",
    nextMilestone: "Complete Final Project",
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    progress: 40,
    lessonsCompleted: 20,
    totalLessons: 50,
    estimatedCompletion: "1 month",
    nextMilestone: "Neural Networks Module",
  },
];

const availableCertifications = [
  {
    id: 6,
    title: "Cloud Computing with AWS",
    difficulty: "Advanced",
    duration: "8 weeks",
    lessons: 48,
    students: 12543,
    rating: 4.8,
    locked: false,
  },
  {
    id: 7,
    title: "Blockchain Development",
    difficulty: "Expert",
    duration: "12 weeks",
    lessons: 72,
    students: 8234,
    rating: 4.9,
    locked: false,
  },
  {
    id: 8,
    title: "Data Science Professional",
    difficulty: "Advanced",
    duration: "10 weeks",
    lessons: 60,
    students: 15678,
    rating: 4.7,
    locked: true,
    requirement: "Complete Machine Learning Basics",
  },
];

export default function CertificationPage() {
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"earned" | "in-progress" | "available">("earned");

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
            You need to be logged in to access certifications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Certification</h2>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 ">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <Image
                  src={user?.profilePicture || "/testimonial-avatar.jpg"}
                  alt={user?.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "Martin nel"}
                  </p>
                  <ChevronDown className="w-4 h-4 text-gray-500 inline" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Total Certificates */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600  p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-10 h-10 opacity-80" />
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                </div>
              </div>
              <h3 className="text-sm font-medium opacity-90">Total Certificates</h3>
              <p className="text-xs opacity-75 mt-1">Earned & Verified</p>
            </div>

            {/* In Progress */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600  p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-10 h-10 opacity-80" />
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
              <h3 className="text-sm font-medium opacity-90">In Progress</h3>
              <p className="text-xs opacity-75 mt-1">Keep Learning</p>
            </div>

            {/* Completion Rate */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600  p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-10 h-10 opacity-80" />
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">85%</span>
                </div>
              </div>
              <h3 className="text-sm font-medium opacity-90">Completion Rate</h3>
              <p className="text-xs opacity-75 mt-1">Above Average</p>
            </div>

            {/* Skills Earned */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600  p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-10 h-10 opacity-80" />
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold">12</span>
                </div>
              </div>
              <h3 className="text-sm font-medium opacity-90">Skills Earned</h3>
              <p className="text-xs opacity-75 mt-1">Verified Skills</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("earned")}
              className={`pb-4 px-2 text-sm font-semibold transition-colors relative ${
                activeTab === "earned"
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Earned Certificates
              {activeTab === "earned" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("in-progress")}
              className={`pb-4 px-2 text-sm font-semibold transition-colors relative ${
                activeTab === "in-progress"
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              In Progress
              {activeTab === "in-progress" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`pb-4 px-2 text-sm font-semibold transition-colors relative ${
                activeTab === "available"
                  ? "text-emerald-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Available Certifications
              {activeTab === "available" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "earned" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {earnedCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white  border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Certificate Badge */}
                  <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-8">
                    <div className="absolute top-4 right-4">
                      {cert.verified && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span className="text-xs font-semibold text-white">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Award className="w-20 h-20 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {cert.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>Issued: {cert.issueDate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>Instructor: {cert.instructor}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {cert.credentialId}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-emerald-600 text-white py-2 px-4  text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button className="bg-gray-100 text-gray-700 py-2 px-4  text-sm font-semibold hover:bg-gray-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "in-progress" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inProgressCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white  border border-gray-200 p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {cert.lessonsCompleted} of {cert.totalLessons} lessons completed
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-orange-600">
                        {cert.progress}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${cert.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50  p-3">
                      <p className="text-xs text-gray-600 mb-1">Next Milestone</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {cert.nextMilestone}
                      </p>
                    </div>
                    <div className="bg-gray-50  p-3">
                      <p className="text-xs text-gray-600 mb-1">Est. Completion</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {cert.estimatedCompletion}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3  text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "available" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {availableCertifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`bg-white  border border-gray-200 p-6 hover:shadow-lg transition-all ${
                    cert.locked ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {cert.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          cert.difficulty === "Expert"
                            ? "bg-red-100 text-red-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}>
                          {cert.difficulty}
                        </span>
                      </div>
                    </div>
                    {cert.locked && (
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{cert.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{cert.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{cert.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{cert.rating}</span>
                    </div>
                  </div>

                  {cert.locked && cert.requirement && (
                    <div className="bg-amber-50 border border-amber-200  p-3 mb-4">
                      <p className="text-xs text-amber-800">
                        <strong>Required:</strong> {cert.requirement}
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    disabled={cert.locked}
                    className={`w-full py-3  text-sm font-semibold transition-all ${
                      cert.locked
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700"
                    }`}
                  >
                    {cert.locked ? "Locked" : "Start Learning"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

