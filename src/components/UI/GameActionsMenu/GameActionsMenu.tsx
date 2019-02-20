import React, { Component } from "react";
import "./GameActionsMenu.css";
import { Keys } from "../../../Models/keys.model";

enum Icon {
  MOVE = 0,
  LOOK = 1,
  INVESTIGATE = 2
}

export default class GameActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIcon: 0
    };
    this.bindAll();
  }

  componentDidMount() {
    document.addEventListener("keyup", e => {
      if (e.keyCode === Keys.DOWN || e.keyCode === Keys.LEFT) {
        if (this.state.selectedIcon <= 2 && this.state.selectedIcon >= 1) {
          this.setState({ selectedIcon: this.state.selectedIcon - 1 });
        }
      }
      if (e.keyCode === Keys.UP || e.keyCode === Keys.RIGHT) {
        if (this.state.selectedIcon >= 0 && this.state.selectedIcon <= 1) {
          this.setState({ selectedIcon: this.state.selectedIcon + 1 });
        }
      }
    });
  }

  bindAll() {}

  render() {
    return (
      <div style={{ backgroundColor: "black" }} className="menu-container">
        <p
          style={{
            height: "50px",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid gray",
            backgroundColor:
              this.state.selectedIcon === Icon.MOVE ? "blue" : "darkgray"
          }}
        >
          <i class="far fa-boot" />
        </p>
        <p
          style={{
            height: "50px",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid gray",
            backgroundColor:
              this.state.selectedIcon === Icon.LOOK ? "blue" : "darkgray"
          }}
        >
          <i class="far fa-eye" />
        </p>
        <p
          style={{
            height: "50px",
            width: "50px",
            display: "flex",
            justifyContent: "center",
            border: "2px solid gray",
            alignItems: "center",
            backgroundColor:
              this.state.selectedIcon === Icon.INVESTIGATE ? "blue" : "darkgray"
          }}
        >
          <i class="fas fa-search" />
        </p>
      </div>
    );
  }
}
