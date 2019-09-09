import React from "react";
import ReactDOM from "react-dom";
import Notes from "./containers/Notes";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return <Notes />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
