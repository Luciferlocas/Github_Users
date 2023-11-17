import React from "react";
import ReactDOM from "react-dom/client";
import Nav from "./Components/nav.jsx";
import "./style.css";
import Para from "./Components/para.jsx";
import SearchBar from "./Components/searchbar.jsx";
import Cursor from "./Components/cursor.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Cursor />
  </>
);

ReactDOM.createRoot(document.getElementById("main")).render(
  <>
    <Nav />
    <Para />
    <SearchBar />
  </>
);
