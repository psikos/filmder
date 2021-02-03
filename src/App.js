import React, { useState, useEffect } from "react";
// import { MOVIES_FETCH, MOVIES_FETCH_ERROR } from "./Actions";
import Navigation from "./Components/Navigation/Navigation";
// import Search from "./Components/Search";
// import Movies from "./Components/Movies";
import Footer from "./Components/Footer/Footer";
import SingleMovie from "./Components/SingleMovie/SingleMovie";
import "./App.scss";
import FavList from "./Components/FavList/FavList";
import SettingsList from "./Components/SettingList/SettingList";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { API, movieNumber } from "./CONSTS";
import Login from "./Components/Login/Login";

//funkcja losująca liczbę z zakresu od min do max
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
  // const [movies, setMovies] = useState([]);
  const [fav, setFav] = useState([]);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(false);
  const [nextMovie, setNextMovie] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [username, setUsername] = useState(false);
  // const [password, setPassword] = useState(false);
  const [userId, setUserId] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [friends, setFriends] = useState([]);

  const userLogin = (user, id, fav, friends) => {
    setUsername(user);
    setUserId(id);
    setFav(fav);
    setFriends(friends);
  };

  const handleFavOpen = () => {
    setFavOpen(!favOpen);
    console.log("fav click");
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(!settingsOpen);
    console.log("settings click");
  };

  const handleNext = () => {
    setMovie(nextMovie);
    fetchMovie(setNextMovie);
  };

  useEffect(() => {
    fetchMovie(setMovie);
    fetchMovie(setNextMovie);
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
        // console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleAddToFav = () => {
    setFav([...fav, movie.id]);

    fetch(`https://msz-movies.herokuapp.com/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: movie.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddToFriends = (addedUser) => {
    fetch(`https://msz-movies.herokuapp.com/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendId: `${addedUser}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("z dodania friendsa", data);
        setFriends(...friends, data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleRemoveFriend = (removedUser) => {
    fetch(`https://msz-movies.herokuapp.com/api/users/${userId}/friends`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendId: `${removedUser}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("z usunięcia friendsa", data);
        console.log("removedUser", removedUser);
        // setFriends(
        //   friends.filter((friend) => {
        //     return (friend = removedUser);
        //   })
        // );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // const dispatch = (action) => {
  //   switch (action.type) {
  //     case MOVIES_FETCH: {
  //       setMovies(action.payload);
  //       setError(false);
  //       setMovie(false);
  //       break;
  //     }

  //     case MOVIES_FETCH_ERROR: {
  //       setMovies([]);
  //       setError(action.payload);
  //       break;
  //     }

  //     default:
  //       console.warn("You should specify action type.");
  //   }
  // };

  return (
    <div className="body">
      <div className="container">
        <Navigation
          handleFavOpen={handleFavOpen}
          handleSettingsOpen={handleSettingsOpen}
        />
        <FavList fav={fav} favOpen={favOpen} handleFavOpen={handleFavOpen} />
        <SettingsList
          settingsOpen={settingsOpen}
          handleSettingsOpen={handleSettingsOpen}
          isLogged={isLogged}
          userId={userId}
          handleAddToFriends={handleAddToFriends}
          handleRemoveFriend={handleRemoveFriend}
          friends={friends}
        />
        {movie === false ? (
          <div className="loader">
            <Loader type="TailSpin" color="grey" height={80} width={80} />
          </div>
        ) : (
          <>
            <SingleMovie
              movie={movie}
              key={movie.id}
              handleNext={handleNext}
              handleAddToFav={handleAddToFav}
              nextMovie={nextMovie}
            />
          </>
        )}

        {error !== false && (
          <div className="">
            <h3>{error.message}</h3>
          </div>
        )}

        {/* <div className="">
        <h3 className="">Znajdź swój ulubiony film!</h3>
        <Search dispatch={dispatch} />
      </div>
      {movies.length === 0 ? null : <Movies movies={movies} />} */}
        <Footer />
        <Login
          isLogged={isLogged}
          userLogin={userLogin}
          setIsLogged={setIsLogged}
        />
      </div>
    </div>
  );
};
App.displayName = "App";

export default App;
