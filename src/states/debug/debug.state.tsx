import React, { Component } from "react";
import TextBox from "../../components/UI/TextBox/TextBox";
import Tile from "../../components/Tile/Tilemap/Tilemap.component";
import anime from "animejs";
import { Keys } from "../../Models/keys.model";

export default class DebugState extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerXPos: 0,
      playerYPos: 0
    };
  }
  playerRef = React.createRef();

  data = [
    [1, 3, 1, 2, 1, 1, 1, 2, 1, 1],
    [1, 3, 1, 1, 1, 2, 1, 2, 1, 1],
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

  tiles = [];

  componentWillMount() {
    this.renderRow(this.data);

    console.log(this.tiles);
  }

  componentDidMount() {
    document.body.addEventListener("keydown", e => {
      if (e.keyCode === Keys.RIGHT) {
        if (
          this.obstructionMap[this.state.playerYPos][
            this.state.playerXPos + 1
          ] !== 1
        ) {
          this.setState({ playerXPos: this.state.playerXPos + 1 });
          anime({
            targets: this.playerRef.current,
            translateX: 64 * this.state.playerXPos,
            easing: "linear"
          });
        }
      }
      if (e.keyCode === Keys.LEFT) {
        this.setState({ playerXPos: this.state.playerXPos - 1 });
        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerXPos,
          easing: "linear"
        });
      }
      if (e.keyCode === Keys.UP) {
        this.setState({ playerYPos: this.state.playerYPos - 1 });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerYPos,
          easing: "linear"
        });
      }

      if (e.keyCode === Keys.DOWN) {
        this.setState({ playerYPos: this.state.playerYPos + 1 });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerYPos,
          easing: "linear"
        });
      }
    });
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
  }
  render() {
    return (
      <div style={{ backgroundColor: "#000000", color: "#FFFFFF" }} id="player">
        <h1>Debug Screen</h1>
        <div style={{ position: "fixed", right: "50px" }}>
          PlayerPos: [{this.state.playerXPos}, {this.state.playerYPos}]
        </div>
        <div
          style={{
            height: "64px",
            width: "64px",
            borderRadius: "100px",
            backgroundColor: "blue",
            position: "absolute"
          }}
          ref={this.playerRef}
        />
        {this.tiles}
      </div>
    );
  }
}
