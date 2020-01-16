import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import s from "./Search.module.css";

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

export default Search;
