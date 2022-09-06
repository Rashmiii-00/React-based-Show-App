import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

function Home() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      const check = localStorage.getItem("shows");
      if (check) {
        setShows(JSON.parse(check));
      } else {
        const api = await fetch("https://api.tvmaze.com/search/shows?q=all");
        console.log(api, "API");
        const data = await api.json();
        console.log(data[0].show, "data");
        let fetched_shows = [];
        for (var i = 0; i < 10; i++) {
          fetched_shows.push(data[i].show);
        }
        console.log(fetched_shows[0].name, "fetched");
        localStorage.setItem("shows", JSON.stringify(fetched_shows));
        setShows(fetched_shows);
      }
    };
    getShows();
  }, []);

  return (
    <Grid>
      {shows.map((show) => {
        return (
          <Card key={show.id}>
            <Link to={"./summary/" + show.id}>
              <h4>{show.name}</h4>
              <img src={show.image.original} alt={show.name}></img>
              <div>
                <span style={{ color: "#04283D" }}>
                  <AiFillStar />
                  {show.rating.average}{" "}
                </span>

                {show.genres.map((genre) => (
                  <span style={{ color: "#04283D" }}>{genre + " "} </span>
                ))}
              </div>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 70%;
    height: 80%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1.5rem;
    color: #215879;
  }
  p {
    flex-direction: row;
  }
`;

export default Home;
