import React from "react";

const Pagination: React.FC = () => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex space-x-1">
        <button className="px-2 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
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
        <button className="px-3 py-1.5 bg-blue-600 text-white font-medium rounded">
          1
        </button>
        <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition duration-200">
          2
        </button>
        <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition duration-200">
          3
        </button>
        <button className="px-2 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition duration-200">
          ...
        </button>
        <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition duration-200">
          10
        </button>
        <button className="px-2 py-1.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 rounded transition duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
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
