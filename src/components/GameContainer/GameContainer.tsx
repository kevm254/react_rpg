import React, { Component } from "react";
import InputListener from "../InputListener/InputListener.component";
import StartGame from "../../states/playGame/playGame.component";
import Title from "../../states/title/Title";
import Debug from "../../states/debug/debug.state";
import Debug2 from "../../states/debug/debug2.state";
import * as THREE from "three";

export default class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: "DEBUG"
    };

    this.bindAll();
  }

  bindAll() {
    this.setGameState = this.setGameState.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
  }

  componentDidMount() {}

  setGameState(newState: string) {
    this.setState({ currentState: newState });
  }

  getGameState(state: string) {
    switch (state) {
      case "TITLE":
        return <Title events={{ updateGameState: this.updateGameState }} />;
      case "START_GAME":
        return <StartGame />;
      case "DEBUG":
        return <Debug />;
      case "DEBUG2":
        return <Debug2 />;
      default:
        return <Title events={{ updateGameState: this.updateGameState }} />;
    }
  }

  updateGameState() {
    this.setGameState("START_GAME");
  }

  render() {
    return (
      <div style={{ height: 550, width: 800, overflow: "hidden" }}>
        <InputListener>
          {this.getGameState(this.state.currentState)}
        </InputListener>
      </div>
    );
  }
}
