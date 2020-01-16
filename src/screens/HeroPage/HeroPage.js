import React from "react";
import { getCachedHeroes } from "helpers";
import HeroCard from "components/HeroCard/HeroCard";

function HeroPage({ match, history }) {
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
      <HeroCard hero={hero} />
      <button
        type="button"
        className="backButton"
        onClick={() => history.goBack()}
      >
        Back
      </button>
    </div>
  );
}

export default HeroPage;
