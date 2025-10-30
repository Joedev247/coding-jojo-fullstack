"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle, Users, BookOpen, Award } from "lucide-react";

export default function About() {
  return (
    <>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .experience-badge {
          animation: pulse 2s ease-in-out infinite, glow 3s ease-in-out infinite;
        }
        
        .badge-border {
          animation: rotate 8s linear infinite;
        }
        
        .badge-text {
          animation: blink 2s ease-in-out infinite;
        }
      `}</style>
      <div className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Images */}
          <div className="relative">
            <div className="relative">
              {/* Main Large Image */}
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Students studying in library"
                  width={300}
                  height={300}
                  className="w-100 h-70 object-cover shadow-lg"
                />
              </div>
              
              {/* Smaller Overlapping Image - Better positioned */}
              <div className="absolute top-30 right-8 w-70 h-50 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Student with laptop"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover shadow-xl border-6 border-white"
                />
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute bottom-30 right-35 z-20">
              <div className="experience-badge w-24 h-24 bg-blue-600 rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white relative">
                <div className="badge-text text-white text-center">
                  <div className="text-lg font-bold">25+</div>
                  <div className="text-[9px] font-medium">YEARS</div>
                  <div className="text-[9px] font-medium">EXPERIENCE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <BookOpen className="w-2.5 h-2.5 text-blue-600" />
              <span className="text-blue-600 font-semibold text-[10px] uppercase tracking-wide">
                GET TO KNOW ABOUT US
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Dive into our Online Courses and Ignite Your Learning!
              </h2>
              
              <p className="text-gray-600 text-base leading-relaxed max-w-lg">
                Collaboratively simplify user friendly networks after principle centered coordinate effective 
                methods of empowerment distributed niche markets pursue market positioning web-readiness 
                after resource sucking applications.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-base font-medium">
                  Dramatically re-engineer value added systems via mission
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-base font-medium">
                  Access more then 100K online courses
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 text-base font-medium">
                  Learn the high-impact skills that top companies want
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}