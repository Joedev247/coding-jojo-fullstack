import React from 'react';
import { BookOpen, Award } from 'lucide-react';

const HeaderSection: React.FC = () => {
  return (
    <header className="relative z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Courses Catalog</h1>
            <p className="mt-1 text-gray-600 text-sm">Discover expert-led courses to accelerate your learning journey</p>
          </div>
          <div className="mt-3 md:mt-0 flex space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2  flex items-center font-medium text-sm transition duration-200">
              <BookOpen className="w-4 h-4 mr-1.5" />
              My Learning
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2  flex items-center font-medium text-sm transition duration-200">
              <Award className="w-4 h-4 mr-1.5" />
              Certificates
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;