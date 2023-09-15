import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../App";
import useFetch from "../Hook/UseFetch";
import CardPokemon from "../Component/CardPokemon";
import "../Style/Pokemon.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Pokemon() {
  const id = parseInt(useParams().id);
  const { token } = useContext(AppContext);
  const { data, loading, error } = useFetch(`/pokemons/${id}`, token);

  return (
    <div className="pokemon">
      <Link to={{ pathname: `/` }}>
        <ArrowBackIcon sx={{ fontSize: 40 }} />
      </Link>

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
        <div className="container-card-pokemon">
          <CardPokemon item={data} action="detail" />
        </div>
      )}
    </div>
  );
}
