import React from "react";
import "./Navigation.scss";
import heart from "./heart.png";
import settings from "./settings.png";

const Navigation = ({ handleFavOpen, handleSettingsOpen }) => {
  return (
    <nav className="nav-bar">
      <div onClick={handleSettingsOpen} className="settings">
        <img src={settings} alt="" />
      </div>
      <h1 className="logo">filmder</h1>
      <div onClick={handleFavOpen} className="favourites">
        <img src={heart} alt="" />
      </div>
    </nav>
  );
};
Navigation.displayName = "Navigation";

export default Navigation;
