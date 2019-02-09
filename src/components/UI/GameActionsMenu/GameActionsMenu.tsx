import React, { Component } from "react";
import "./GameActionsMenu.css";

export default class GameActions extends Component {
  constructor(props) {
    super(props);

    this.bindAll();
  }

  bindAll() {}

  render() {
    return (
      <div className="menu-container">
        <p>Move</p>
        <p>Look</p>
        <p>Investigate</p>
      </div>
    );
  }
}
