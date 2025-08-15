import React from "react";

export default function SuperheroCard({ hero, onClick }) {
  return (
    <li
      onClick={onClick}
      className="w-56 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
    >
      <div className="w-full aspect-[1/2.5]">
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
  );
}
