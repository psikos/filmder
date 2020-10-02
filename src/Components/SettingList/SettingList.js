import React from "react";
import "./SettingList.scss";

const SettingList = ({ settingsOpen, handleSettingsOpen }) => {
  return (
    <div className={settingsOpen ? "fav-list fav-list-active " : "fav-list"}>
      <div className="close" onClick={handleSettingsOpen}>
        <div className="close-inner"></div>
      </div>
      <ul>
        <li>Zaloguj</li>
        <li>Rejestracja</li>
      </ul>
    </div>
  );
};

export default SettingList;
