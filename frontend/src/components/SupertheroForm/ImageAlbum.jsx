import React from "react";

export default function ImageAlbum({
                                     albumImages,
                                     newImages,
                                     setNewImages,
                                     setRemovedImages,
                                     setViewerIndex
                                   }) {
  const handleNewImagesChange = (e) => setNewImages([...e.target.files]);

  return (
    <div>
      <label className="block font-semibold mb-1">Album Images</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {albumImages.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={`http://localhost:5000${img}`}
              alt={`img-${idx}`}
              className="w-24 h-24 object-cover rounded shadow cursor-pointer"
              onClick={() => setViewerIndex(idx)}
            />
            <button
              type="button"
              onClick={() => setRemovedImages((prev) => [...prev, img])}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        ))}

        {newImages.map((img, idx) => (
          <div key={idx + 1000} className="relative">
            <img
              src={URL.createObjectURL(img)}
              alt={`new-${idx}`}
              className="w-24 h-24 object-cover rounded shadow border-2 border-blue-500 cursor-pointer"
              onClick={() => setViewerIndex(albumImages.length + idx)}
            />
            <button
              type="button"
              onClick={() => setNewImages((prev) => prev.filter((_, i) => i !== idx))}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input type="file" multiple onChange={handleNewImagesChange} className="text-sm" />
    </div>
  );
}
