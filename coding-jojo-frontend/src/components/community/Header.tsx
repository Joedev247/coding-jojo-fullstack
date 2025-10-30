"use client"

import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-br from-blue-50 to-blue-100 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Community Hub</h1>
            <p className="mt-1 text-gray-600 text-sm">Connect, learn, and grow with fellow students</p>
          </div>
        </div>
      </div>
    </header>
  );
}