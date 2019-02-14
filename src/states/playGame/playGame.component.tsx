import React, { Component } from "react";

import SceneDisplay from "../../components/UI/SceneDisplay/SceneDisplay";
import TextBox from "../../components/UI/TextBox/TextBox";
import ActionMenu from "../../components/UI/GameActionsMenu/GameActionsMenu";
import levelData from "../../data/level1/level1.json";

export default class PlayGame extends Component {
  currentScene;

  componentDidMount() {}

  async getSceneText() {}

  render() {
    return (
      <div>
        <SceneDisplay />
        <TextBox sceneText={this.getSceneText} />
        <ActionMenu />
      </div>
    );
  }
}
