import React from "react";
import { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import _ from "lodash";

const GET_DIRECTORS = gql`
  {
    directors {
      name
      id
    }
  }
`;

const NEW_MOVIE = gql`
  mutation newMovie($name: String!, $genre: String!, $directorId: ID!) {
    addMovie(name: $name, genre: $genre, directorId: $directorId) {
      name
      genre
    }
  }
`;

function renderDirectors(loading, error, data) {
  if (data) {
    console.log(data.directors);
    return (
      <React.Fragment>
        {data.directors.map((director) => {
          return <option key={director.name}>{director.name}</option>;
        })}
      </React.Fragment>
    );
  }
}

function AddMovie(props) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieDirector, setMovieDirector] = useState("");
  const { loading, error, data } = useQuery(GET_DIRECTORS);
  const [addNewMovie, { addingMovie, addMovieError }] = useMutation(NEW_MOVIE, {
    variables: {
      name: movieTitle,
      genre: movieGenre,
      directorId: movieDirector,
    },
  });

  return (
    <div className={props.showForms ? "addmovie" : "hideaddmovie"}>
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
          //use selected name to find the respective director ID
          setMovieDirector(_.find(data.directors, { name: e.target.value }).id);
        }}
      >
        {renderDirectors(loading, error, data)}
      </select>
      <button
        className="submitbutton"
        onClick={() => {
          //can also add variables like addNewMovie({variables: {v1: "v1"}})
          addNewMovie();
          setTimeout(() => {
            props.setShowForms(false);
          }, 800);
        }}
      >
        +
      </button>
    </div>
  );
}

export default AddMovie;
