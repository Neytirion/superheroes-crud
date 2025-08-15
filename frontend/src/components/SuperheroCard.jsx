import React from "react";

export default function SuperheroCard({ hero, onClick }) {
  return (
    <li
      onClick={onClick}
      className="w-56 rounded-lg overflow-hidden shadow transition cursor-pointer
                 transform hover:scale-110 hover:shadow-2xl duration-500 ease-out"
    >
      <div className="w-full aspect-[1/2.5] overflow-hidden">
        <img
          src={`http://localhost:5000${hero.logo}`}
          alt={hero.nickname}
          className="w-full h-full object-cover transition duration-500 ease-out transform hover:scale-125"
        />
      </div>
      <div className="p-2 text-center bg-blue-900  transition duration-500">
        <h2 className="text-lg font-semibold text-blue-300">{hero.nickname}</h2>
      </div>
    </li>
  );
}
