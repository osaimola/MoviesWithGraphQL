import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

function renderData(data) {
  return data.map(({ name }) => {
    return <li key={name}>{name}</li>;
  });
}

const MOVIE_DETAIL = gql`
  query movieDetail($id: ID!) {
    movie(id: $id) {
      name
      genre
      director {
        name
        movies {
          name
        }
      }
    }
  }
`;

function Moviedetail(props) {
  console.log(props.id);

  const { loading, error, data } = useQuery(MOVIE_DETAIL, {
    variables: { id: `${props.id}` },
  });

  if (loading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="moviedetail">
      <p>{data.movie.name}</p>
      <p>{data.movie.genre}</p>
      <p>{data.movie.director.name}</p>
      <strong>All Movies By This Director</strong>
      <ul>{renderData(data.movie.director.movies)}</ul>
    </div>
  );
}

export default Moviedetail;
