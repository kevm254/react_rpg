import React, { Component } from "react";
import Animate from "./Anim.component";
import Anime from "animejs";

export default class AnimSequencer extends Component {
  constructor(props) {
    super(props);
  }

  animQueue: [] = [];

  componentDidMount() {
    console.log("ANIMQUEUE", this.animQueue);
    this.props.animQueue
      ? this.props.animQueue.forEach(anim => {
          Anime(anim);
        })
      : null;
  }

  registerAnim(animData) {
    this.animQueue.push(animData);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
