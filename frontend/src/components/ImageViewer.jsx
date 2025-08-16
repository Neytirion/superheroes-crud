import React from "react";

export default function ImageViewer({ images, currentIndex, onClose}) {
  if (currentIndex === null || !images.length) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold px-2 py-1 hover:text-gray-300"
      >
        ×
      </button>
      <img
        src={`http://localhost:5000${images[currentIndex]}`}
        alt={`img-${currentIndex}`}
        className="max-h-[80vh] max-w-[90vw] object-contain rounded shadow-lg"
      />
    </div>
  );
}
