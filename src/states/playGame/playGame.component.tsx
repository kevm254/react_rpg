import React, { Component } from "react";

import SceneDisplay from "../../components/UI/SceneDisplay/SceneDisplay";
import TextBox from "../../components/UI/TextBox/TextBox";
import ActionMenu from "../../components/UI/GameActionsMenu/GameActionsMenu";

export default class PlayGame extends Component {
  render() {
    return (
      <div>
        <SceneDisplay />
        <TextBox />
        <ActionMenu />
      </div>
    );
  }
}
