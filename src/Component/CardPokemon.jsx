import React from "react";
import "../Style/CardPokemon.scss";

export default function CardPokemon({ item }) {
  return (
    <div className="card-pokemon">
      <div className="desc">
        <h3>{item.name}</h3>
        <p>{item.types.join(", ")}</p>
      </div>

      <img src={item.picture} alt="" />
      <div className="capacity">
        <p>hp: {item.hp}</p>
        <p>cp: {item.cp}</p>
      </div>
    </div>
  );
}
