import React from "react";
import Anim from "../../components/Anim/Anim.component";
import BaseAnims from "../../components/Anim/base-anims";
import TitleStyles from "./Title.styles";

const animData = BaseAnims.constructAnim([
  BaseAnims.fadeIn(),
  BaseAnims.slideFromBottom(250),
  BaseAnims.setDuration(1000),
  BaseAnims.setEasing()
]);

export default parent => {
  return (
    <Anim animTypes={animData} getAnimData={parent.registerAnim} animID="MENU">
      <div className="menu_options" style={TitleStyles.getMenuOptionsStyles()}>
        <Anim>
          <p
            style={Object.assign(
              {},
              { border: "2px solid #221122" },
              parent.isSelected(0)
            )}
          >
            Start
          </p>
        </Anim>
        <p
          style={Object.assign(
            {},
            { border: "2px solid #221122" },
            parent.isSelected(1)
          )}
        >
          Options
        </p>
      </div>
    </Anim>
  );
};
