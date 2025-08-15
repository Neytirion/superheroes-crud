import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreateSuperheroPage from "./pages/CreateSuperheroPage.jsx";
import EditSuperheroPage from "./pages/EditSuperheroPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-red-900 text-white">
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