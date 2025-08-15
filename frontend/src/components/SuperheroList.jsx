import React from "react";
import SuperheroCard from "./SuperheroCard";

export default function SuperheroList({ heroes, onCardClick }) {
  return (
    <ul className="flex gap-8 flex-wrap">
      {heroes.map((hero) => (
        <SuperheroCard
          key={hero._id}
          hero={hero}
          onClick={() => onCardClick(hero._id)}
        />
      ))}
    </ul>
  );
}
