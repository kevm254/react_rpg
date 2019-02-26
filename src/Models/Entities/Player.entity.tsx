import React, { Component } from "react";
import * as anime from "animejs";

export default class Player extends Component {
  // refs
  playerRef = React.createRef();
  innerPlayerRef = React.createRef();
  playerMouthRef = React.createRef();

  // constructor
  constructor(props) {
    super(props);

    this.state = {
      playerPos: { x: 0, y: 0 },
      maxHP: 10,
      currentHP: 10,
      playerDirection: "DOWN",
      rolled: false
    };
  }

  updatePlayerDirection(direction: string) {
    this.setState({ playerDirection: direction });
  }

  checkForDamage() {}

  // animate mouth
  setPlayerMouthPos(state: string) {
    switch (state) {
      case "DOWN":
        return "16px";
        break;
      case "LEFT":
        return "44px";
        break;
      case "RIGHT":
        return "-10px";
    }
  }

  animateMouth(ref) {
    anime({
      targets: [ref],
      scaleX: [1, 0.5, 1],
      scaleY: [1, 1.2, 1],
      easing: "linear",
      duration: 550,
      loop: true
    });
  }

  animateEyeLids(lids: string[]) {
    anime({
      // targets: [".player_left_eye_lid", ".player_right_eye_lid"],
      targets: lids,
      translateY: [0, -100, 0],
      loop: true,
      easing: "easeInQuart",
      loop: true,
      duration: 900
    });
  }

  animatePlayer() {
    this.animateMouth(this.playerMouthRef.current);

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

  setupKeyListeners() {
    document.body.addEventListener("keydown", e => {
      // RIGHT
      if (e.keyCode === Keys.RIGHT && this.canMove("RIGHT")) {
        e.preventDefault();
        this.setState({ playerXPos: this.state.playerXPos + 1 });
        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerXPos,
          easing: "easeOutQuad",
          duration: 300
        });

        this.updatePlayerDirection("RIGHT");

        this.setState({ isRolled: !this.state.isRolled });

        this.state.isRolled
          ? anime({
              targets: this.innerPlayerRef.current,
              rotate: [0, 180],
              easing: "easeOutQuad",
              duration: 350
            })
          : anime({
              targets: this.innerPlayerRef.current,
              rotate: [180, 360],
              easing: "easeOutQuad",
              duration: 350
            });

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }
      if (e.keyCode === Keys.LEFT && this.canMove("LEFT")) {
        e.preventDefault();
        this.setState({ playerXPos: this.state.playerXPos - 1 });

        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerXPos,
          easing: "easeOutCubic",
          duration: 300
        });

        this.updatePlayerDirection("LEFT");

        this.setState({ isRolled: !this.state.isRolled });

        this.state.isRolled
          ? anime({
              targets: this.innerPlayerRef.current,
              rotate: [360, 180],
              easing: "easeOutQuad",
              duration: 350
            })
          : anime({
              targets: this.innerPlayerRef.current,
              rotate: [180, 0],
              easing: "easeOutQuad",
              duration: 350
            });

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }

