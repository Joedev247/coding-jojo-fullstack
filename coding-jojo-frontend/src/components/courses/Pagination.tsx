import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex space-x-1">
        <button className="px-3 py-2  bg-gray-900 text-gray-400 hover:bg-gray-700 transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium">
          1
        </button>
        <button className="px-4 py-2  bg-gray-900 text-gray-300 hover:bg-gray-700 transition duration-200">
          2
        </button>
        <button className="px-4 py-2  bg-gray-900 text-gray-300 hover:bg-gray-700 transition duration-200">
          3
        </button>
        <button className="px-3 py-2  bg-gray-900 text-gray-300 hover:bg-gray-700 transition duration-200">
          ...
        </button>
        <button className="px-4 py-2  bg-gray-900 text-gray-300 hover:bg-gray-700 transition duration-200">
          10
        </button>
        <button className="px-3 py-2  bg-gray-900 text-gray-400 hover:bg-gray-700 transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
