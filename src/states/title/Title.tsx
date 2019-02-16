import React, { Component } from "react";
import TitleStyles from "./Title.styles";
import * as anime from "animejs";
import { Keys } from "../../Models/Keys.model";
import TitleMenu from "./Menu.fragment";
import Anim from "../../components/Anim/Anim.component";
import AnimateSequencer from "../../components/Anim/AnimSequencer.component";

interface TitleProps {
  events: {
    updateGameState: () => any;
  };
}
interface TitleState {}

export default class Title extends Component<TitleProps, TitleState> {
  titleStyles: TitleStyles;
  selectedOption: any[] = [];
  animQueue: any[] = [];

  constructor(props) {
    super(props);
    this.bindAll();
    this.initVars(props);

    this.setupState();
    this.setupStyles();
    this.setupKeyListeners();
  }

  componentDidMount() {
    this.runAnimsOnInit();
  }

  bindAll() {
    this.setupStyles = this.setupStyles.bind(this);
    this.runAnimsOnInit = this.runAnimsOnInit.bind(this);
    this.initVars = this.initVars.bind(this);
    this.updateGameState = this.updateGameState.bind(this);
    this.registerAnim = this.registerAnim.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  initVars(props: any) {
    this.selectedOption = ["START", "OPTIONS"];
  }

  setupState() {
    this.state = {
      isSelected: 0
    };
  }

  setupStyles() {
    this.titleStyles = new TitleStyles();
  }

  updateGameState() {
    if (this.props && this.props.events) {
      this.props.events.updateGameState();
    }
  }

  componentDidUnMount() {}

  setupKeyListeners() {
    document.body.addEventListener("keyup", evt => {
      if (evt.keyCode === Keys.UP) {
        const currentState = this.state.isSelected;
        if (currentState < this.selectedOption.length - 1) {
          this.setState({ isSelected: currentState + 1 });
        } else {
          this.setState({ isSelected: 0 });
        }
      } else if (evt.keyCode === Keys.DOWN) {
        const currentState = this.state.isSelected;
        if (currentState > 0) {
          this.setState({ isSelected: currentState - 1 });
        } else {
          this.setState({ isSelected: currentState + 1 });
        }
      }

      if (evt.keyCode === Keys.ENTER) {
        if (this.selectedOption[this.state.isSelected] === "START") {
          this.updateGameState();
        }
      }
    });
  }

  runAnimsOnInit() {}

  combineStyles(styles) {
    Object.assign({}, ...styles);
  }

  isSelected(itemSelection) {
    if (this.state.isSelected === itemSelection) {
      return { border: "2px solid yellow", borderRadius: "4px" };
    }
  }

  renderTitle1() {
    return (
      <Anim getAnimData={this.registerAnim}>
        <h1 style={TitleStyles.getLogoStyles()}>Visions of the</h1>
      </Anim>
    );
  }

  renderTitle2() {
    return (
      <Anim getAnimData={this.registerAnim} animType="SLIDE_FROM_RIGHT">
        <h1 style={TitleStyles.getLogoStyles()}>Apocalypse</h1>
      </Anim>
    );
  }

  registerAnim(animData) {
    this.animQueue.push(animData);
  }

  renderSquare() {
    return (
      <Anim animType="ROTATE" getAnimData={this.registerAnim}>
        <div
          style={{ border: "1px solid white", height: "50px", width: "50px" }}
        />
      </Anim>
    );
  }

  render() {
    return (
      <div className="App" style={TitleStyles.getContainerStyles()}>
        <AnimateSequencer animQueue={this.animQueue}>
          {this.renderTitle1()}
          {this.renderTitle2()}
          {TitleMenu(this)}
          <div>
            <Anim animType="ROTATE" getAnimData={this.registerAnim}>
              <p>Hi there</p>
            </Anim>
          </div>
        </AnimateSequencer>
      </div>
    );
  }
}
