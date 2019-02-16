import React, { Component } from "react";
import Animate from "./Animate.component";

export default class AnimateSequencer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.children);
    this.props.children.forEach(child => {
      console.log(child.type.name === "Animate");
    });
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
