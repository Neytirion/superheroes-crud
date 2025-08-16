import React, { useState } from "react";
import LogoUploader from "./LogoUploader";
import HeroFields from "./HeroFields";
import ImageAlbum from "./ImageAlbum";
import ImageViewer from "./ImageViewer";

export default function SuperheroForm({ initialData, onSubmit, onDelete, submitText }) {
  const [formData, setFormData] = useState({
    nickname: initialData.nickname || "",
    realName: initialData.realName || "",
    originDescription: initialData.originDescription || "",
    superpowers: initialData.superpowers || [],
    catchPhrase: initialData.catchPhrase || "",
  });
  const [logo, setLogo] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [viewerIndex, setViewerIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nickname", formData.nickname);
    data.append("realName", formData.realName);
    data.append("originDescription", formData.originDescription);
    data.append("catchPhrase", formData.catchPhrase);
    formData.superpowers.forEach((sp) => data.append("superpowers", sp));
    if (logo) data.append("logo", logo);
    newImages.forEach((img) => data.append("images", img));
    removedImages.forEach((img) => data.append("removedImages", img));
    onSubmit(data);
  };

  const albumImages = initialData.images?.filter((img) => !removedImages.includes(img)) || [];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-white gap-4">
      <div className="flex gap-6">
        <LogoUploader
          logo={logo}
          initialLogo={initialData.logo}
          onChange={setLogo}
        />
        <div className="flex-1 flex flex-col gap-4">
          <HeroFields formData={formData} setFormData={setFormData} />
          <ImageAlbum
            albumImages={albumImages}
            newImages={newImages}
            setNewImages={setNewImages}
            setRemovedImages={setRemovedImages}
            setViewerIndex={setViewerIndex}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-700 text-blue-300 px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        {submitText}
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-700 text-blue-300 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Hero
        </button>
      )}

      <ImageViewer
        images={[...albumImages, ...newImages.map((img) => URL.createObjectURL(img))]}
        currentIndex={viewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </form>
  );
}
