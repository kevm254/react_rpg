import React, { Component } from "react";
import TitleStyles from "./Title.styles";
import * as anime from "animejs";
import { Keys } from "../../Models/Keys.model";
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
  logoRef: any = React.createRef();
  selectedOption: any[] = [];

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

  renderTitle() {
    return (
      <h1 ref={this.logoRef} style={TitleStyles.getLogoStyles()}>
        <AnimateSequencer>
          <Anim>
            <span>Visions of the</span>
          </Anim>

          <Anim animType="SLIDE_FROM_RIGHT">
            <span>Apocalypse</span>
          </Anim>
        </AnimateSequencer>
      </h1>
    );
  }

  renderMenu() {
    return (
      <div className="menu_options" style={TitleStyles.getMenuOptionsStyles()}>
        <p
          style={Object.assign(
            {},
            { border: "2px solid #221122" },
            this.isSelected(0)
          )}
        >
          Start
        </p>
        <p
          style={Object.assign(
            {},
            { border: "2px solid #221122" },
            this.isSelected(1)
          )}
        >
          Options
        </p>
      </div>
    );
  }

  renderSquare() {
    return (
      <Anim animType>
        <div
          style={{ border: "1px solid white", height: "50px", width: "50px" }}
        />
      </Anim>
    );
  }

  render() {
    return (
      <Anim animType="FADE_IN">
        <div className="App" style={TitleStyles.getContainerStyles()}>
          {this.renderTitle()}
          {this.renderSquare()}
          {this.renderMenu()}
        </div>
      </Anim>
    );
  }
}
