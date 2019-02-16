import React from "react";
import Anim from "../../components/Anim/Anim.component";
import TitleStyles from "./Title.styles";

export default parent => {
  return (
    <Anim animType="FADE_IN" getAnimData={parent.registerAnim}>
      <div className="menu_options" style={TitleStyles.getMenuOptionsStyles()}>
        <p
          style={Object.assign(
            {},
            { border: "2px solid #221122" },
            parent.isSelected(0)
          )}
        >
          Start
        </p>
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
