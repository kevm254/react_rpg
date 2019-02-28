import React, { Component } from "react";
import anime from "animejs";
import PlayerAnims from "./Player.anim";
import PlayerFace from "./Partials/Face.partial";
import { Keys } from "../../keys.model";
import PlayerShadow from "./Partials/Shadow.partial";
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
      previousPlayerDirection: null,
      playerDirection: "DOWN",
      rolled: false,
      rollAnimIsPlaying: false
    };
    this.bindAll();
  }

  bindAll() {
    this.playerIsNotRolling = this.playerIsNotRolling.bind(this);
    this.updatePlayerHP = this.updatePlayerHP.bind(this);
  }

  componentDidMount() {
    this.initPlayerPos();
    this.setupKeyListeners();
    this.animateFaceOnInit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updatePlayerHP !== this.props.updatePlayerHP) {
      this.updatePlayerHP(-5);
      this.props.resetDamage();
      if (this.state.currentHP <= 0) {
        alert("game finished");
      }
    }
  }

  updatePlayerHP(hp: number) {
    this.setState({ currentHP: this.state.currentHP + hp });
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

  setPlayerIsRolling(isRolling: boolean) {
    this.setState({ rollAnimIsPlaying: isRolling });
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
    // PlayerAnims.animateMouth(this.playerMouthRef.current);
    // PlayerAnims.animateLeftPupil();
    // PlayerAnims.animateRightPupil();
  }

  playerIsRolling() {
    return this.state.rollAnimIsPlaying;
  }

  playerIsNotRolling() {
    return this.state.rollAnimIsPlaying === false;
  }

  canMove(direction: string) {
    switch (direction) {
      case "LEFT":
        return (
          this.props.obstructionMap[this.state.playerPos.y][
            this.state.playerPos.x - 1
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
          ] !== 1 &&
          this.state.playerPos.y < this.props.obstructionMap.length - 1
        );
    }
  }

  setupKeyListeners() {
    document.body.addEventListener("keydown", e => {
      // RIGHT
      if (e.keyCode === Keys.RIGHT && this.canMove("RIGHT")) {
        e.preventDefault();
        this.setPlayerIsRolling(true);
        this.setState({
          playerPos: { ...this.state.playerPos, x: this.state.playerPos.x + 1 }
        });
        anime({
          targets: this.playerRef.current,
          translateX: 64 * this.state.playerPos.x,
          easing: "easeOutQuad",
          duration: 300,
          complete: () => {
            this.setPlayerIsRolling(false);
          }
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
          duration: 300,
          complete: () => {
            this.setPlayerIsRolling(false);
          }
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
          duration: 300,
          complete: () => {
            this.setPlayerIsRolling(false);
          }
        });

        this.updatePlayerDirection("UP");

        this.state.isRolled
          ? anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],

              translateY: [200, 0],
              easing: "linear",
              duration: 300
            })
          : anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],
              translateY: [0, -200],
              easing: "linear",
              duration: 300
            });
        this.setState({ isRolled: !this.state.isRolled });

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
          duration: 300,
          complete: () => {
            this.setPlayerIsRolling(false);
          }
        });

        this.updatePlayerDirection("DOWN");

        this.state.isRolled
          ? anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],

              translateY: [-100, 0],
              easing: "linear",
              duration: 300
            })
          : anime({
              targets: [
                this.leftEyeRef.current,
                this.rightEyeRef.current,
                this.playerMouthRef.current
              ],

              translateY: [0, 100],
              easing: "linear",
              duration: 300
            });

        this.setState({ isRolled: !this.state.isRolled });
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
            {this.state.playerDirection !== "RIGHT" &&
              PlayerFace.getEye({
                ref: this.leftEyeRef,
                eyePos: {
                  top: "11px",
                  left: "10px"
                }
              })}

            {this.state.playerDirection !== "LEFT" &&
              PlayerFace.getEye({
                ref: this.rightEyeRef,
                eyePos: {
                  top: "11px",
                  right: "10px"
                },
                playerDirection: this.state.playerDirection,
                isRolled: this.state.isRolled,
                eyeSide: "right"
              })}

            {PlayerFace.getMouth({
              ref: this.playerMouthRef,
              playerDirection: this.state.playerDirection,
              isRolled: this.state.isRolled
            })}
          </div>
        </div>
        {PlayerShadow.getPlayerShadow()}
      </div>
    );
  }
}
