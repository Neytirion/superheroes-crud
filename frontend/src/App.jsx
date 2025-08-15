import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateSuperheroPage from "./pages/CreateSuperheroPage.jsx";
import EditSuperheroPage from "./pages/EditSuperheroPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateSuperheroPage />} />
          <Route path="/edit/:id" element={<EditSuperheroPage />} />

        </Routes>
      </Router>
    </div>
  );
}
export default App;