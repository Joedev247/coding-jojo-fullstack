"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen,
  DollarSign,
  Clock,
  MessageCircle,
  Award,
  Star,
  GraduationCap,
  Monitor,
  Zap,
  Target,
  Brain,
  Globe,
  FileText,
} from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative overflow-hidden py-16 md:py-24 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 relative z-10">
              <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-[500px] bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-200/40 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-300/20 rounded-full blur-md animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Programming/Coding SVGs - Professional Animations */}
        <div className="absolute top-32 left-1/4 animate-float" style={{animationDelay: '0.5s'}}>
          <div className="w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-10 h-10 animate-sparkle" viewBox="0 0 24 24" fill="none">
              <path d="M13.325 3.05L8.667 20.432c-.171.635.814.635.645 0L13.97 3.05c.171-.635-.814-.635-.645 0z" fill="#3B82F6"/>
              <path d="M7.612 6.61L2.98 12l4.632 5.39c.426.496-.426 1.114-.852.618L1.426 12.618c-.341-.398-.341-1.238 0-1.636l5.334-6.39c.426-.496 1.278.122.852.618z" fill="#3B82F6"/>
              <path d="M16.388 6.61L21.02 12l-4.632 5.39c-.426.496.426 1.114.852.618l5.334-5.39c.341-.398.341-1.238 0-1.636l-5.334-6.39c-.426-.496-1.278.122-.852.618z" fill="#3B82F6"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute right-1/3 animate-float" style={{animationDelay: '1.2s'}}>
          <div className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-8 h-8 animate-sparkle" style={{animationDelay: '0.3s'}} viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#10B981"/>
              <path d="M10 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-56 left-16 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-18 h-18  shadow-full flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-12 h-12 animate-sparkle" style={{animationDelay: '0.6s'}} viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" fill="#8B5CF6"/>
              <circle cx="6" cy="7" r="1" fill="#A855F7"/>
              <circle cx="6" cy="12" r="1" fill="#A855F7"/>
              <circle cx="6" cy="17" r="1" fill="#A855F7"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-48 right-12 animate-float" style={{animationDelay: '0.8s'}}>
          <div className="w-15 h-15 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-9 h-9 animate-sparkle" style={{animationDelay: '0.9s'}} viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="#EF4444"/>
              <path d="M19 15L19.5 17L22 17.5L19.5 18L19 20L18.5 18L16 17.5L18.5 17L19 15Z" fill="#F97316"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-72 right-1/4 animate-float" style={{animationDelay: '1.5s'}}>
          <div className="w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-10 h-10 animate-sparkle" style={{animationDelay: '1.2s'}} viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 6v6l4 2" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-80 left-8 animate-float" style={{animationDelay: '0.3s'}}>
          <div className="w-13 h-13 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-7 h-7 animate-sparkle" style={{animationDelay: '1.5s'}} viewBox="0 0 24 24" fill="none">
              <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" fill="#06B6D4"/>
              <path d="M8 8h8v2H8zm0 4h8v2H8zm0 4h5v2H8z" fill="#0891B2"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-20 right-1/4 animate-float" style={{animationDelay: '2.2s'}}>
          <div className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-8 h-8 animate-sparkle" style={{animationDelay: '0.8s'}} viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#EC4899"/>
              <path d="M12 7v10M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-40 right-8 animate-float" style={{animationDelay: '1.8s'}}>
          <div className="w-15 h-15 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pop">
            <svg className="w-9 h-9 animate-sparkle" style={{animationDelay: '1.1s'}} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="#7C3AED"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" fill="#A855F7"/>
            </svg>
          </div>
        </div>
        
        {/* Dotted pattern */}
        <div className="absolute bottom-32 right-1/3">
          <div className="grid grid-cols-6 gap-2">
            {Array(24).fill(0).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
              <ArrowRight className="w-3 h-3 text-red-500" />
              <span className="text-red-600 font-semibold text-xs uppercase tracking-wide">
                ONLINE E-LEARNING COURSE
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <span className="text-gray-900">Online </span>
                <span className="text-blue-600">Education</span>
                <br />
                <span className="text-gray-900">Feels Like Real Classroom</span>
              </h1>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-sm">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-blue-700 font-medium">Get Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 text-sm">
                <Award className="w-4 h-4 text-red-600" />
                <span className="text-red-700 font-medium">Gain Job-ready Skills</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 text-sm">
                <Star className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 font-medium">Great Life</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                href="/courses"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-sm  shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                GET STARTED
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded font-semibold text-sm  shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                OUR COURSES
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>


          </div>

          {/* Right Content - Woman with Books */}
          <div className="relative lg:pl-8">
            <div className="relative flex justify-center">
              {/* Blue Circle Background - Smooth Animations */}
              <div className="absolute top-8 right-0 w-[450px] h-[450px] bg-blue-600 rounded-full -z-10 border-8 border-blue-700 animate-float shadow-2xl"></div>
              <div className="absolute top-12 right-4 w-[440px] h-[440px] bg-blue-500/30 rounded-full -z-20 animate-slow-pulse"></div>
              <div className="absolute top-6 right-2 w-[460px] h-[460px] bg-blue-400/20 rounded-full -z-30 animate-ripple"></div>
              <div className="absolute top-10 right-1 w-[470px] h-[470px] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-full -z-40 animate-float" style={{animationDelay: '1s'}}></div>
              
              {/* Main Image - Made Bigger */}
              <div className="relative z-10 max-w-lg">
                <Image
                  src="/images/instructor/student.png"
                  alt="Student with books"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover scale-170"
                  priority
                />
                
                {/* Stats Cards Overlay - Enhanced Animations */}
                <div className="absolute top-16 -left-6 bg-white  shadow-xl p-3 border border-blue-100 animate-float hover:scale-110 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center animate-sparkle">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 animate-pulse">16500+</div>
                      <div className="text-gray-600 text-xs">Active Students</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-40 -right-10 bg-white  shadow-xl p-3 border border-red-100 animate-float hover:scale-110 transition-all duration-300" style={{animationDelay: '1s'}}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center animate-sparkle" style={{animationDelay: '0.3s'}}>
                      <Play className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 animate-pulse" style={{animationDelay: '0.5s'}}>7500+</div>
                      <div className="text-gray-600 text-xs">Online Video Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features Section */}
        <div className="mt-35 bg-white py-8 px-4  shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 text-xs">20k+ Online Courses</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 text-xs">Lifetime Access</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 text-xs">Value For Money</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 text-xs">Lifetime Support</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 text-xs">Community Support</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes pop {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes slowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }

        .animate-pop {
          animation: pop 4s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .animate-ripple {
          animation: ripple 4s ease-out infinite;
        }

        .animate-slow-pulse {
          animation: slowPulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
