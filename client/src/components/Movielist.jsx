import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_MOVIES = gql`
  {
    movies {
      name
      genre
      id
    }
  }
`;

function renderData(data, handleClick, setIsShown, setMovieID) {
  return data.map(({ name, genre, id }) => {
    return (
      <li
        key={name}
        onClick={() => {
          //TODO excetue the function pased in props
          handleClick(id, setIsShown, setMovieID);
        }}
      >
        {" "}
        {name}: {genre}{" "}
      </li>
    );
  });
}

function Movielist(props) {
  const { loading, error, data } = useQuery(ALL_MOVIES);

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ul>
        {renderData(
          data.movies,
          props.handleClick,
          props.setIsShown,
          props.setMovieID
        )}
      </ul>
    </div>
  );
}

export default Movielist;
