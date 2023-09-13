import React from "react";
import "../Style/Home.scss";
import CardPokemon from "../Component/CardPokemon";
import { Link } from "react-router-dom";
import useFetch from "../Hook/UseFetch";

export default function Home() {
  const { data, loading, error } = useFetch(`/pokemons/`);
  return (
    <div className="home">
      <h1>Bienvenue dans votre Pokedex</h1>
      <div className="pokedex">
        {error ? (
          "something went wrong"
        ) : loading ? (
          <div className="loading">
            <div>Loading</div>
            <svg
              className="spinner"
              width="65px"
              height="65px"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="path"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
              ></circle>
            </svg>
          </div>
        ) : (
          data?.map((item) => {
            return (
              <Link to={{ pathname: `/pokemon/${item.id}` }} key={item.id}>
                <CardPokemon item={item} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
