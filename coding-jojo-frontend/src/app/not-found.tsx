"use client";

import React, { useState, useEffect } from "react";
import {
  Home,
  ArrowLeft,
  Search,
  BookOpen,
  Sparkles,
  Navigation,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/ui/LoadingSpinner";
// import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [glitchText, setGlitchText] = useState("404");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // Glitch effect for 404 text
    const glitchChars = ["4", "0", "4", "?", "#", "@", "!"];
    let glitchInterval: NodeJS.Timeout;

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        if (Math.random() < 0.1) {
          // 10% chance to glitch
          const randomChars = Array.from(
            { length: 3 },
            () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
          ).join("");
          setGlitchText(randomChars);

          setTimeout(() => setGlitchText("404"), 150);
        }
      }, 2000);
    };

    startGlitch();

    return () => {
      if (glitchInterval) clearInterval(glitchInterval);
    };
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto text-center w-full">
          {/* Error Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 border border-blue-200 rounded-full text-sm font-medium shadow-sm mb-6">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center">
              <AlertTriangle className="h-3 w-3 text-white" />
            </div>
            <span className="text-blue-700 font-medium">
              Page Not Found
            </span>
          </div>
          {/* Large 404 Text with Glitch Effect */}
          <div className="mb-5">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-3 relative">
              <span className="inline-block animate-bounce bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 bg-clip-text text-transparent">
                {glitchText}
              </span>
              {/* Glitch overlay effects */}
              <div className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blue-400/30 animate-pulse -z-10">
                404
              </div>
            </h1>
            <div className="h-1 w-20 sm:w-28 bg-gradient-to-r from-blue-600 to-emerald-600 mx-auto rounded-full shadow-sm"></div>
          </div>
          {/* Error Message */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Oops! This page got lost in
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                cyberspace
              </span>
            </h2>
            <p className="text-sm sm:text-xs text-gray-700 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, even the best developers encounter 404s!
            </p>
          </div>
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 max-w-4xl mx-auto">
            {/* Go Home */}
            <Link href="/">
              <button className="w-full group bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2.5 text-sm font-medium  shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Go Home</span>
              </button>
            </Link>

            {/* Go Back */}
            <button
              onClick={handleGoBack}
              className="w-full group bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700 px-3 py-2.5 text-sm font-medium  shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Go Back</span>
            </button>

            {/* Browse Courses */}
            <Link href="/courses">
              <button className="w-full group bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700 px-3 py-2.5 text-sm font-medium  shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Browse Courses</span>
              </button>
            </Link>

            {/* Refresh Page */}
            <button
              onClick={handleRefresh}
              className="w-full group bg-white border border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700 px-3 py-2.5 text-sm font-medium  shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4 group-hover:scale-110 group-hover:rotate-180 transition-all" />
              <span>Refresh</span>
            </button>
          </div>
          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-4">
            {/* Dashboard Card */}
            <Link href="/dashboard">
              <div className="group p-3 bg-white  border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Navigation className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  Dashboard
                </h3>
                <p className="text-gray-600 text-xs">
                  Access your learning dashboard and track your progress
                </p>
              </div>
            </Link>

            {/* Community Card */}
            <Link href="/community">
              <div className="group p-3 bg-white  border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  Community
                </h3>
                <p className="text-gray-600 text-xs">
                  Join our community of learners and share your knowledge
                </p>
              </div>
            </Link>

            {/* Search Card */}
            <div className="group p-3 bg-white  border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600  flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Search className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                Search
              </h3>
              <p className="text-gray-600 text-xs">
                Try searching for what you were looking for
              </p>
            </div>
          </div>
          {/* Bottom Message */}
          <div className="py-3 bg-blue-50 border border-blue-100  max-w-4xl mx-auto">
            <p className="text-gray-700 text-xs flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-blue-600" />
              <span>
                Need help? Our support team is here to assist you 24/7
              </span>
              <Sparkles className="h-3 w-3 text-blue-600" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
