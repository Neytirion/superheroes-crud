import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import SuperheroList from "../components/SuperheroList";
import NavButton from "../components/NavButton.jsx";
import HeroPagination from "../components/SuperheroPagination.jsx";

export default function HomePage() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const heroesPerPage = 5;

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

  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600  to-red-500 bg-clip-text text-transparent">
          Superheroes
        </h1>
        <NavButton to="/create">Add your Superhero!</NavButton>
      </div>

      {loading && <p className="p-4">Loading...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <SuperheroList
            heroes={currentHeroes}
            onCardClick={(id) => navigate(`/edit/${id}`)}
          />

          <HeroPagination
            totalHeroes={heroes.length}
            heroesPerPage={heroesPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
