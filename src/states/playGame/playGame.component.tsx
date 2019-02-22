import React, { Component, Fragment } from "react";

import { Keys } from "../../Models/keys.model";
import SceneDisplay from "../../components/UI/SceneDisplay/SceneDisplay";
import TextBox from "../../components/UI/TextBox/TextBox";
import ActionMenu from "../../components/UI/GameActionsMenu/GameActionsMenu";
import levelData from "../../data/level1/level1.json";
import { SceneData } from "./scene1.data";

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
  images: Map<string, any> = new Map();
  imageKeys: string[] = [];
  promises = [];

  registerImage(name: string, url: string) {
    let promise = new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
    }).then(img => {
      this.images.set(name, img);
    });
    this.promises.push(promise);
  }

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
      sceneDisplay: null,
      isLoading: true
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
    this.registerImages();
    Promise.all(this.images).then(() => {
      this.setState({ isLoading: false });
    });

    this.setupKeyListeners();
    this.setState({ sceneImg: Scene.BURNING_CITY });
  }

  componentDidMount() {}
  // GENERAL METHODS ////////////////////////////////
  registerImages() {
    this.registerImage("KEN", Character.KEN);
    this.registerImage("SAGAT", Character.SAGAT);
    this.registerImage("BURNING_CITY", Scene.BURNING_CITY);
    this.registerImage("ROAD", Scene.ROAD);
  }

  prefetchImages() {}

  setupKeyListeners() {
    document.addEventListener("keyup", evt => {
      if (evt.keyCode === Keys.SPACEBAR) {
        this.setState({ spaceWasPressed: true });
      }
    });
  }

  updateCurrentText(text: string): void {
    this.resetSpacePressed();
    this.setState({ currentText: text });
  }

  updateGame(
    data = { text: "", displayProfile: false, profileImage: null },
    scene?: string
  ) {
    this.setState({
      profileImage: data.profileImage,
      displayProfile: data.displayProfile
    });
    this.updateCurrentText(data.text);

    if (scene) {
      this.updateSceneImg(scene);
    }
  }

  updateSceneImg(scene) {
    this.setState({ sceneImg: scene });
  }

  setGameState() {}

  requestNewText(state: State) {
    this.setState({ gameState: this.state.gameState + 1 });
    this.resetSpacePressed();

    if (this.state.gameState === 1) {
      this.updateGame(SceneData.initial[0]);
    } else if (this.state.gameState === 2) {
      this.updateGame(SceneData.initial[1]);
    } else if (this.state.gameState === 3) {
      this.updateGame(SceneData.initial[2]);
    } else if (this.state.gameState === 4) {
      this.updateGame(SceneData.initial[3]);
    } else if (this.state.gameState === 5) {
      this.updateGame(SceneData.initial[4], Scene.ROAD);
    } else if (this.state.gameState === 6) {
      this.updateGame(SceneData.initial[5]);
    } else if (this.state.gameState === 7) {
      this.updateGame(SceneData.initial[6]);
    }
  }

  textIsFinished(state) {
    this.resetSpacePressed();
    this.setState({ textIsFinished: state });
  }

  resetSpacePressed() {
    this.setState({ spaceWasPressed: false });
  }

  displayGame(state) {
    return (
      <Fragment>
        <SceneDisplay sceneImg={state.sceneImg} />
        <TextBox
          sceneText={state.currentText}
          spaceWasPressed={state.spaceWasPressed}
          requestNewText={this.requestNewText}
          speedUpText={state.speedUpText}
          displayProfile={state.displayProfile}
          profileImage={state.profileImage}
          textIsFinished={this.textIsFinished}
        />
        <ActionMenu />
      </Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? "loading" : this.displayGame(this.state)}
      </div>
    );
  }
}
