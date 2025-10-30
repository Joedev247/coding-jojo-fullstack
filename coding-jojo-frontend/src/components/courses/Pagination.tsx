import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const p = Math.max(1, Math.min(totalPages, page));
    if (p !== currentPage) onPageChange(p);
  };

  // Simplified page window logic
  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex justify-center mt-6">
      <div className="flex space-x-1 items-center">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-500 hover:bg-gray-50  transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
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

        {start > 1 && (
          <>
            <button onClick={() => goTo(1)} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
              1
            </button>
            {start > 2 && <span className="px-2 text-gray-500">...</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => goTo(p)}
            className={`px-3 py-1.5 text-sm ${p === currentPage ? "bg-blue-600 text-white font-medium" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"}`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
            <button onClick={() => goTo(totalPages)} className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2.5 py-1.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50  transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
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
