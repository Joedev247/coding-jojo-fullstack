"use client"

import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900/50 via-pink-800/50 to-red-900/50 shadow-lg backdrop-blur-md">
      <div className="max-w-[1400] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">Community Hub</h1>
            <p className="mt-2 text-gray-300">Connect, learn, and grow with fellow students</p>
          </div>
        </div>
      </div>
    </header>
  );
}