import React from "react";

export default function HeroPagination({
                                         totalHeroes,
                                         heroesPerPage,
                                         currentPage,
                                         onPageChange,
                                       }) {
  const totalPages = Math.ceil(totalHeroes / heroesPerPage);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 justify-center mt-6">
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-3 py-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded transition ${
              currentPage === page
                ? "bg-blue-500 text-gray-300"
                : "bg-blue-700 hover:bg-blue-900 text-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
}
