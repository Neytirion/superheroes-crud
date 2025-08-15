import React from "react";

export default function HeroPagination({
                                         totalHeroes,
                                         heroesPerPage,
                                         currentPage,
                                         onPageChange,
                                       }) {
  const totalPages = Math.ceil(totalHeroes / heroesPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 justify-center mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded transition ${
            currentPage === page
              ? "bg-blue-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
