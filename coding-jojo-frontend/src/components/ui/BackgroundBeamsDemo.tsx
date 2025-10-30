"use client";
import React from "react";
import { BackgroundBeams } from "./background-beams";

export function BackgroundBeamsDemo() {
  return (
    <div className="h-[40rem] w-full bg-white relative flex flex-col items-center justify-center antialiased overflow-hidden">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-blue-600 to-blue-800 text-center font-sans font-bold mb-4">
          Join CodingJojo Today
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto my-4 text-xs text-center relative z-10">
          Start your coding journey with CodingJojo's interactive learning platform.
          Master programming with expert-led courses and hands-on projects.
        </p>
        <div className="relative z-10 w-full max-w-md mx-auto mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-blue-200  bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold  transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
