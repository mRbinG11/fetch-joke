import axios from "axios";
import { useEffect, useRef, useState } from "react";

import "./JokeCard.css";

export const JokeCard = () => {
  const fetchBtn = useRef(null);

  const [apiCalled, setApiCalled] = useState(false);
  const [joke, setJoke] = useState({});
  const [apiErr, setApiErr] = useState(false);

  useEffect(() => {
    if (apiCalled) fetchBtn.current.textContent = "Fetching...";
    else fetchBtn.current.textContent = "Fetch joke";
  }, [apiCalled]);

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
      <h1>Random Joke</h1>
      <p>Click the button to fetch a fresh one.</p>
      <button ref={fetchBtn} disabled={apiCalled} onClick={btnClick}>
        Fetch joke
      </button>
      {apiErr ? (
        <>
          <p id="errLine">Could not fetch a joke. Try again.</p>
          <button onClick={btnClick}>Try again</button>
        </>
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
