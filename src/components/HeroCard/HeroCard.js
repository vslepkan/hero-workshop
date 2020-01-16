import cx from "classnames";
import times from "lodash/times";
import React from "react";
import { getSumOfPower } from "helpers";
import s from "./HeroCard.module.css";

function HeroCard({ hero, isWinner }) {
  let power = getSumOfPower(hero);
  let { images, appearance, name, powerstats, work } = hero;

  return (
    <div
      className={cx(s.heroCard, {
        [s.winner]: isWinner
      })}
    >
      <img
        style={{ width: "100%", minHeight: "300px" }}
        src={"http://localhost:4000" + images?.lg}
        alt="Hero"
      />
      <div style={{ padding: "0 20px 20px" }}>
        <h1>
          {name} / {appearance.race || "😿"}
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

export default HeroCard;
