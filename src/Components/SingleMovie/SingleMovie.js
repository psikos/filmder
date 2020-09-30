import React from "react";
import "./SingleMovie.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SingleMovie = ({ movie }) => {
  const { poster_path, title, overview, vote_average } = movie;

  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          className="single-movie-image"
          alt={`${title} - movie poster`}
        />
        <div className="card-body">
          <header className="single-movie-header">
            <h4>{title}</h4>
            <div className="rate">
              <CircularProgressbar
                value={vote_average}
                maxValue={10}
                text={vote_average}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  // rotation: 0.25,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "butt",

                  // Text size
                  textSize: "2.8rem",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `rgba(62, 152, 199, ${vote_average / 10})`,
                  textColor: "#f88",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#3e98c7",
                })}
              />
              {/* ;<small className="text-muted">{vote_average}/10</small> */}
            </div>
          </header>
          {overview === "" ? (
            <p className="single-movie-text">
              Do filmu nie dodano jeszcze opisu...
            </p>
          ) : (
            <p className="single-movie-text">{overview} </p>
          )}
        </div>
      </div>
    </div>
  );
};
SingleMovie.displayName = "SingleMovie";

export default SingleMovie;
