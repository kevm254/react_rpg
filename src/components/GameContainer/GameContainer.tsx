import React, { Component } from "react";
import StartGame from "../../states/playGame/playGame.component";
import Title from "../../states/title/Title";
import * as THREE from "three";

export default class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentState: "TITLE"
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
      default:
        return <Title events={{ updateGameState: this.updateGameState }} />;
    }
  }

  updateGameState() {
    this.setGameState("START_GAME");
  }

  render() {
    return (
      <div style={{ height: 400, width: 800 }}>
        {this.getGameState(this.state.currentState)}
      </div>
    );
  }
}
