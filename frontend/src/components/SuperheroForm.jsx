import React, { useState } from "react";

export default function SuperheroForm({ initialData, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    nickname: initialData.nickname || "",
    realName: initialData.realName || "",
    originDescription: initialData.originDescription || "",
    superpowers: initialData.superpowers || [],
    catchPhrase: initialData.catchPhrase || "",
  });
  const [logo, setLogo] = useState(null);
  const [newImages, setNewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuperpowersChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      superpowers: value.split(",").map((s) => s.trim()),
    }));
  };

  const handleLogoChange = (e) => setLogo(e.target.files[0]);
  const handleImagesChange = (e) => setNewImages([...e.target.files]);

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
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Nickname */}
      <div>
        <label className="block font-semibold mb-1">Nickname</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* Real Name */}
      <div>
        <label className="block font-semibold mb-1">Real Name</label>
        <input
          type="text"
          name="realName"
          value={formData.realName}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          required
        />
      </div>

      {/* Origin Description */}
      <div>
        <label className="block font-semibold mb-1">Origin Description</label>
        <textarea
          name="originDescription"
          value={formData.originDescription}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
          rows={3}
        />
      </div>

      {/* Superpowers */}
      <div>
        <label className="block font-semibold mb-1">
          Superpowers (comma separated)
        </label>
        <input
          type="text"
          value={formData.superpowers.join(", ")}
          onChange={handleSuperpowersChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Catch Phrase */}
      <div>
        <label className="block font-semibold mb-1">Catch Phrase</label>
        <input
          type="text"
          name="catchPhrase"
          value={formData.catchPhrase}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      {/* Logo */}
      <div>
        <label className="block font-semibold mb-1">Logo</label>
        {initialData.logo && !logo && (
          <img
            src={`http://localhost:5000${initialData.logo}`}
            alt="logo"
            className="w-32 h-32 object-cover rounded mb-2"
          />
        )}
        {logo && (
          <img
            src={URL.createObjectURL(logo)}
            alt="logo"
            className="w-32 h-32 object-cover rounded mb-2 border-2 border-blue-500"
          />
        )}
        <input type="file" onChange={handleLogoChange} className="text-sm" />
      </div>

      {/* Album Images */}
      <div>
        <label className="block font-semibold mb-1">Album Images</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {initialData.images?.map((img, idx) => (
            <img
              key={idx}
              src={`http://localhost:5000${img}`}
              alt={`img-${idx}`}
              className="w-24 h-24 object-cover rounded shadow"
            />
          ))}
          {newImages.map((img, idx) => (
            <img
              key={idx + 1000}
              src={URL.createObjectURL(img)}
              alt={`new-${idx}`}
              className="w-24 h-24 object-cover rounded shadow border-2 border-blue-500"
            />
          ))}
        </div>
        <input
          type="file"
          multiple
          onChange={handleImagesChange}
          className="text-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        {submitText}
      </button>
    </form>
  );
}
