import React, { useState, useEffect } from "react";
import { API } from "../../CONSTS";

const SingleFav = ({ movieId }) => {
  const [movie, setMovie] = useState(false);

  const getFav = (id) => {
    const data = {
      api_key: "1f6701f4695b66698a043fb831db39e9",
      include_adult: false,
      language: "pl-PL",
    };
    const urlData = new URLSearchParams(Object.entries(data));
    fetch(`${API}/${movieId}?${urlData}`)
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error("Błąd połączenia...");
      })
      .then((data) => {
        // console.log(data.title);
        setMovie(data.title);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getFav(movieId);
  }, []);
  return <li>{movie}</li>;
};

export default SingleFav;
