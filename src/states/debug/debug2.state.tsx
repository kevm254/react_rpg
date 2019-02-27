import React, { Component } from "react";
import Player from "../../Models/Entities/Player/Player.entity";

export default class Debug2 extends Component {
  constructor(props) {
    super(props);
  }

  canMove() {
    return true;
  }

  checkForDamage() {}

  render() {
    return (
      <div
        style={{
          color: "white"
        }}
      >
        <Player canMove={this.canMove} checkForDamage={this.checkForDamage} />
      </div>
    );
  }
}
