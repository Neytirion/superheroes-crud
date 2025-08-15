import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const res = await api.get("/superheroes");
        setHeroes(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch superheroes");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Superheroes</h1>
        <button
          onClick={() => navigate("/create")}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Add Superhero
        </button>
      </div>

      {loading && <p className="p-4">Loading...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}

      <ul className="flex gap-8">
        {heroes.map((hero) => (
          <li
            key={hero._id}
            className="flex-1 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="w-full aspect-[1/2]">
              <img
                src={`http://localhost:5000${hero.logo}`}
                alt={hero.nickname}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 text-center">
              <h2 className="text-lg font-semibold">{hero.nickname}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
