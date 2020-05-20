import React, { useState } from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Movielist from "./components/Movielist";
import Moviedetail from "./components/Moviedetail";
import AddMovie from "./components/AddMovie";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

function showDetails(movieID, setIsShown, setMovieID) {
  setIsShown(true);
  setMovieID(movieID);
}

function renderMovieDetails(isShown, movieID) {
  if (isShown) return <Moviedetail id={movieID} />;
}

function App() {
  const [isShown, setIsShown] = useState(false);
  const [movieID, setMovieID] = useState("");
  const [showForms, setShowForms] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Blockbusters</h1>
          <Movielist
            handleClick={showDetails}
            setIsShown={setIsShown}
            setMovieID={setMovieID}
          />
          {renderMovieDetails(isShown, movieID)}
          <AddMovie showForms={showForms} setShowForms={setShowForms} />
          <button
            className="addbutton"
            onClick={() => {
              setShowForms(!showForms);
            }}
          >
            {showForms ? "x" : "+"}
          </button>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
