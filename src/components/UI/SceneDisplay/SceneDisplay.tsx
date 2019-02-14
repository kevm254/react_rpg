import React, { Component } from "react";
import "./SceneDisplay.css";

export default class SceneDisplay extends Component {
  render() {
    return (
      <div style={{ height: "400px" }} className={"scene-display-container"}>
        <img
          style={{ height: "350px" }}
          src="https://i.pinimg.com/originals/4c/82/0e/4c820e2dd67a7a6dbbc3804db7a2eb66.jpg"
        />
      </div>
    );
  }
}
