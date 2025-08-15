import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateSuperheroPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
  });

  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (logo) data.append("logo", logo);
      images.forEach((img) => data.append("images", img));

      await api.post("/superheroes", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to create superhero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Superhero</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={formData.nickname}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="realName"
          placeholder="Real Name"
          value={formData.realName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="originDescription"
          placeholder="Origin Description"
          value={formData.originDescription}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="superpowers"
          placeholder="Superpowers"
          value={formData.superpowers}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="catchPhrase"
          placeholder="Catch Phrase"
          value={formData.catchPhrase}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
        <div>
          <label className="block mb-1 font-medium">Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}
