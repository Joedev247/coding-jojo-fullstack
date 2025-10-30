import React from 'react';
import { Boxes } from '../../components/ui/background-boxes';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function BoxesDemoPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Boxes */}
        <div className="absolute inset-0 opacity-10">
          <Boxes />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Background Boxes Demo
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Interactive animated background with hover effects. Move your mouse over the boxes to see them light up!
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white  hover:bg-blue-700 transition-colors">
                Primary Button
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700  hover:border-blue-500 hover:text-blue-600 transition-colors">
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}