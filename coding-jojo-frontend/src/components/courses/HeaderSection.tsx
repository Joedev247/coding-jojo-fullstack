import React from 'react';
import { BookOpen, Award } from 'lucide-react';

const HeaderSection: React.FC = () => {
  return (
    <header className="relative z-10 bg-gradient-to-r from-purple-900/50 via-pink-800/50 to-red-900/50 border-b border-gray-800 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400">Courses Catalog</h1>
            <p className="mt-2 text-gray-300">Discover expert-led courses to accelerate your learning journey</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-5 py-2.5 flex items-center font-medium transition duration-200 shadow-md">
              <BookOpen className="w-4 h-4 mr-2" />
              My Learning
            </button>
            <button className="bg-gray-800/70 hover:bg-gray-700/80 text-white px-5 py-2.5 flex items-center font-medium transition duration-200">
              <Award className="w-4 h-4 mr-2" />
              Certificates
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;