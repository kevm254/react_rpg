import React, { Component } from "react";
import Animate from "./Anim.component";

export default class AnimSequencer extends Component {
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
