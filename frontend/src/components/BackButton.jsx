import { useNavigate } from "react-router-dom";

export default function BackButton({ to = -1, label = "Back" }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
    >
      {label}
    </button>
  );
}