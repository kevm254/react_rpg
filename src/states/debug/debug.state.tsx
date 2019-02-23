import React, { Component } from "react";
import TextBox from "../../components/UI/TextBox/TextBox";
import Tile from "../../components/Tile/Tilemap/Tilemap.component";
import anime from "animejs";
import { Keys } from "../../Models/keys.model";

export default class DebugState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: [],
      playerXPos: 0,
      playerYPos: 0,
      maxHP: 10,
      currentHP: 10
    };

    this.bindAll();
  }
  playerRef = React.createRef();
  playerMouthRef = React.createRef();

  data = [
    [1, 3, 1, 4, 1, 1, 1, 2, 1, 1],
    [1, 3, 1, 4, 4, 2, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1],
    [3, 3, 3, 3, 1, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 1, 2, 1, 2, 1, 1],
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

  obstructionMap = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
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

  tiles = [];

  bindAll() {
    this.restartGame = this.restartGame.bind(this);
  }

  componentWillMount() {
    this.renderRow(this.data);
  }

  componentDidMount() {
    anime({
      targets: [this.playerMouthRef.current],
      scaleX: [1, 0.5, 1],
      scaleY: [1, 1.2, 1],
      easing: "linear",
      duration: 550,
      loop: true
    });

    anime({
      targets: [".player_inner_eye_left"],
      translateY: [0, 1, 0, -1, 0],
      translateX: [0, 1, 0, 1],
      easing: "linear",
      loop: true,
      duration: 800
    });

    anime({
      targets: [".player_inner_eye_right"],
      translateY: [0, 2, 0, -1, 0],
      translateX: [0, -1, 0, -1, 0],
      easing: "linear",
      loop: true,
      duration: 800
    });

    document.body.addEventListener("keydown", e => {
      if (e.keyCode === Keys.RIGHT && this.canMove("RIGHT")) {
        e.preventDefault();
        this.setState({ playerXPos: this.state.playerXPos + 1 });
        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerXPos,
          // scale: [1, 1.05, 1],
          easing: "linear",
          duration: 300
        });

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }
      if (e.keyCode === Keys.LEFT && this.canMove("LEFT")) {
        e.preventDefault();
        this.setState({ playerXPos: this.state.playerXPos - 1 });

        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerXPos,
          // scale: [1, 1.05, 1],
          easing: "linear",
          duration: 300
        });

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }

      if (e.keyCode === Keys.UP && this.canMove("UP")) {
        e.preventDefault();
        this.setState({ playerYPos: this.state.playerYPos - 1 });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerYPos,
          // scale: [1, 1.05, 1],
          easing: "linear",
          duration: 300
        });

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }

      if (e.keyCode === Keys.DOWN && this.canMove("DOWN")) {
        this.setState({ playerYPos: this.state.playerYPos + 1 });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerYPos,
          // scaleX: [1, 1.05, 1],
          easing: "linear",
          duration: 300
        });

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
        // moveCharacterY(this.state.playerYPos);
      }
    });

    setTimeout(() => {
      this.data[1][2] = 3;
      this.tiles[1][2] = this.setState({ tiles: this.tiles });
    }, 3000);
  }

  moveCharacterY(playerYPos: number) {
    return anime({
      targets: this.playerRef.current,
      translateY: 64 * playerYPos,
      easing: "linear"
    });
  }

  checkForDamage(playerPos) {
    if (this.damageMap[playerPos.y][playerPos.x] === 1) {
      setTimeout(() => {
        anime({
          targets: this.playerRef.current,
          scale: [1, 5, 1],
          rotate: 720,
          easing: "easeOutCubic"
        });
      }, 200);

      setTimeout(() => {
        this.setState({ currentHP: 0 });
      }, 1100);
    }
  }

  canMove(direction: string) {
    switch (direction) {
      case "LEFT":
        return (
          this.obstructionMap[this.state.playerYPos][
            this.state.playerXPos - 1
          ] !== 1 && this.state.playerXPos > 0
        );
      case "RIGHT":
        return (
          this.obstructionMap[this.state.playerYPos][
            this.state.playerXPos + 1
          ] !== 1 && this.state.playerXPos < this.data[0].length - 1
        );
      case "UP":
        return (
          this.obstructionMap[this.state.playerYPos - 1][
            this.state.playerXPos
          ] !== 1
        );
      case "DOWN":
        return (
          this.obstructionMap[this.state.playerYPos + 1][
            this.state.playerXPos
          ] !== 1
        );
    }
  }

  renderRow(dataSource, row: boolean) {
    dataSource.forEach(row => {
      this.tiles.push(
        row.map((item, i) => {
          return (
            <Tile color="green" row={true} tileNo={item} showBorder={false} />
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

  render() {
    return (
      <div style={{ backgroundColor: "#000000", color: "#FFFFFF" }} id="player">
        <h1>Debug Screen</h1>
        {this.state.currentHP !== 0 ? (
          <div id="game_container">
            <div style={{ position: "fixed", bottom: "50px", left: "50px" }}>
              Hit Points: {this.state.currentHP}/ {this.state.maxHP}
            </div>
            <div style={{ position: "fixed", right: "50px" }}>
              PlayerPos: [{this.state.playerXPos}, {this.state.playerYPos}]
            </div>
            <div
              style={{
                height: "64px",
                width: "64px",
                borderRadius: "100px",
                backgroundColor: "blue",
                background:
                  "radial-gradient(circle, rgba(238, 174, 202, 1) 0 %, rgba(64, 32, 180, 1) 100 %)",
                top: "32px",
                position: "absolute",
                border: "1px solid black",
                boxSizing: "border-box"
              }}
              ref={this.playerRef}
            >
              <div class="face" style={{ position: "relative" }}>
                <div
                  className="player_eye_left"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "50px",
                    height: "17px",
                    width: "17px",
                    position: "absolute",
                    top: "11px",
                    left: "7px",
                    border: "1px solid black",
                    backgroundColor: "white",
                    overflow: "hidden"
                  }}
                >
                  <div
                    className="player_inner_eye_left"
                    style={{
                      position: "relative",
                      bottom: "2px",
                      backgroundColor: "black",
                      height: "14px",
                      width: "14px",
                      borderRadius: "50px"
                    }}
                  />
                </div>
                <div
                  className="player_eye_right"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "50px",
                    height: "17px",
                    width: "17px",
                    position: "absolute",
                    top: "11px",
                    right: "7px",
                    border: "1px solid black",
                    backgroundColor: "white",
                    overflow: "hidden"
                  }}
                >
                  <div
                    className="player_inner_eye_right"
                    style={{
                      position: "relative",
                      bottom: "2px",
                      backgroundColor: "black",
                      height: "14px",
                      width: "14px",
                      borderRadius: "50px"
                    }}
                  />
                </div>
                <div
                  className="player_mouth"
                  style={{
                    backgroundColor: "black",
                    borderRadius: "50px",
                    height: "10px",
                    width: "25px",
                    position: "absolute",
                    top: "37px",
                    right: "16px",
                    backgroundColor: "black",
                    border: "2px solid black"
                  }}
                  ref={this.playerMouthRef}
                >
                  <div
                    className="player_inner_mouth"
                    style={{
                      height: "5px",
                      width: "10px",
                      borderRadius: "20px",
                      backgroundColor: "red",
                      position: "relative",
                      left: "7px",
                      top: "5px"
                    }}
                  />
                </div>
              </div>
            </div>
            {this.state.tiles}
          </div>
        ) : (
          <div>
            <p>GAME OVER! You were burnt to a crisp...</p>
            <button onClick={this.restartGame}>Restart</button>
          </div>
        )}
      </div>
    );
  }
}
