import React from "react";

export default function LogoUploader({ logo, initialLogo, onChange }) {
  const handleLogoChange = (e) => onChange(e.target.files[0]);

  return (
    <div className="flex-shrink-0">
      <label className="block font-semibold mb-1">Logo</label>
      {initialLogo && !logo && (
        <img
          src={`http://localhost:5000${initialLogo}`}
          alt="logo"
          className="w-70 h-150 object-cover rounded mb-2"
        />
      )}
      {logo && (
        <img
          src={URL.createObjectURL(logo)}
          alt="logo"
          className="w-70 h-150 object-cover rounded mb-2 border-2 border-blue-500"
        />
      )}
      <input type="file" onChange={handleLogoChange} className="text-sm" />
    </div>
  );
}
