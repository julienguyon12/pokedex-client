import React, { useContext, useState } from "react";
import "../Style/CardPokemon.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import { blue, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export default function CardPokemon({ item, action }) {
  const { token } = useContext(AppContext);
  const deleteHandler = (e, url) => {
    e.preventDefault();
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Pokemon supprimé!");
        window.location.reload();
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };
  return (
    <div className="card-pokemon">
      <div className="top">
        <div className="desc">
          <h3>{item?.name}</h3>
          <p>{item?.types?.join(", ")}</p>
        </div>
        {action === "detail" ? (
          <div className="container-icon">
            <button>
              <ModeIcon sx={{ color: blue[500] }} />
            </button>
          </div>
        ) : (
          <div className="container-icon">
            <button
              onClick={(e) =>
                deleteHandler(
                  e,
                  `https://api-pokedex-d61l.onrender.com/api/pokemons/${item.id}`
                )
              }
            >
              <DeleteIcon sx={{ color: red[500] }} />
            </button>
          </div>
        )}
      </div>
      <Link to={{ pathname: `/pokemon/${item.id}` }}>
        <img src={item?.picture} alt="" />
        <div className="capacity">
          <p>hp: {item?.hp}</p>
          <p>cp: {item?.cp}</p>
        </div>
      </Link>
    </div>
  );
}
