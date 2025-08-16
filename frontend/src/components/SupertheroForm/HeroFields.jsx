import React from "react";

export default function HeroFields({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSuperpowersChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      superpowers: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  return (
    <>
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

      <div>
        <label className="block font-semibold mb-1">Superpowers (comma separated)</label>
        <input
          type="text"
          value={formData.superpowers.join(", ")}
          onChange={handleSuperpowersChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

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
    </>
  );
}
