import React from "react";
const MovieForm = ({ match, history }) => {
  const id = match.params.id;
  return (
    <React.Fragment>
      <h2>Movie Form {id}</h2>
      <button
        className="btn btn-primary"
        onClick={() => history.replace("/movies")}
      >
        Save
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
