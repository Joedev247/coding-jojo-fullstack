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
    <div className="min-h-screen relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-2.5 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto text-center w-full">
          {/* Error Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg mb-8 border border-pink-500/20">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
              <AlertTriangle className="h-3 w-3 text-white" />
            </div>
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Page Not Found
            </span>
          </div>{" "}
          {/* Large 404 Text with Glitch Effect */}
          <div className="mb-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-4 relative drop-shadow-2xl">
              <span className="inline-block animate-bounce bg-gradient-to-r from-pink-400 via-orange-400 to-pink-400 bg-clip-text text-transparent filter drop-shadow-lg">
                {glitchText}
              </span>
              {/* Glitch overlay effects */}
              <div className="absolute inset-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-pink-500/30 animate-pulse -z-10">
                404
              </div>
            </h1>
            <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full shadow-lg shadow-pink-500/50"></div>
          </div>{" "}
          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              Oops! This page got lost in
              <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {" "}
                cyberspace
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, even the best developers encounter 404s!
            </p>
          </div>{" "}
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 max-w-4xl mx-auto">
            {/* Go Home */}
            <Link href="/">
              <button className="w-full group bg-gradient-to-r from-pink-500 to-orange-500 hover:from-orange-500 hover:to-pink-500 text-white px-2.5 py-2.5 text-sm font-medium shadow-lg hover:shadow-pink-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Go Home</span>
              </button>
            </Link>

            {/* Go Back */}
            <button
              onClick={handleGoBack}
              className="w-full group  bg-gray-900/70 backdrop-blur-sm  hover:border-pink-500/50 text-white px-2.5 py-2.5 text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Go Back</span>
            </button>

            {/* Browse Courses */}
            <Link href="/courses">
              <button className="w-full group  bg-gray-900/70 backdrop-blur-sm  hover:border-orange-500/50 text-white px-2.5 py-2.5 text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Browse Courses</span>
              </button>
            </Link>

            {/* Refresh Page */}
            <button
              onClick={handleRefresh}
              className="w-full group  bg-gray-900/70 backdrop-blur-sm  hover:border-green-500/50 text-white px-2.5 py-2.5 text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4 group-hover:scale-110 group-hover:rotate-180 transition-all" />
              <span>Refresh</span>
            </button>
          </div>{" "}
          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
            {/* Dashboard Card */}
            <Link href="/dashboard">
              <div className="group p-4  bg-gray-900/50 backdrop-blur-sm border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-pink-500 transition-colors">
                  Dashboard
                </h3>
                <p className="text-gray-400 text-xs">
                  Access your learning dashboard and track your progress
                </p>
              </div>
            </Link>

            {/* Community Card */}
            <Link href="/community">
              <div className="group p-4  bg-gray-900/50 backdrop-blur-sm border hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1 group-hover:text-orange-500 transition-colors">
                  Community
                </h3>
                <p className="text-gray-400 text-xs">
                  Join our community of learners and share your knowledge
                </p>
              </div>
            </Link>

            {/* Search Card */}
            <div className="group p-4  bg-gray-900/50 backdrop-blur-sm border hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Search className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-green-500 transition-colors">
                Search
              </h3>
              <p className="text-gray-400 text-xs">
                Try searching for what you were looking for
              </p>
            </div>
          </div>{" "}
          {/* Bottom Message */}
          <div className="py-4 bg-gradient-to-r from-pink-500/10 to-orange-500/10 backdrop-blur-sm max-w-4xl mx-auto">
            <p className="text-gray-300 text-xs flex items-center justify-center gap-2">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span>
                Need help? Our support team is here to assist you 24/7
              </span>
              <Sparkles className="h-3 w-3 text-orange-500" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
