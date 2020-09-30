import React, { useState, useEffect } from "react";
import { MOVIES_FETCH, MOVIES_FETCH_ERROR } from "./Actions";
import Navigation from "./Components/Navigation/Navigation";
import Search from "./Components/Search";
import Movies from "./Components/Movies";
import Footer from "./Components/Footer/Footer";
import SingleMovie from "./Components/SingleMovie/SingleMovie";
import "./App.scss";
import FavList from "./Components/FavList/FavList";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const randMovieId = (min, max) => {
  min = parseInt(min, 10);
  max = parseInt(max, 10);

  if (min > max) {
    var tmp = min;
    min = max;
    max = tmp;
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(false);
  const [nextMovie, setNextMovie] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const API = "https://api.themoviedb.org/3/movie";

  const movieNumber = 743869;

  const handleFavOpen = () => {
    setFavOpen(!favOpen);
    console.log("fav click");
  };

  const handleNext = () => {
    setMovie(nextMovie);
    fetchMovie(setNextMovie);
  };

  useEffect(() => {
    fetchMovie(setMovie);
  }, []);

  const fetchMovie = (movieToSet) => {
    const data = {
      api_key: "1f6701f4695b66698a043fb831db39e9",
      include_adult: false,
      language: "pl-PL",
    };
    const urlData = new URLSearchParams(Object.entries(data));
    fetch(`${API}/${randMovieId(1, movieNumber)}?${urlData}`)
      .then((r) => {
        if (r.ok) return r.json();
        return fetchMovie(movieToSet);
      })
      .then((data) => {
        if (data.backdrop_path === null || data.overview === "") {
          return fetchMovie(movieToSet);
        }
        movieToSet(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddToFav = () => {
    setFav([...fav, movie]);
  };

  const dispatch = (action) => {
    switch (action.type) {
      case MOVIES_FETCH: {
        setMovies(action.payload);
        setError(false);
        setMovie(false);
        break;
      }

      case MOVIES_FETCH_ERROR: {
        setMovies([]);
        setError(action.payload);
        break;
      }

      default:
        console.warn("You should specify action type.");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <Navigation handleFavOpen={handleFavOpen} />
        <FavList fav={fav} favOpen={favOpen} handleFavOpen={handleFavOpen} />
        {movie === false ? (
          <div className="loader">
            <Loader type="TailSpin" color="grey" height={80} width={80} />
          </div>
        ) : (
          <SingleMovie movie={movie} key={movie.id} />
        )}

        {error !== false && (
          <div className="">
            <h3>{error.message}</h3>
          </div>
        )}

        <button onClick={handleNext}>NEXT</button>
        <button onClick={handleAddToFav}>ADD TO FAV</button>

        {/* <div className="">
        <h3 className="">Znajdź swój ulubiony film!</h3>
        <Search dispatch={dispatch} />
      </div>
      {movies.length === 0 ? null : <Movies movies={movies} />} */}
        <Footer />
      </div>
    </div>
  );
};
App.displayName = "App";

export default App;
