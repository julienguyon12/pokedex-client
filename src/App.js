import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import NavBar from "./Component/NavBar";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Pokemon from "./Page/Pokemon";

export const AppContext = createContext();
function App() {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  const [pokemonList, setPokemonList] = useState();
  useEffect(() => {
    // Step 1 : "Hello, render ! 👋"
    axios
      .get("https://api-pokedex-d61l.onrender.com")
      .then((res) => console.log(res.data));

    // Step 2 : "Get JWT token 🔓"
    axios
      .post(
        "https://api-pokedex-d61l.onrender.com/api/login",
        { username: "pikachu", password: "pikachu" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        localStorage.setItem("token", JSON.stringify(res.token));
        return res.token;
      })
      .then((token) => fetchPokemonlist(token));
  }, []);

  // Step 3 : "Get pokemon list 🎉"
  const fetchPokemonlist = (token) => {
    return axios
      .get("https://api-pokedex-d61l.onrender.com/api/pokemons", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setPokemonList(res.data);
      });
  };
  return (
    <div className="App">
      <AppContext.Provider
        value={{
          token,
          pokemonList,
        }}
      >
        <Router>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={<Home fetchPokemonlist={fetchPokemonlist} />}
            />
            <Route path="/pokemon/:id" element={<Pokemon />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
