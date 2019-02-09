import React, { Component } from "react";
import TitleStyles, { StylesKey } from "./Title.styles";
import * as anime from "animejs";
import { Keys } from "../../Models/Keys.model";
import Animate from "../../components/Animate/Animate.component";

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

  render() {
    return (
      <div className="App" style={this.titleStyles.get(StylesKey.CONTAINER)}>
        <h1 ref={this.logoRef} style={this.titleStyles.get(StylesKey.LOGO)}>
          Visions of the Apocalypse
        </h1>

        <div
          className="menu_options"
          style={this.titleStyles.get(StylesKey.MENU_OPTIONS)}
        >
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
      </div>
    );
  }
}
