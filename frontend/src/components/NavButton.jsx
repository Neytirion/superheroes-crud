import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavButton({ to, children, className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to === "back") {
      navigate(-1);
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition ${className || ""}`}
    >
      {children}
    </button>
  );
}
