import React, { Component } from "react";
import * as anime from "animejs";

export default class Player {
  // refs
  playerRef = React.createRef();
  innerPlayerRef = React.createRef();
  playerMouthRef = React.createRef();

  // constructor
  constructor(props) {
    this.state = {
      playerXPos: 0,
      playerYPos: 0,
      maxHP: 10,
      currentHP: 10,
      playerDirection: "DOWN",
      rolled: false
    };
  }

  animatePlayer() {
    anime({
      targets: [this.playerMouthRef.current],
      scaleX: [1, 0.5, 1],
      scaleY: [1, 1.2, 1],
      easing: "linear",
      duration: 550,
      loop: true
    });

    anime({
      targets: [".player_inner_eye_left"],
      translateY: [0, 1, 0, -1, 0],
      translateX: [0, 1, 0, 1],
      easing: "linear",
      loop: true,
      duration: 800
    });

    anime({
      targets: [".player_inner_eye_right"],
      translateY: [0, 2, 0, -1, 0],
      translateX: [0, -1, 0, -1, 0],
      easing: "linear",
      loop: true,
      duration: 800
    });
  }
}
