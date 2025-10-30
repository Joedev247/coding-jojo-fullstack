"use client";

import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export default function MeetInstructorsSection() {
  // Instructor data matching the screenshot
  const instructors = [
    {
      id: 1,
      name: "Daniel Thomas",
      role: "Junior Instructor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      bgColor: "bg-teal-400"
    },
    {
      id: 2,
      name: "Jennifer Patricia",
      role: "Senior Instructor", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
      bgColor: "bg-slate-800"
    },
    {
      id: 3,
      name: "Hirmar Ubunti",
      role: "Instructor",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop", 
      bgColor: "bg-blue-600"
    },
    {
      id: 4,
      name: "Lily Michelle",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      bgColor: "bg-gray-800"
    }
  ];

  return (
    <section className="relative py-12 md:py-16 bg-gray-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Left side decorative element */}
        <div className="absolute top-16 left-8">
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
            <path d="M10 10 L50 10 L50 30 L30 30 L30 50 L50 50 L50 70 L10 70 L10 50 L30 50 L30 30 L10 30 Z" fill="#E5F3FF" opacity="0.6"/>
          </svg>
        </div>
        
        {/* Right side curved line */}
        <div className="absolute top-20 right-16">
          <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
            <path d="M0 75 Q100 0 200 75" stroke="#3B82F6" strokeWidth="3" fill="none" opacity="0.3"/>
          </svg>
        </div>
        
        {/* Bottom left decorative leaf */}
        <div className="absolute bottom-16 left-16">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <path d="M10 20 Q40 5 70 20 Q40 35 10 20 Z" fill="#3B82F6" opacity="0.4"/>
          </svg>
        </div>
        
        {/* Top center decorative tree */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
            <circle cx="20" cy="12" r="4" fill="#3B82F6"/>
            <circle cx="15" cy="25" r="3" fill="#3B82F6"/>
            <circle cx="25" cy="25" r="3" fill="#3B82F6"/>
            <circle cx="10" cy="35" r="2.5" fill="#3B82F6"/>
            <circle cx="20" cy="35" r="2.5" fill="#3B82F6"/>
            <circle cx="30" cy="35" r="2.5" fill="#3B82F6"/>
            <circle cx="20" cy="45" r="2" fill="#3B82F6"/>
            <line x1="20" y1="45" x2="20" y2="55" stroke="#3B82F6" strokeWidth="2"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200  mb-4">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            <span className="text-blue-600 font-medium text-xs uppercase tracking-wider">
              OUR INSTRUCTOR
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Meet Our Expert Instructor
          </h2>
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor, index) => (
            <div key={instructor.id} className="relative group">
              {/* Instructor Card */}
              <div className="text-center">
                {/* Circular Image Container */}
                <div className="relative inline-block mb-4">
                  {/* Outer decorative circle */}
                  <div className="relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="8 8"
                        opacity="0.6"
                      />
                      {/* Connection dots */}
                      <circle cx="100" cy="15" r="3" fill="#3B82F6"/>
                      <circle cx="185" cy="100" r="3" fill="#3B82F6"/>
                      <circle cx="100" cy="185" r="3" fill="#3B82F6"/>
                      <circle cx="15" cy="100" r="3" fill="#3B82F6"/>
                    </svg>
                    
                    {/* Profile Image */}
                    <div className="relative w-70 h-70 mx-auto">
                      <div className="w-full h-full rounded-full overflow-hidden relative shadow-xl">
                        {/* Instructor Profile Image */}
                        <img
                          src={instructor.image}
                          alt={`${instructor.name} - ${instructor.role}`}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Blue Plus Button */}
                        <div className="absolute bottom-2 right-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors cursor-pointer">
                            <Plus className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-900">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">
                    {instructor.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="w-16 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}