import React from "react";
import "./FavList.scss";

import SingleFav from "../SingleFav/SingleFav";

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
            return <SingleFav movieId={elem} key={elem} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default FavList;
