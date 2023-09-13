import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";

export default function Pokemon() {
  const idItem = parseInt(useParams().id);
  const [item, setItem] = useState([]);
  const { pokemonList } = useContext(AppContext);
  console.log(pokemonList);
  useEffect(() => {
    const items = pokemonList?.filter((pokemon) => pokemon.id === idItem);

    setItem(items);
  }, []);
  return (
    <div className="pokemon">
      <div className="desc">
        <h3>{item?.name}</h3>
        <p>{item?.types?.join(", ")}</p>
      </div>

      <img src={item?.picture} alt="" />
      <div className="capacity">
        <p>hp: {item?.hp}</p>
        <p>cp: {item?.cp}</p>
      </div>
    </div>
  );
}
