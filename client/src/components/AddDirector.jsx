import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const NEW_DIRECTOR = gql`
  mutation new_director($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      name
      id
    }
  }
`;

function AddDirector(props) {
  const [addNewDirector, { addingDirector, addDirectorError }] = useMutation(
    NEW_DIRECTOR
  );
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  return (
    <div className="addentry">
      <input
        type="text"
        placeholder="director name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        type="number"
        placeholder="director age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      ></input>
      <button
        className="submitbutton"
        onClick={() => {
          addNewDirector({ variables: { name: name, age: parseInt(age) } });
          setTimeout(() => {
            props.setShowForms(false);
          }, 800);
        }}
      >
        add director
      </button>
    </div>
  );
}

export default AddDirector;
