import React, { useContext, useEffect, useState } from "react";
import "../Style/Home.scss";
import CardPokemon from "../Component/CardPokemon";
import { AppContext } from "../App";
import axios from "axios";
import Select from "react-select";

export default function Home({ fetchPokemonList }) {
  const { pokemonList, token } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [hp, setHp] = useState("");
  const [cp, setCp] = useState("");
  const [img, setImg] = useState("");
  const [types, setTypes] = useState([]);

  const optionList = [
    { value: "Plante", label: "Plante" },
    { value: "Poison", label: "Poison" },
    { value: "Eau", label: "Eau" },
    { value: "Feu", label: "Feu" },
    { value: "Insecte", label: "Insecte" },
    { value: "Vol", label: "Vol" },
    { value: "Normal", label: "Normal" },
    { value: "Electrik", label: "Electrik" },
    { value: "Fée", label: "Fée" },
  ];
  const customStyles = {
    control: (styles) => ({
      ...styles,
      height: 50,
      border: "none",
      fontSize: 15,
    }),
  };

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(types.length === 0 ? false : true);
  }, [types]);

  function handleSelect(data) {
    setTypes(data);
  }

  const createPokemon = (e) => {
    e.preventDefault();
    const data = {
      name: title,
      hp: hp,
      cp: cp,
      picture: img,
      types: types.map((item) => {
        return item.value;
      }),
    };
    axios
      .post("https://api-pokedex-d61l.onrender.com/api/pokemons", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Pokemon créé!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div className="home">
      <h1>Bienvenue dans votre Pokedex</h1>
      <form className="pokemon-form" onSubmit={(e) => createPokemon(e)}>
        <input
          className="input-pokemon"
          type="text"
          required
          placeholder="Nom"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          className="input-pokemon"
          required
          type="number"
          placeholder="Hp"
          onChange={(e) => setHp(e.target.value)}
        ></input>
        <input
          className="input-pokemon"
          required
          type="number"
          placeholder="Cp"
          onChange={(e) => setCp(e.target.value)}
        ></input>
        <input
          className="input-pokemon"
          required
          placeholder="URL image"
          onChange={(e) => setImg(e.target.value)}
        ></input>
        <Select
          options={optionList}
          placeholder="Select pokemon types"
          value={types}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
          styles={customStyles}
        />
        <button className="button-add" disabled={!isValid} type="submit">
          Ajouter
        </button>
      </form>

      <div className="pokedex">
        {pokemonList?.map((item) => {
          return <CardPokemon item={item} action="delete" key={item.id} />;
        })}
      </div>
    </div>
  );
}
