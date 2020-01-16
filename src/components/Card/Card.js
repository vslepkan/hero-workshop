import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

function Card({ hero, handleCompare }) {
  let { name, images, slug } = hero;

  return (
    <div className={s.card}>
      <img
        style={{ width: "100%", minHeight: "300px" }}
        src={"http://localhost:4000" + images?.lg}
        alt={name}
      />
      <p>{name}</p>
      <button className={s.addHero} onClick={() => handleCompare(hero)}>
        Choose
      </button>
      <Link to={`/heroes/${slug}`}>Show details</Link>
    </div>
  );
}

export default Card;
