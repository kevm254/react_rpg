import React, { Component } from "react";

export default class Tilemap extends Component {
  constructor(props) {
    super(props);
  }

  getTile(number) {
    switch (number) {
      case 1:
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cS6HEDK-fEvCFDP2rx2B1xaHogF3HvlfWJQslbQun7SDOp-c";
      case 2:
        return "http://www.textures4photoshop.com/tex/thumbs/sand-with-pebbles-texture-high-res-thumb34.jpg";
      case 3:
        return "https://img-aws.ehowcdn.com/350x235p/photos.demandstudios.com/getty/article/178/191/78325586_XS.jpg";
      case 4:
        return "http://pixelartmaker.com/art/7d4798f93892ddc.png";
    }
  }
  render() {
    return (
      <div
        style={{
          display: this.props.row ? "inline-block" : "block",
          backgroundColor: this.props.color || "blue",
          height: 64,
          width: 64,
          border: this.props.showBorder ? "1px solid white" : "",
          overflow: "hidden",
          marginTop: "-4px"
        }}
      >
        <img src={this.getTile(this.props.tileNo)} />
      </div>
    );
  }
}
