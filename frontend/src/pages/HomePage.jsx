import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import SuperheroList from "../components/SuperheroList";

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
          Add your Superhero!!!
        </button>
      </div>

      {loading && <p className="p-4">Loading...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}

      <SuperheroList
        heroes={heroes}
        onCardClick={(id) => navigate(`/edit/${id}`)}
      />
    </div>
  );
}
