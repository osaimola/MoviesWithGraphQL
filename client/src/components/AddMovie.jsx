import React from "react";
import { useState } from "react";

function AddMovie() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieDirector, setMovieDirector] = useState("");

  return (
    <div>
      <input
        id="title"
        placeholder="movie title"
        onChange={(e) => {
          setMovieTitle(e.target.value);
        }}
      ></input>
      <input
        id="genre"
        placeholder="movie genre"
        onChange={(e) => {
          setMovieGenre(e.target.value);
        }}
      ></input>
      <select
        onChange={(e) => {
          setMovieDirector(e.target.value);
        }}
      >
        <option value="directorA">directorA</option>
        <option value="directorB">directorB</option>
      </select>
    </div>
  );
}

export default AddMovie;
