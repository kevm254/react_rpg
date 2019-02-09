import * as React from "react";
import * as anime from "animejs";
import { render } from "react-dom";
import EditProject from "./EditProject";

import GameContainer from "./components/GameContainer/GameContainer";

import "./styles.css";

function App() {
  return <GameContainer />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
