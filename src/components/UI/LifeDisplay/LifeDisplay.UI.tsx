import React, { Component } from "react";
import Heart from "./Partials/Heart/Heart.partial";

export default class LifeDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxHP: []
    };
  }

  componentWillMount() {
    this.getHearts();
  }

  getHearts() {
    for (let i = 0; i < 3; i++) {
      this.setState({ maxHP: this.state.maxHP.push(<Heart />) });
    }
    this.test = this.state.maxHP[0];
  }

  render() {
    return (
      <div>
        <Heart />
        <Heart />
        <Heart />
      </div>
    );
  }
}
