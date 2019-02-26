import React, { Component } from "react";

export default class Tilemap extends Component {
  constructor(props) {
    super(props);
  }

  getTile(number) {
    switch (number) {
      case 1:
        return "./img/grass.png";
      case 2:
        return "./img/dirt.png";
      case 3:
        return "./img/boulder.png";
      case 4:
        return "./img/lava.png";
      case 5:
        return "./img/lava-left.png";
    }
  }

  getBrightness() {
    return `rgba(0, 0, 0, ${this.props.brightness || 0})`;
  }
  render() {
    return (
      <div
        style={{
          display: this.props.row ? "inline-block" : "block",
          height: 64,
          width: 64,
          border: this.props.showBorder ? "1px solid white" : "",
          overflow: "hidden",
          marginTop: "-4px"
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "64px",
            width: "64px",
            backgroundColor: this.getBrightness()
          }}
        />
        <img src={this.getTile(this.props.tileNo)} />
      </div>
    );
  }
}
