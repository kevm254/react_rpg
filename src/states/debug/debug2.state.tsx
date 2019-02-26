import React, { Component } from "react";
import Player from "../../Models/Entities/Player.entity";

export default class Debug2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          color: "white"
        }}
      >
        <Player />
      </div>
    );
  }
}
