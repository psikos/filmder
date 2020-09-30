import React from "react";
import "./FavList.scss";

const FavList = ({ fav, favOpen, handleFavOpen }) => {
  return (
    <div className={favOpen ? "fav-list fav-list-active " : "fav-list"}>
      <div className="close" onClick={handleFavOpen}>
        <div className="close-inner"></div>
      </div>
      {fav.length === 0 ? (
        <p className="add-something">
          Żaden film nie został dodany do ulubionych...
        </p>
      ) : (
        <ul>
          {fav.map((elem) => {
            return <li key={elem.id}>{elem.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default FavList;
