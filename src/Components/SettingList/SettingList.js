import React, { useState, useEffect, useMemo } from "react";
import "./SettingList.scss";
import SingleFriend from "../SingleFriend/SingleFriend";

const SettingList = ({
  settingsOpen,
  handleSettingsOpen,
  isLogged,
  handleAddToFriends,
  handleRemoveFriend,
  friends,
}) => {
  const [users, setUsers] = useState({});
  const optionalFriends = useMemo(() => {
    return Object.values(users).filter((user) => !friends.includes(user.id));
  }, [friends]);

  const getMap = (arr, key) => {
    const mapTemp = {};
    arr.forEach((elem, index) => (mapTemp[arr[index].id] = elem));
    return mapTemp;
  };

  useEffect(() => {
    fetch("https://msz-movies.herokuapp.com/api/users/")
      .then((res) => res.json())
      .then((data) => {
        console.log("data userId", getMap(data, data));
        setUsers(getMap(data, data));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className={settingsOpen ? "fav-list fav-list-active " : "fav-list"}>
      <div className="close" onClick={handleSettingsOpen}>
        <div className="close-inner"></div>
      </div>
      {isLogged ? (
        <>
          <p>Ludzie, których możesz znać:</p>
          <ul>
            {optionalFriends.map((elem) => {
              const id = elem.id;
              return (
                <li key={id}>
                  {elem.name}
                  <button onClick={() => handleAddToFriends(id)}>
                    Dodaj ziomka
                  </button>
                </li>
              );
            })}
          </ul>
          <p>Znajomi:</p>
          <ul>
            {friends.map((friendId) => {
              return (
                <SingleFriend
                  friendName={users[friendId]?.name}
                  friendId={friendId}
                  handleRemoveFriend={handleRemoveFriend}
                  key={friendId}
                />
              );
            })}
          </ul>
        </>
      ) : (
        <ul>
          <li>Zaloguj</li>
          <li>Rejestracja</li>
        </ul>
      )}
    </div>
  );
};

export default SettingList;
