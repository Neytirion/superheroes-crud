import React from "react";
import {useNavigate} from "react-router-dom";
import SuperheroForm from "../components/SupertheroForm/SuperheroForm.jsx";
import {api} from "../api/api";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-red-900  p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600  to-red-500 bg-clip-text text-transparent">
            Create Superhero
          </h1>
          <NavButton to="/">Back</NavButton>
        </div>
        <div className="bg-white text-black rounded-xl shadow-lg p-6">
          <SuperheroForm
            initialData={{}}
            onSubmit={handleSubmit}
            submitText="Create"
          />
        </div>
      </div>
    </div>
  );
}
