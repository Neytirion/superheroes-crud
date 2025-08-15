import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuperheroForm from "../components/SuperheroForm";
import { api } from "../api/api";
import NavButton from "../components/NavButton.jsx";

export default function EditSuperheroPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get(`/superheroes/${id}`);
        setHero(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch superhero");
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await api.patch(`/superheroes/${id}`, data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update superhero");
    }
  };

  if (loading) return <p className="p-4 text-white">Loading...</p>;
  if (error) return <p className="p-4 text-red-300">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <NavButton to="/" className="">Go Back </NavButton>
        <h1 className="text-3xl font-bold mb-8">Edit Superhero</h1>
        <div className="bg-white text-black rounded-xl shadow-lg p-6">
          <SuperheroForm initialData={hero} onSubmit={handleSubmit} submitText="Save Changes" />
        </div>
      </div>
    </div>
  );
}
