"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, Download, Share2 } from 'lucide-react';

export default function CertificatePage() {
  const params = useParams();
  const courseId = params.courseId as string;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Course Certificate</h1>
          <p className="text-gray-400">
            Certificate for course ID: <span className="text-pink-400">{courseId}</span>
          </p>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 p-8 ">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8  mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">Certificate of Completion</h2>
              <p className="text-black/80">This is a placeholder certificate</p>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-4">Coming Soon!</h3>
            <p className="text-gray-400 mb-6">
              The certificate system is under development. Once implemented, you'll be able to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800/50 p-4 ">
                <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">View Certificate</h4>
                <p className="text-gray-400 text-sm">View your achievement certificate</p>
              </div>
              <div className="bg-gray-800/50 p-4 ">
                <Download className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">Download PDF</h4>
                <p className="text-gray-400 text-sm">Download as PDF file</p>
              </div>
              <div className="bg-gray-800/50 p-4 ">
                <Share2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h4 className="text-white font-medium mb-1">Share Achievement</h4>
                <p className="text-gray-400 text-sm">Share on social media</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/dashboard/courses"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-medium  transition-all duration-300 mr-4"
            >
              ← Back to Courses
            </Link>
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-gray-700/50 hover:bg-gray-600 text-white font-medium  transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
