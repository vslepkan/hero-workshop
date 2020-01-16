import React from "react";
import { getCachedHeroes, getSumOfPower } from "helpers";
import HeroCard from "components/HeroCard/HeroCard";

function Battle({ history }) {
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
        <HeroCard hero={heroes[0]} isWinner={isWinner} />
        <p style={{ margin: "50px", alignSelf: "center" }}>VS</p>
        <HeroCard hero={heroes[1]} isWinner={!isWinner} />
      </div>
      <button
        type="button"
        className="backButton"
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </>
  );
}

export default Battle;
