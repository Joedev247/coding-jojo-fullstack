"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TutorCoursesBanner() {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0">
        {/* Large Blue Blob - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full opacity-70 blur-2xl"></div>
        
        {/* Gray Blob - Center Right */}
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-gray-600 rounded-full opacity-30 blur-xl"></div>
        
        {/* Additional Blue Shape - Top Right */}
        <div className="absolute top-10 right-16 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-lg"></div>
      </div>

      {/* Decorative Blue Cross/Plus Elements */}
      <div className="absolute top-8 right-16 text-blue-400 text-lg font-bold opacity-70">+</div>
      <div className="absolute top-16 right-8 text-blue-300 text-xs font-bold opacity-60">+</div>
      <div className="absolute top-12 right-24 text-blue-500 text-sm font-bold opacity-50">+</div>
      <div className="absolute top-20 right-20 text-blue-400 text-xs font-bold opacity-40">+</div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="space-y-3 lg:space-y-4">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-600/20 border border-blue-500/30 ">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <span className="text-blue-300 font-medium text-[10px] uppercase tracking-wider">
                JOIN YOUR FAVORITE COURSES TODAY
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100">
                Courses Taught By Tutor<br />
                Around The World.
              </h2>
              
              <p className="text-gray-300 text-base md:text-sm leading-relaxed max-w-md">
                Build skills with courses, certificates, and degrees online from world-class universities and companies.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded transition-all duration-300 shadow-lg hover:shadow-xl text-sm uppercase tracking-wide"
              >
                APPLY NOW
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Content - Image Area */}
          <div className="relative flex justify-end -mr-4 sm:-mr-6 lg:-mr-8 -mt-8 -mb-8 lg:-mt-12 lg:-mb-12 lg:pr-0">
            <div className="relative w-full max-w-2xl h-[450px] lg:h-[500px]">
              {/* Decorative Elements Behind Image */}
              <div className="absolute top-12 left-8 w-20 h-20 border-4 border-blue-500/30  transform rotate-12 z-0"></div>
              <div className="absolute bottom-16 left-12 w-16 h-16 bg-blue-600/20 rounded-full blur-sm z-0"></div>
              
              {/* Professional Coding Image */}
              <div className="relative w-full h-full pr-200 lg:rounded-r-none overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop"
                  alt="Coding workspace with laptop and modern setup"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/30 via-transparent to-transparent"></div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}