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
        return "./img/tiles/boulder.png";
      case 4:
        return "./img/lava.png";
      case 5:
        return "./img/lava-left.png";
      case 7:
        return "./img/tiles/wall.png";
    }
  }

  getBrightness() {
    return `rgba(0, 0, 0, ${this.props.brightness || 0})`;
  }

  renderBrightnessLayer() {
    return (
      <div
        style={{
          position: "absolute",
          height: "64px",
          width: "64px",
          backgroundColor: this.getBrightness()
        }}
      />
    );
  }

  renderObstructionLayer() {
    return (
      <div
        style={{
          position: "absolute",
          height: "64px",
          width: "64px",
          backgroundColor: `rgba(0, 0, 0, ${
            this.props.showObsLayer ? 0.5 : 0
          })`,
          zIndex: 800
        }}
      />
    );
  }

  render() {
    return (
      <div
        style={{
          display: "inline-block",
          height: 64,
          width: 64,
          border: this.props.showBorder ? "1px solid white" : "",
          overflow: "hidden",
          marginTop: "-4px"
        }}
      >
        {this.renderObstructionLayer()}

        {this.props.tileNo === 0 ? null : (
          <img src={this.getTile(this.props.tileNo)} />
        )}
      </div>
    );
  }
}
