import React from "react";
import "./Login.scss";

const Login = ({ login, isLogged, password, handleLogIn }) => {
  return (
    <div className={isLogged ? "logged" : "form login"}>
      <div className="form-content">
        <form>
          <label for="login">
            Login
            <input name="login" type="text"></input>
          </label>
          <label for="password">
            Hasło
            <input name="password" type="password"></input>
          </label>
          <button onClick={(e) => handleLogIn(e)}>Zaloguj</button>
          <h1 className="logo">filmder</h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
