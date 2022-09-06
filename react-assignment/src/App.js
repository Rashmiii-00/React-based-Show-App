import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import styled from "styled-components";
function App() {
  return (
    <div className="App">
      <Header>TV MAZE SHOWS</Header>

      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

const Header = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #084c5b;
`;
export default App;
