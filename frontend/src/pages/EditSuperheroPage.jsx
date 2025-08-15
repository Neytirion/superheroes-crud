import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";

export default function EditHeroPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [formData, setFormData] = useState({
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: [],
    catchPhrase: "",
  });
  const [logo, setLogo] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get(`/superheroes/${id}`);
        setHero(res.data);
        setFormData({
          nickname: res.data.nickname || "",
          realName: res.data.realName || "",
          originDescription: res.data.originDescription || "",
          superpowers: res.data.superpowers || [],
          catchPhrase: res.data.catchPhrase || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch superhero");
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("nickname", formData.nickname);
      data.append("realName", formData.realName);
      data.append("originDescription", formData.originDescription);
      data.append("catchPhrase", formData.catchPhrase);
      formData.superpowers.forEach((sp) => data.append("superpowers", sp));
      if (logo) data.append("logo", logo);
      newImages.forEach((img) => data.append("images", img));

      await api.patch(`/superheroes/${id}`, data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to update superhero");
    }
  };

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (error) return <p className="p-4 text-red-300">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Superhero</h1>

        <div className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
          {/* Логотип */}
          <div className="md:w-1/3 flex flex-col items-center gap-4">
            <img
              src={
                logo
                  ? URL.createObjectURL(logo)
                  : `http://localhost:5000${hero.logo}`
              }
              alt={formData.nickname}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
            <input type="file" onChange={handleLogoChange} className="text-sm" />
          </div>

          {/* Форма */}
          <div className="md:w-2/3 flex flex-col gap-4">
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
                <label className="block font-semibold mb-1">Superpowers (comma separated)</label>
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

              {/* Album Images */}
              <div>
                <label className="block font-semibold mb-2">Album Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {hero.images?.map((img, idx) => (
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
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
