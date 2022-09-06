import React from "react";
import Home from "../components/Home";
import { Route, Routes } from "react-router-dom";
import Summary from "./Summary";
import BookTicket from "./BookTicket";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/summary/:name" element={<Summary />} />
      <Route path="summary/:id/book/:title" element={<BookTicket />} />
    </Routes>
  );
}

export default Pages;
