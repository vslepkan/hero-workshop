import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/Card/Card";
import Search from "components/Search/Search";
import s from "./Home.module.css";
import { getCachedHeroes } from "helpers";

function Home() {
  const cachedHeroes = getCachedHeroes("heroes");
  let [heroes, setHeroes] = useState(cachedHeroes);
  let [battle, setBattle] = useState([]);
  let isBattleReady = battle.length === 2;

  let handleSearch = data => {
    window.localStorage.setItem("heroes", JSON.stringify(data));
    setHeroes(data);
  };

  let handleCompare = hero => {
    setBattle(state => {
      let result = [...state, hero];
      window.localStorage.setItem("battle", JSON.stringify(result));

      return result;
    });
  };

  return (
    <>
      {isBattleReady && (
        <Link className={s.battleLink} to="/heroes/battle">
          Battle
        </Link>
      )}
      <div>
        <Search onSearch={handleSearch} />
        <h2>Recently searched heroes</h2>
        <div className={s.cards}>
          {heroes.map(hero => (
            <Card key={hero.id} hero={hero} handleCompare={handleCompare} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
