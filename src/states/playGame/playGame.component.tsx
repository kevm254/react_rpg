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

enum Character {
  KEN = "./img/ken.jpg",
  SAGAT = "./img/sagat.jpg"
}

enum Scene {
  BURNING_CITY = "./img/backgrounds/city_background.jpg",
  ROAD = "./img/backgrounds/road_background.jpg"
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
      spaceWasPressed: false,
      gameState: 0,
      displayProfile: false,
      profileImage: null,
      sceneDisplay: null
    };

    this.bindAll();
  }

  bindAll() {
    this.setupKeyListeners = this.setupKeyListeners.bind(this);
    this.updateCurrentText = this.updateCurrentText.bind(this);
    this.textIsFinished = this.textIsFinished.bind(this);
    this.requestNewText = this.requestNewText.bind(this);
    this.textIsFinished = this.textIsFinished.bind(this);
  }

  // LIFE-CYCLE METHODS ////////////////////////////
  componentWillMount() {
    this.setupKeyListeners();
    this.setState({ sceneImg: Scene.BURNING_CITY });
  }

  // GENERAL METHODS ////////////////////////////////
  setupKeyListeners() {
    document.addEventListener("keyup", evt => {
      if (evt.keyCode === Keys.SPACEBAR) {
        this.setState({ spaceWasPressed: true });
      }

      if (evt.keyCode === Keys.ENTER) {
        this.requestNewText();
      }
    });
  }

  updateCurrentText(text: string): void {
    this.resetSpacePressed();
    this.setState({ currentText: text });
  }

  updateGame(data = { text: "", displayProfile: false, profileImage: null }) {
    this.setState({
      profileImage: data.profileImage,
      displayProfile: data.displayProfile
    });
    this.updateCurrentText(data.text);
  }

  setGameState() {}

  requestNewText(state: State) {
    switch (state) {
      case State.INITIAL:
        this.updateCurrentText("There is nothing there");
    }
    this.setState({ gameState: this.state.gameState + 1 });
    this.resetSpacePressed();
    if (this.state.gameState === 1) {
      this.updateGame({
        text: `The stranger looks at you menacingly. A sinister smile slowly
        creeps across his face. "Well look what we have here...`,
        displayProfile: false,
        profileImage: null
      });
    } else if (this.state.gameState === 2) {
      this.setState({
        profileImage: Character.KEN,
        displayProfile: true
      });
      this.updateCurrentText("Who are you? What do you want?");
    } else if (this.state.gameState === 3) {
      this.setState({
        profileImage: Character.SAGAT
      });
      this.updateCurrentText(
        `Don't worry about that. I'll be asking the questions here.
        Do you want to live? If so, follow me.`
      );
    } else if (this.state.gameState === 4) {
      this.setState({
        profileImage: Character.KEN
      });
      this.updateCurrentText(`I guess I better follow him.`);
    } else if (this.state.gameState === 5) {
      this.setState({
        sceneImg: Scene.ROAD
      });
      this.updateCurrentText(`I need to find a weapon. There's no way I can
      take this guy out unarmed.`);
    }
  }

  textIsFinished() {
    this.setState({ textIsFinished: true });
  }

  resetSpacePressed() {
    this.setState({ spaceWasPressed: false });
  }

  textIsFinished() {}

  render() {
    return (
      <div>
        {this.state.currentText}
        <SceneDisplay sceneImg={this.state.sceneImg} />
        <TextBox
          sceneText={this.state.currentText}
          spaceWasPressed={this.state.spaceWasPressed}
          requestNewText={this.requestNewText}
          speedUpText={this.state.speedUpText}
          displayProfile={this.state.displayProfile}
          profileImage={this.state.profileImage}
          textIsFinished={this.textIsFinished}
        />
        <ActionMenu />
      </div>
    );
  }
}
