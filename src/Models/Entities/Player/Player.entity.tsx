import React, { Component } from "react";
import anime from "animejs";
import PlayerAnims from "./Player.anim";
import PlayerFace from "./Partials/Face.partial";
import TextBubble from "../../../components/TextBubble/TextBubble";
import { Keys, KeyPressed } from "../../keys.model";
import PlayerShadow from "./Partials/Shadow.partial";
import PlayerStyles from "./Player.styles";

export default class Player extends Component {
  // refs
  playerRef = React.createRef();
  innerPlayerRef = React.createRef();
  playerMouthRef = React.createRef();
  leftEyeRef = React.createRef();
  rightEyeRef = React.createRef();
  facialFeatureRefs = [];

  // Constructor //////////////////////////////////
  constructor(props) {
    super(props);

    this.state = {
      playerPos: { x: 0, y: 0 },
      maxHP: 10,
      currentHP: 10,
      previousPlayerDirection: null,
      playerDirection: "DOWN",
      rolled: false,
      rollAnimIsPlaying: false,
      displayTextBubble: false
    };
    this.bindAll();
  }

  bindAll() {
    this.playerIsNotRolling = this.playerIsNotRolling.bind(this);
    this.updatePlayerHP = this.updatePlayerHP.bind(this);
    this.closeTextBubble = this.closeTextBubble.bind(this);
    this.updatePlayerPos = this.updatePlayerPos.bind(this);
    this.checkForEvent = this.checkForEvent.bind(this);
  }

  // END Constructor //////////////////////////////////

  // Life-Cycle Methods /////////////////////////////////
  componentDidMount() {
    this.initPlayerPos();
    this.setupKeyListeners();
    this.animateFaceOnInit();
    this.storeFacialFeatureRefs();
    this.displayText();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updatePlayerHP !== this.props.updatePlayerHP) {
      this.updatePlayerHP(-10);
      this.props.resetDamage();
      if (this.state.currentHP <= 0) {
        this.playGameOverAnim();
      }
    }

