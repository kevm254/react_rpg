import React from "react";
import Anim from "../../components/Anim/Anim.component";
import BaseAnims from "../../components/Anim/base-anims";
import TitleStyles from "./Title.styles";

const title1Anim = BaseAnims.constructAnim([
  BaseAnims.slideFromLeft(),
  BaseAnims.slideFromTop(),
  BaseAnims.setDuration(1400),
  BaseAnims.setEasing()
]);

const title2Anim = BaseAnims.constructAnim([
  BaseAnims.slideFromRight(),
  BaseAnims.slideFromBottom(),
  BaseAnims.setDuration(1400),
  BaseAnims.setEasing()
]);

export default parent => {
  return (
    <div style={TitleStyles.getTitleContainerStyles()}>
      <Anim
        animTypes={title1Anim}
        getAnimData={parent.registerAnim}
        animID="TITLE_1"
      >
        <h1 style={TitleStyles.getLogoStyles()}>Visions of the</h1>
      </Anim>
      <Anim
        animTypes={title2Anim}
        getAnimData={parent.registerAnim}
        animID="TITLE_2"
      >
        <h1 style={TitleStyles.getLogoStyles()}>Apocalypse</h1>
      </Anim>
    </div>
  );
};
