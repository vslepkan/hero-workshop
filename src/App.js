import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import times from "lodash/times";
import s from "./App.module.css";
import { Link } from "react-router-dom";
import cx from 'classnames';

function getCachedHeroes(name) {
  let data = window.localStorage.getItem(name);
  return data ? JSON.parse(data) : [];
}

function getSumOfPower(hero) {
  return Object.values(hero?.powerstats).reduce((acc, curr) => acc + curr, 0);
}

function App() {
  const cachedHeroes = getCachedHeroes("heroes");
  let [heroes, setHeroes] = useState(cachedHeroes);
  let [isOnline, setOnline] = useState(true);
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

  let onOnline = () => setOnline(true);
  let onOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  return (
    <>
      {!isOnline && <p className={s.onlineMessage}>You are offline</p>}
      {isBattleReady && <Link className={s.battleLink} to="/heroes/battle">Battle</Link>}
      <div
        style={{
          marginTop: !isOnline ? "40px" : "initial"
        }}
      >
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

function Search({ onSearch }) {
  let [value, setValue] = useState("");

  let handleChange = e => {
    setValue(e.target.value);

    if (e.target.value) {
      fetch(`/api/search/${e.target.value}`)
        .then(res => res.json())
        .then(json => {
          onSearch(json);
        });
    }
  };

  return (
    <div className={s.searchWrapper}>
      <DebounceInput
        id="search"
        placeholder="What are you looking for?"
        type="text"
        minLength="2"
        debounceTimeout="300"
        value={value}
        onChange={handleChange}
        className={s.search}
      />
    </div>
  );
}

function Card({ hero, handleCompare }) {
  let { name, images, slug } = hero;

  return (
    <div className={s.card}>
      <img
        className={s.heroImage}
        src={"http://localhost:4000" + images?.lg}
        alt={name}
      />
      <p>{name}</p>
      <button className={s.addHero} onClick={() => handleCompare(hero)}>Choose</button>
      <Link to={`/heroes/${slug}`}>Show details</Link>
    </div>
  );
}

export function HeroPage({ match, history }) {
  let { params } = match;
  let heroes = getCachedHeroes("heroes");
  let hero = heroes.find(h => h.slug === params.id);

  if (!hero) {
    return <p>Hero not found</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "65px"
      }}
    >
      <Hero hero={hero} />
      <button
        type="button"
        className={s.backButton}
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </div>
  );
}

function Hero({ hero, isWinner }) {
  let power = getSumOfPower(hero);
  let { images, appearance, name, powerstats, work } = hero;

  return (
    <div
      className={cx(s.heroCard, {
        [s.winner]: isWinner
      })}
    >
      <img
        className={s.heroImage}
        src={"http://localhost:4000" + images?.lg}
        alt="Hero"
      />
      <div style={{ padding: "0 20px 20px" }}>
        <h1>
          {name} / {appearance.race || '😿'}
        </h1>
        <article>
          <h4>Appearance</h4>
          <p>{work.occupation}</p>
          <p>{work.base}</p>
        </article>
        <article>
          <h4>Powers ({power})</h4>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {Object.entries(powerstats).map(([name, power]) => (
              <li
                key={name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center"
                }}
              >
                <span>{name}: </span>
                <div>
                  {times(Math.round(power / 10), i => (
                    <span key={i} role="img" aria-label="power">
                      ⭐️
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

export function Battle({ history }) {
  let heroes = getCachedHeroes("battle");
  let results = heroes.map(hero => getSumOfPower(hero));
  let isWinner = results[0] > results[1];

  if (heroes.length !== 2) {
    return <p>Nothing to compare...</p>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "65px"
        }}
      >
        <Hero hero={heroes[0]} isWinner={isWinner} />
        <p style={{ margin: "50px", alignSelf: "center" }}>VS</p>
        <Hero hero={heroes[1]} isWinner={!isWinner} />
      </div>
      <button
        type="button"
        className={s.backButton}
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </>
  );
}

export default App;