    console.log("PROPS", this.props);
    if (prevProps.editPlayerPos !== this.props.editPlayerPos) {
      switch (this.props.editPlayerPos) {
        case "PLUSX":
          this.incrementPlayerPosX();
          break;
        case "MINUSX":
          this.decrementPlayerPosX();
        case "PLUSY":
          this.incrementPlayerPosY();
        case "MINUSY":
          this.decrementPlayerPosY();
      }
    }
  }
  // END Life-Cycle Methods //////////////////////////////

  storeFacialFeatureRefs() {
    this.facialFeatureRefs = [
      this.leftEyeRef.current,
      this.rightEyeRef.current,
      this.playerMouthRef.current
    ];
  }

  displayText() {
    this.openTextBubble();
  }

  checkForEvent() {
    this.props.checkForEvent();
  }

  updatePlayerHP(hp: number) {
    this.setState({ currentHP: this.state.currentHP + hp });
  }

  updatePlayerPos(props) {
    props.updatePlayerPos(this.state.playerPos);
  }

  initPlayerPos() {
    this.props.startPos
      ? this.setPlayerPos(this.props.startPos)
      : this.setPlayerPos({ x: 0, y: 0 });

    this.updatePlayerPos(this.props);
  }

  setPlayerPos(pos: { x: number; y: number }) {
    this.setState({ playerPos: pos });
  }

  incrementPlayerPosX() {
    this.setState(
      {
        playerPos: { x: this.state.playerPos.x + 1, y: this.state.playerPos.y }
      },
      () => {
        this.updatePlayerPos(this.props);
      }
    );
  }

  decrementPlayerPosX() {
    this.setState(
      {
        playerPos: { x: this.state.playerPos - 1, y: this.state.playerPos.y }
      },
      () => {
        this.updatePlayerPos(this.props);
      }
    );
  }

  incrementPlayerPosY() {
    this.setState(
      {
        playerPos: { x: this.state.playerPos.x, y: this.state.playerPos.y + 1 }
      },
      () => {
        this.updatePlayerPos(this.props);
      }
    );
  }

  decrementPlayerPosY() {
    this.setState(
      {
        playerPos: { x: this.state.playerPos.x, y: this.state.playerPos.y - 1 }
      },
      () => {
        this.updatePlayerPos(this.props);
      }
    );
  }

  updatePlayerDirection(direction: string) {
    this.setState({ playerDirection: direction });
  }

  setPlayerIsRolling(isRolling: boolean) {
    this.setState({ rollAnimIsPlaying: isRolling });
  }

  setPreviousPlayerDirection(direction: string) {
    this.setState({ previousPlayerDirection: direction });
  }

  openTextBubble() {
    this.setState({ displayTextBubble: true });
  }

  closeTextBubble(data: string) {
    this.setState({ displayTextBubble: false });
  }

  displayTextBubble(state) {
    return (
      state.displayTextBubble && (
        <TextBubble
          text={"passed in text"}
          closeTextBubble={this.closeTextBubble}
        />
      )
    );
  }

  playGameOverAnim() {
    anime({
      targets: this.playerRef.current,
      scale: [1, 2, 1],
      rotate: "720deg",
      color: ["blue", "black"],
      duration: 1500,
      complete: () => {
        this.props.showGameOver();
      }
    });
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
    // PlayerAnims.animateLeftPupil( );
    // Playernims.animateRightPupil();
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
          ] !== 1 && this.state.playerPos.x > this.props.screenEdgeX
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

  moveUp() {
    if (this.canMove("UP")) {
      this.setState({
        playerPos: { ...this.state.playerPos, y: this.state.playerPos.y - 1 }
      });
      PlayerAnims.rollUp({
        targets: this.playerRef.current,
        playerYPos: this.state.playerPos.y
      });

      this.updatePlayerPos(this.props);
      this.checkForEvent();
    }
  }

  moveDown() {
    if (this.canMove("DOWN")) {
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

      this.updatePlayerPos(this.props);
      this.checkForEvent();
    }
  }

  moveLeft() {
    if (this.canMove("LEFT")) {
      this.setState({
        playerPos: {
          ...this.state.playerPos,
          x: this.state.playerPos.x - 1
        }
      });
      anime({
        targets: this.playerRef.current,
        translateX: 64 * this.state.playerPos.x - this.props.offsetX,
        easing: "easeOutCubic",
        duration: 300,
        complete: () => {
          this.setPlayerIsRolling(false);
        }
      });

      this.updatePlayerPos(this.props);
      this.checkForEvent();
    }
  }

  moveRight() {
    if (this.canMove("RIGHT")) {
      this.setState({
        playerPos: {
          ...this.state.playerPos,
          x: this.state.playerPos.x + 1
        }
      });
      PlayerAnims.rollRight({
        targets: this.playerRef.current,
        playerXPos: this.state.playerPos.x,
        offsetX: this.props.offsetX
      });

      this.updatePlayerPos(this.props);
      this.checkForEvent();
    }
  }

  rollUp() {
    this.setState({ isRolled: !this.state.isRolled });
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
  }

  rollDown() {
    this.setState({ isRolled: !this.state.isRolled });
    this.updatePlayerDirection("DOWN");

    this.state.isRolled
      ? PlayerAnims.rollDown1([
          this.leftEyeRef.current,
          this.rightEyeRef.current,
          this.playerMouthRef.current
        ])
      : PlayerAnims.rollDown2([
          this.leftEyeRef.current,
          this.rightEyeRef.current,
          this.playerMouthRef.current
        ]);
  }

  rollLeft() {
    this.setState({ isRolled: !this.state.isRolled });
    this.updatePlayerDirection("LEFT");

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
  }

  rollRight() {
    this.setState({ isRolled: !this.state.isRolled });
    this.updatePlayerDirection("RIGHT");
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
  }

  preventScrolling(e) {
    e.preventDefault();
  }

  checkForDamage(state) {
    this.props.checkForDamage(state.playerPos);
  }

  setupKeyListeners() {
    document.body.addEventListener("keydown", e => {
      // RIGHT
      if (KeyPressed.right(e)) {
        this.preventScrolling(e);
        this.rollRight();
        this.moveRight();
        this.checkForDamage(this.state);
      }

      if (KeyPressed.left(e)) {
        this.preventScrolling(e);
        this.rollLeft();
        this.moveLeft();
        this.checkForDamage(this.state);
      }

      if (KeyPressed.up(e)) {
        this.preventScrolling(e);
        this.rollUp();
        this.moveUp();
        this.checkForDamage(this.state);
      }

      if (KeyPressed.down(e)) {
        this.preventScrolling(e);
        this.rollDown();
        this.moveDown();
        this.checkForDamage(this.state);
      }
    });
  }

  render() {
    return (
      <div ref={this.playerRef} style={PlayerStyles.getContainerStyles()}>
        {this.displayTextBubble(this.state)}
        <div>{this.props.screenEdgeX}</div>
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
