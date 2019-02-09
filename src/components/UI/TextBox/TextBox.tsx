import React, { Component } from "react";

export default class TextBox extends Component {
  map = [[this.startText, this.defaultText], ["b", "c"]];

  currentPos = [0, 0];

  startText: string = "You are at the starting position";
  defaultText: string = `You wake up in the remains of a once beautiful, but now ruined city.
       Flames lick up all around you, devouring the remains of houses and cars. 
       In the midst of the chaos, you take a small minute to ponder how or why
       you survived. You see a stranger approaching...`;

  constructor(props) {
    super(props);

    this.state = {
      currentText: this.defaultText
    };

    this.bindAll();
    this.setupKeys();
  }

  bindAll() {
    this.alertMe = this.alertMe.bind(this);
    this.setupKeys = this.setupKeys.bind(this);
  }

  setupKeys() {
    document.body.addEventListener("keyup", evt => {
      if (evt.keyCode === 49) {
        alert("up");
      }
    });
  }

  alertMe() {
    this.setState({
      currentText:
        "Everything around you is ruined. To your left, there is a road."
    });
  }

  moveUp() {}

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "250px",
          border: "2px solid white",
          color: "white",
          position: "relative"
        }}
      >
        <div>
          <p>{this.state.currentText}</p>
        </div>

        <div
          className="player_actions_menu"
          style={{
            position: "absolute",
            bottom: "10px",
            display: "flex"
          }}
        />
      </div>
    );
  }
}
