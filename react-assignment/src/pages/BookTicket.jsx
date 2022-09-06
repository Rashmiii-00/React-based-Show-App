import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BookTicket.css";

function BookTicket() {
  const [movieData, setMovieData] = useState("");
  const params = useParams();

  useEffect(() => {
    const getMovieData = async () => {
      // get movie data from local storage if present
      const check = localStorage.getItem("shows");
      if (check) {
        const data = JSON.parse(check);
        for (var i = 0; i < data.length; i++) {
          if (data[i].name.toString() === params.title.toString()) {
            setMovieData(data[i]);
          }
        }
      } else {
        // fetch data from api
        const api = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await api.json();
        let fetched_shows = [];
        for (var i = 0; i < data.length; i++) {
          fetched_shows.push(data[i].show);
        }
        localStorage.setItem("shows", JSON.stringify(fetched_shows));
        for (var i = 0; i < fetched_shows.length; i++) {
          if (fetched_shows[i].name.toString() === params.title.toString()) {
            setMovieData(fetched_shows[i]);
          }
        }
      }
    };
    getMovieData();
  }, [params.name]);

  const [movieName, setMovieName] = useState(movieData.name);
  const [schedule, setSchedule] = useState();
  const [status, setStatus] = useState(movieData.status);
  const [rating, setRating] = useState(movieData.rating);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "firstName") {
      setMovieName(value);
    }
    if (id === "schedule") {
      setSchedule(value);
    }
    if (id === "status") {
      setStatus(value);
    }
    if (id === "rating") {
      setRating(value);
    }
  };

  const handleSubmit = () => {
    console.log(movieName, schedule, status, setRating);
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="movieName">
            Movie Name{":"}
          </label>
          <input
            className="form__input"
            type="text"
            defaultValue={movieData.name}
            value={movieData.name}
            onChange={(e) => handleInputChange(e)}
            id="movieName"
          />
        </div>
        <div className="schedule">
          <label className="form__label" for="schedule">
            Schedule{":"}
          </label>
          <input
            type="text"
            id="schedule"
            className="form__input"
            defaultValue={movieData.schedule.time}
            value={movieData.schedule.time}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="status">
          <label className="form__label" for="status">
            Status{":"}
          </label>
          <input
            className="form__input"
            defaultValue={movieData.status}
            id="status"
            value={movieData.status}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="rating">
          <label className="form__label" for="rating">
            Rating{":"}
          </label>
          <input
            className="form__input"
            // type="password"
            id="rating"
            defaultValue={movieData.rating.average}
            value={movieData.rating.average}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <div className="footer">
        <button onClick={() => handleSubmit()} type="submit" className="btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default BookTicket;
