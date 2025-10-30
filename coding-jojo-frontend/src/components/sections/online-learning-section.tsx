"use client";

import React from "react";
import { ArrowRight, CheckCircle, Mic, Phone, Video, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OnlineLearningSection() {
  return (
    <section className="relative py-8 md:py-12 bg-white overflow-hidden">
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 opacity-15">
        <svg className="absolute top-0 right-0 w-64 h-64" viewBox="0 0 400 400" fill="none">
          <path d="M50 50 Q200 100 350 50" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
          <path d="M100 150 Q250 200 400 150" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
          <path d="M0 250 Q150 300 300 250" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-3">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 ">
              <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              <span className="text-blue-600 font-medium text-[10px] uppercase tracking-wider">
                JOIN IN YOUR LIVE COURSE TODAY
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Online Learning Courses<br />
                Designed For Real Life
              </h2>
              
              <p className="text-gray-600 text-base leading-relaxed max-w-md">
                Synergistically integrate orthogonal synergy rather than visionary expertise.
                Credibly supply bleeding-edge deliverables after robust action items generate
                principle centered
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-base font-medium">
                  Easy Online Learning Platform
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-base font-medium">
                  98% Course Completion Rates
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-base font-medium">
                  Friendly Environments & Teachers
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded transition-all duration-300 shadow-lg hover:shadow-xl text-xs uppercase tracking-wide"
              >
                EXPLORE OUR COURSES
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Student Stats */}
            <div className="pt-3">
              <p className="text-gray-600 text-xs font-medium mb-2">56k+ Enrolled Students</p>
              <div className="flex items-center gap-1">
                {/* Student Avatars */}
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-red-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">A</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">B</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">C</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">D</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">E</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">F</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">G</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">H</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                    <span className="text-gray-600 text-[8px] font-bold">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Video Interface */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Video Interface */}
              <div className="relative w-150 h-100 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden shadow-xl">
                {/* Video Content - Teacher */}
                <div className="relative w-full h-full">
                  {/* Online Learning Video Class Image */}
                  <img
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=800&auto=format&fit=crop"
                    alt="Online learning video class - Teacher presenting"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay for better contrast with controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Video Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-5">
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Mic className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Phone className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Video className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Class Interface Label */}
              <div className="absolute -bottom-15 left-1/2 transform -translate-x-1/2">
                <div className="bg-white px-3 py-5  shadow-md border">
                  <p className="text-gray-900 font-semibold text-base text-center">Video Class Interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}