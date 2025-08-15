import React from "react";
import { useNavigate } from "react-router-dom";
import SuperheroForm from "../components/SuperheroForm";
import { api } from "../api/api";
import NavButton from "../components/NavButton.jsx";

export default function CreateSuperheroPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await api.post("/superheroes", data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create superhero");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <NavButton to="/" className="">Go Back </NavButton>
        <h1 className="text-3xl font-bold mb-8">Create Superhero</h1>
        <div className="bg-white text-black rounded-xl shadow-lg p-6">
          <SuperheroForm initialData={{}} onSubmit={handleSubmit} submitText="Create" />
        </div>
      </div>
    </div>
  );
}