      if (e.keyCode === Keys.UP && this.canMove("UP")) {
        e.preventDefault();
        this.setState({ playerYPos: this.state.playerYPos - 1 });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerYPos,
          easing: "easeOutCubic",
          duration: 300
        });

        this.updatePlayerDirection("UP");

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }

      if (e.keyCode === Keys.DOWN && this.canMove("DOWN")) {
        this.setState({ playerYPos: this.state.playerYPos + 1 });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerYPos,
          // scaleX: [1, 1.05, 1],
          easing: "easeOutCubic",
          duration: 300
        });

        this.updatePlayerDirection("DOWN");

        this.checkForDamage({
          x: this.state.playerXPos,
          y: this.state.playerYPos
        });
      }
    });
  }

  render() {
    return (
      <div
        ref={this.playerRef}
        style={{
          position: "relative",
          height: "64px",
          width: "64px"
        }}
      >
        <div
          ref={this.innerPlayerRef}
          style={{
            height: "64px",
            top: "64px",
            width: "64px",
            borderRadius: "100px",
            backgroundColor: "royalblue",
            overflow: "hidden",
            position: "absolute",
            border: "1px solid black",
            boxSizing: "border-box",
            zIndex: 1
          }}
        >
          <img
            src={"./img/player_texture.png"}
            style={{
              position: "absolute",
              height: "64px",
              width: "64px",
              top: 0,
              left: 0
            }}
          />
          <div class="face" style={{ position: "relative" }}>
            {(this.state.playerDirection === "DOWN" ||
              this.state.playerDirection === "LEFT") && (
              <div
                className="player_eye_left"
                style={{
                  backgroundColor: "black",
                  borderRadius: "50px",
                  height: "17px",
                  width: "14px",
                  position: "absolute",
                  top: "11px",
                  left: "10px",
                  psoition: "relative",
                  border: "1px solid black",
                  backgroundColor: "white",
                  overflow: "hidden"
                }}
              >
                <div
                  className="player_left_eye_lid"
                  style={{
                    position: "absolute",
                    top: -44,
                    left: 0,
                    height: "17px",
                    width: "14px",
                    backgroundColor: "blue",
                    zIndex: 520
                  }}
                />
                <div
                  className="player_inner_eye_left"
                  style={{
                    position: "relative",
                    bottom: "-4px",
                    backgroundColor: "black",
                    height: "14px",
                    width: "14px",
                    borderRadius: "50px"
                  }}
                >
                  <div
                    className="player_inner_eye_left"
                    style={{
                      position: "absolute",
                      left: "7px",
                      top: "2px",
                      backgroundColor: "black",
                      height: "5px",
                      width: "5px",
                      backgroundColor: "white",
                      opacity: ".7",
                      borderRadius: "100px"
                    }}
                  />
                </div>
              </div>
            )}

            {(this.state.playerDirection === "DOWN" ||
              this.state.playerDirection === "RIGHT") && (
              <div
                className="player_eye_right"
                style={{
                  backgroundColor: "black",
                  borderRadius: "50px",
                  height: "17px",
                  width: "14px",
                  position: "absolute",
                  top: "11px",
                  right: "10px",
                  border: "1px solid black",
                  psition: "relative",
                  backgroundColor: "white",
                  overflow: "hidden"
                }}
              >
                <div
                  className="player_right_eye_lid"
                  style={{
                    position: "absolute",
                    top: -44,
                    left: 0,
                    height: "17px",
                    width: "14px",
                    backgroundColor: "blue",
                    zIndex: 520
                  }}
                />
                <div
                  className="player_inner_eye_right"
                  style={{
                    position: "relative",
                    bottom: "-4px",
                    backgroundColor: "black",
                    height: "14px",
                    width: "14px",
                    borderRadius: "50px"
                  }}
                >
                  <div
                    className="player_inner_eye_left"
                    style={{
                      position: "absolute",
                      left: "7px",
                      top: "2px",
                      backgroundColor: "black",
                      height: "5px",
                      width: "5px",
                      backgroundColor: "white",
                      opacity: ".7",
                      borderRadius: "100px"
                    }}
                  />
                </div>
              </div>
            )}

            {this.state.playerDirection !== "UP" && (
              <div
                className="player_mouth"
                style={{
                  backgroundColor: "black",
                  borderRadius: "50px",
                  height: "10px",
                  width: "25px",
                  position: "absolute",
                  top: "37px",
                  right: this.setPlayerMouthPos(this.state.playerDirection),
                  backgroundColor: "black",
                  border: "2px solid black"
                }}
                ref={this.playerMouthRef}
              >
                <div
                  className="player_inner_mouth"
                  style={{
                    height: "5px",
                    width: "10px",
                    borderRadius: "20px",
                    backgroundColor: "red",
                    position: "relative",
                    left: "7px",
                    top: "5px"
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          class="player_shadow"
          style={{
            position: "absolute",
            backgroundColor: "black",
            borderRadius: "190px",
            height: "14px",
            width: "55px",
            left: "0px",
            opacity: ".4",
            top: "115px",
            zIndex: 0
          }}
        />
      </div>
    );
  }
}
