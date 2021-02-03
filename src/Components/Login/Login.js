import React, { useState } from "react";
import "./Login.scss";

const Login = ({ isLogged, userLogin, setIsLogged }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const logging = (e) => {
    e.preventDefault();
    fetch("https://msz-movies.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.message === "Invalid credentials, could not log you in.") {
          console.log("błąd logowania");
          return setLoginError(!loginError);
        }
        userLogin(name, data.userId, data.favMoviesId, data.friendsId);
        setIsLogged(!isLogged);
        console.log("zalogowano");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={isLogged ? "logged" : "form login"}>
      <div className="form-content">
        <form>
          <label>
            Login
            <input
              name="login"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </label>
          <label>
            Hasło
            <input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
          </label>
          <button onClick={(e) => logging(e)}>Zaloguj</button>
          <h1 className="logo">filmder</h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
