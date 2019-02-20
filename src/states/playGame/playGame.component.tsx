import React, { Component } from "react";

import { Keys } from "../../Models/keys.model";
import SceneDisplay from "../../components/UI/SceneDisplay/SceneDisplay";
import TextBox from "../../components/UI/TextBox/TextBox";
import ActionMenu from "../../components/UI/GameActionsMenu/GameActionsMenu";
import levelData from "../../data/level1/level1.json";

enum State {
  INITIAL = "INITIAL",
  STRANGER = "STRANGER"
}

export default class PlayGame extends Component {
  currentScene;
  initialText: string = `You wake up in the remains of a once beautiful, but now ruined city.
       Flames swirl all around you, devouring the remains of houses and cars. 
       In the midst of the chaos, you take a small minute to ponder how or why
       you survived. You see a stranger approaching...`;

  strangerText: string = `The stranger looks at you menacingly.`;

  // CONSTRUCTOR /////////////////////////////
  constructor(props) {
    super(props);

    this.state = {
      currentText: this.initialText,
      textFinished: false,
      speedUpText: false,
      spaceWasPressed: false
    };

    this.bindAll();
  }

  bindAll() {
    this.setupKeyListeners = this.setupKeyListeners.bind(this);
    this.updateCurrentText = this.updateCurrentText.bind(this);
    this.textIsFinished = this.textIsFinished.bind(this);
    this.requestNewText = this.requestNewText.bind(this);
  }

  // LIFE-CYCLE METHODS ////////////////////////////
  componentWillMount() {
    this.setupKeyListeners();
  }

  // GENERAL METHODS ////////////////////////////////
  setupKeyListeners() {
    document.addEventListener("keyup", evt => {
      if (evt.keyCode === Keys.SPACEBAR) {
        this.setState({ spaceWasPressed: true });
        // if (this.state.textFinished) {
        //   this
        //     .updateCurrentText(`The stranger looks at you menacingly. A sinister smile slowly
        // creeps across his face. "Well look what we have here...`);
        // } else {
        //   this.setState({ speedUpText: true })
        // }
      }
    });
  }

  updateCurrentText(text: string): void {
    this.resetSpacePressed();
    this.setState({ currentText: text });
  }

  requestNewText() {
    this.resetSpacePressed();
    this
      .updateCurrentText(`The stranger looks at you menacingly. A sinister smile slowly
        creeps across his face. "Well look what we have here...`);
  }

  textIsFinished() {
    this.setState({ textIsFinished: true });
  }

  resetSpacePressed() {
    this.setState({ spaceWasPressed: false });
  }

  render() {
    return (
      <div>
        {this.state.currentText}
        <SceneDisplay />
        <TextBox
          sceneText={this.state.currentText}
          spaceWasPressed={this.state.spaceWasPressed}
          requestNewText={this.requestNewText}
          speedUpText={this.state.speedUpText}
        />
        <ActionMenu />
      </div>
    );
  }
}
