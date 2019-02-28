import React, { Component } from "react";
import TextBox from "../../components/UI/TextBox/TextBox";
import Tile from "../../components/Tile/Tilemap/Tile.component";
import Player from "../../Models/Entities/Player/Player.entity";
import anime from "animejs";
import { Keys } from "../../Models/keys.model";

export default class DebugState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: [],
      showObstrructions: false,
      playerPos: { x: 0, y: 0 },
      updatePlayerHP: 0,
      gameOver: false
    };

    this.bindAll();
  }

  data = [
    [2, 3, 1, 5, 1, 1, 1, 2, 1, 1],
    [2, 3, 3, 5, 4, 4, 4, 4, 4, 1],
    [2, 2, 2, 2, 2, 2, 1, 2, 4, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [3, 3, 3, 3, 3, 2, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1]
  ];

  itemMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  lightMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  obstructionMap = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  damageMap = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  tiles = [];

  bindAll() {
    this.restartGame = this.restartGame.bind(this);
    this.toggleObstructionMap = this.toggleObstructionMap.bind(this);
    this.updatePlayerPos = this.updatePlayerPos.bind(this);
    this.checkForDamage = this.checkForDamage.bind(this);
    this.resetDamage = this.resetDamage.bind(this);
    this.showGameOver = this.showGameOver.bind(this);
  }

  componentWillMount() {
    this.renderRow(this.data);
  }

  updatePlayerPos(pos: { x: number; y: number }) {
    this.setState({ playerPos: pos });
  }

  checkForDamage(playerPos) {
    if (this.damageMap[playerPos.y][playerPos.x] === 1) {
      this.setState({ updatePlayerHP: -5 });
      this.setState({ updatePlayerHP: 0 });
    }
  }

  resetDamage() {
    this.setState({ updatePlayerHP: 0 });
  }

  renderRow(dataSource: [], row: boolean) {
    dataSource.map((row, i) => {
      let currentRow = i;

      this.tiles.push(
        row.map((item, i) => {
          return (
            <Tile
              color="green"
              row={true}
              tileNo={item}
              showBorder={false}
              brightness={this.lightMap[currentRow][i]}
            />
          );
        }),
        <br />
      );
    });
    this.setState({ tiles: this.tiles });
  }

  restartGame() {
    this.setState({ playerXPos: 0, playerYPos: 0, currentHP: 10 });
  }

  gameOver() {
    return (
      <div>
        <p>GAME OVER! You were burnt to a crisp...</p>
        <button onClick={this.restartGame}>Restart</button>
      </div>
    );
  }

  toggleObstructionMap() {
    this.setState({ showObstructions: !this.state.showObstructions });
  }

  showGameOver() {
    this.setState({ gameOver: true });
  }

  renderUI(state) {
    return (
      <div>
        <div style={{ position: "fixed", bottom: "50px", left: "50px" }}>
          Hit Points: {this.state.currentHP}/ {this.state.maxHP}
        </div>
        <div style={{ position: "fixed", right: "50px" }}>
          PlayerPos: [{this.state.playerXPos}, {this.state.playerYPos}]
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          transform: "rotateY('200deg')"
        }}
        id="debug_container"
      >
        <div style={{ color: "white" }}>{this.state.gameOver.toString()}</div>

        <h1>Debug Screen</h1>
        <button onClick={this.toggleObstructionMap}>Toggle Obstructions</button>
        {!this.state.gameOver ? (
          <div id="game_container">
            <Player
              playerOffset={{ x: 0, y: 0 }}
              obstructionMap={this.obstructionMap}
              updatePlayerPos={this.updatePlayerPos}
              checkForDamage={this.checkForDamage}
              resetDamage={this.resetDamage}
              updatePlayerHP={this.state.updatePlayerHP}
              showGameOver={this.showGameOver}
            />
            {this.renderUI(this.state)}
            {this.state.tiles}
          </div>
        ) : (
          this.gameOver()
        )}
      </div>
    );
  }
}
