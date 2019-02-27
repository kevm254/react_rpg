import React, { Component } from "react";
import anime from "animejs";
import PlayerAnims from "./Player.anim";
import { Keys } from "../../keys.model";
import PlayerStyles from "./Player.styles";

export default class Player extends Component {
  // refs
  playerRef = React.createRef();
  innerPlayerRef = React.createRef();
  playerMouthRef = React.createRef();
  leftEyeRef = React.createRef();
  rightEyeRef = React.createRef();

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

  componentDidMount() {
    this.initPlayerPos();
    this.setupKeyListeners();
    this.animateFaceOnInit();
  }

  initPlayerPos() {
    this.props.startPos
      ? this.setPlayerPos(this.props.startPos)
      : this.setPlayerPos({ x: 0, y: 0 });
  }

  setPlayerPos(pos: { x: number; y: number }) {
    this.setState({ playerPos: pos });
  }
  updatePlayerDirection(direction: string) {
    this.setState({ playerDirection: direction });
  }

  // animate mouth
  setPlayerMouthPos(state: string) {
    switch (state) {
      case "DOWN":
        return "16px";
        break;
      case "UP":
        return "16px";
        break;
      case "LEFT":
        return "44px";
        break;
      case "RIGHT":
        return "-10px";
    }
  }

  animatePlayer() {
    this.animateFaceOnInit();
  }

  animateFaceOnInit() {
    PlayerAnims.animateMouth(this.playerMouthRef.current);
    PlayerAnims.animateLeftPupil();
    PlayerAnims.animateRightPupil();
  }

  canMove(direction: string) {
    switch (direction) {
      case "LEFT":
        return (
          this.props.obstructionMap[this.state.playerPos.y][
            this.state.playerXPos - 1
          ] !== 1 && this.state.playerPos.x > 0
        );
      case "RIGHT":
        return (
          this.props.obstructionMap[this.state.playerPos.y][
            this.state.playerPos.x + 1
          ] !== 1 &&
          this.state.playerPos.x < this.props.obstructionMap[0].length - 1
        );
      case "UP":
        return (
          this.props.obstructionMap[this.state.playerPos.y - 1][
            this.state.playerPos.x
          ] !== 1
        );
      case "DOWN":
        return (
          this.props.obstructionMap[this.state.playerPos.y + 1][
            this.state.playerPos.x
          ] !== 1
        );
    }
  }

  setupKeyListeners() {
    document.body.addEventListener("keydown", e => {
      // RIGHT
      if (e.keyCode === Keys.RIGHT && this.canMove("RIGHT")) {
        e.preventDefault();
        this.setState({
          playerPos: { ...this.state.playerPos, x: this.state.playerPos.x + 1 }
        });
        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerPos.x,
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

        this.props.checkForDamage(this.state.playerPos);
      }

      if (e.keyCode === Keys.LEFT && this.canMove("LEFT")) {
        e.preventDefault();
        this.setState({
          playerPos: { ...this.state.playerPos, x: this.state.playerPos.x - 1 }
        });

        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerPos.x,
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

        this.props.checkForDamage(this.state.playerPos);
      }

      if (e.keyCode === Keys.UP && this.canMove("UP")) {
        e.preventDefault();
        this.setState({
          playerPos: { ...this.state.playerPos, y: this.state.playerPos.y - 1 }
        });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerPos.y,
          easing: "easeOutCubic",
          duration: 300
        });

        anime({
          targets: [
            this.leftEyeRef.current,
            this.rightEyeRef.current,
            this.playerMouthRef.current
          ],

          rotate: "180deg",
          easing: "linear",
          duration: 0
        });

        this.updatePlayerDirection("UP");
        this.setState({ isRolled: !this.state.isRolled });

        this.state.isRolled
          ? anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],

              translateY: [-100, 0],
              easing: "linear",
              duration: 500
            })
          : anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],
              translateY: [0, 100],
              easing: "linear",
              duration: 500
            });

        this.props.checkForDamage(this.state.playerPos);
      }

      if (e.keyCode === Keys.DOWN && this.canMove("DOWN")) {
        this.setState({
          playerPos: {
            ...this.state.playerPos,
            y: this.state.playerPos.y + 1
          }
        });
        anime({
          targets: this.playerRef.current,
          translateY: 64 * this.state.playerPos.y,
          easing: "easeOutCubic",
          duration: 300
        });

        this.updatePlayerDirection("DOWN");
        this.setState({ isRolled: !this.state.isRolled });

        this.state.isRolled
          ? anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],

              translateY: [-100, 0],
              easing: "linear",
              duration: 500
            })
          : anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],
              translateY: [0, 100],
              easing: "linear",
              duration: 500
            });

        this.props.checkForDamage(this.state.playerPos);
      }
    });
  }

  render() {
    return (
      <div
        ref={this.playerRef}
        style={{
          top: 32,
          position: "relative",
          height: "64px",
          width: "64px"
        }}
      >
        <div
          className={"debug"}
          style={{
            position: "fixed",
            color: "white",
            zIndex: 400,
            backgroundColor: "darkblue"
          }}
        >
          {/*JSON.stringify(this.state) */}
        </div>
        <div ref={this.innerPlayerRef} style={PlayerStyles.getBodyStyles()}>
          <img
            src={"./img/player_texture.png"}
            style={PlayerStyles.getTextureStyles()}
          />
          <div className="face" style={{ position: "relative" }}>
            {(this.state.playerDirection === "UP" ||
              this.state.playerDirection === "DOWN" ||
              this.state.playerDirection === "LEFT") && (
              <div
                className="player_eye_left"
                ref={this.leftEyeRef}
                style={PlayerStyles.getOuterEyeStyles({
                  top: "11px",
                  left: "10px"
                })}
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
                      opacity: ".7",
                      borderRadius: "100px"
                    }}
                  />
                </div>
              </div>
            )}

            {(this.state.playerDirection === "UP" ||
              this.state.playerDirection === "DOWN" ||
              this.state.playerDirection === "RIGHT") && (
              <div
                className="player_eye_right"
                ref={this.rightEyeRef}
                style={PlayerStyles.getOuterEyeStyles({
                  top: "11px",
                  right: "10px"
                })}
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
                      opacity: ".7",
                      borderRadius: "100px"
                    }}
                  />
                </div>
              </div>
            )}

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
          </div>
        </div>
        <div
          className="player_shadow"
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
