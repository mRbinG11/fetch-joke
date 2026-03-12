import axios from "axios";
import { useState } from "react";

import "./JokeCard.css";

export const JokeCard = () => {
  const [apiCalled, setApiCalled] = useState(false);
  const [joke, setJoke] = useState({});
  const [apiErr, setApiErr] = useState(false);

  const jokeEndpoint = "https://official-joke-api.appspot.com/random_joke";

  const btnClick = async () => {
    setApiErr(false);
    setApiCalled(true);
    try {
      let response = await axios.get(jokeEndpoint);
      let data = response.data;
      setJoke({ ...data });
    } catch (err) {
      setApiErr(true);
      console.error(err);
    }
    setApiCalled(false);
  };

  return (
    <div className="card">
      <h2>Random Joke</h2>
      <p>Click the button to fetch a fresh one.</p>
      <button disabled={apiCalled} onClick={btnClick}>
        Fetch joke
      </button>
      {apiErr ? (
        <>
          <p id="errLine">Could not fetch a joke. Try again.</p>
          <a href="#" onClick={btnClick}>
            Try again
          </a>
        </>
      ) : apiCalled ? (
        <p>Fetching...</p>
      ) : joke.setup ? (
        <>
          <p>{joke.setup}</p>
          <strong>{joke.punchline}</strong>
        </>
      ) : (
        <p>No joke yet.</p>
      )}
    </div>
  );
};
