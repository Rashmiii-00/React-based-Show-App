import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

function Summary() {
  const [summary, setSummary] = useState("");
  const params = useParams();

  useEffect(() => {
    const getSummary = async () => {
      const check = localStorage.getItem("shows");
      // get data from localstorage if present
      if (check) {
        const data = JSON.parse(check);
        for (var i = 0; i < data.length; i++) {
          if (data[i].id.toString() === params.name.toString()) {
            setSummary(data[i]);
            // console.log(summary);
          }
        }
      } else {
        // fetch from api
        const api = await fetch("https://api.tvmaze.com/search/shows?q=all");
        const data = await api.json();
        let fetched_shows = [];
        for (var i = 0; i < 10; i++) {
          fetched_shows.push(data[i].show);
        }
        localStorage.setItem("shows", JSON.stringify(fetched_shows));
        for (var i = 0; i < fetched_shows.length; i++) {
          if (fetched_shows[i].id.toString() === params.name.toString()) {
            setSummary(fetched_shows[i]);
            console.log(summary);
          }
        }
      }
    };
    getSummary();
  }, [params.name]);
  return (
    <SummaryWrapper>
      <div>
        <h2 style={{ color: "#0C2A34" }}>{summary.name}</h2>
        <img src={summary.image.original} alt=""></img>
      </div>
      <Info>
        <h4 style={{ color: "#0C2A34" }}>Summary</h4>
        <p
          style={{ color: "#053F76" }}
          dangerouslySetInnerHTML={{ __html: summary.summary }}
        ></p>
        <Link to={"./book/" + summary.name}>
          <Button style={{ color: "#0C2A34" }}>Book Ticket</Button>
        </Link>
      </Info>
    </SummaryWrapper>
  );
}
const SummaryWrapper = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  display: flex;
  img {
    width: 100%;
    border-radius: 2rem;
  }
  h2 {
    margin-bottom: 2rem;
    color: 052638;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  margin: 1rem 2rem;
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Summary;
