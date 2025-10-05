"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LearnCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Course Learning Page</h1>
        <p className="text-gray-400 mb-8">
          This is a placeholder for the course learning page for course ID: <span className="text-pink-400">{courseId}</span>
        </p>
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 ">
          <h2 className="text-xl font-semibold text-white mb-4">Coming Soon!</h2>
          <p className="text-gray-400 mb-6">
            The course learning interface is under development. This will include video lessons, 
            interactive exercises, quizzes, and progress tracking.
          </p>
          <Link 
            href="/dashboard/courses"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium  transition-all duration-300"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
