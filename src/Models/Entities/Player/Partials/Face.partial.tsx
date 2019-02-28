import React, { Component } from "react";
import PlayerStyles from "../Player.styles";

export default class PlayerFace extends Component {
  static setPlayerMouthPos(state: string) {
    switch (state) {
      case "DOWN":
        return "16px";
        break;
      case "UP":
        return "16px";
        break;
      case "LEFT":
        return "44px";
        break;
      case "RIGHT":
        return "-10px";
    }
  }

  static getMouth(data: { ref; playerDirection: string; isRolled: boolean }) {
    return (
      <div
        className="player_mouth"
        style={{
          backgroundColor: "black",
          borderRadius: "50px",
          height: "10px",
          width: "25px",
          position: "absolute",
          top: "37px",
          right: this.setPlayerMouthPos(data.playerDirection),
          border: "2px solid black"
        }}
        ref={data.ref}
      >
        <div
          className="player_inner_mouth"
          style={{
            height: "5px",
            width: "10px",
            borderRadius: "20px",
            backgroundColor: "red",
            position: "relative",
            left: "7px",
            top: "5px"
          }}
        />
      </div>
    );
  }

  static getEye(data: {
    ref;
    playerDirection;
    eyePos: { top?: string; bottom?: string; left?: string; right?: string };
    isRolled: boolean;
    eyeSide: string;
  }) {
    return (
      <div
        className="player_eye_${eye_side}"
        ref={data.ref}
        style={PlayerStyles.getOuterEyeStyles({
          top: data.eyePos && data.eyePos.top ? data.eyePos.top : null,
          left: data.eyePos && data.eyePos.left ? data.eyePos.left : null,
          bottom: data.eyePos && data.eyePos.bottom ? data.eyePos.bottom : null,
          right: data.eyePos && data.eyePos.right ? data.eyePos.right : null
        })}
      >
        <div
          className="player_left_eye_lid"
          style={PlayerStyles.getEyeLidStyles({
            top: "-44px",
            left: 0
          })}
        />
        <div
          className="player_inner_eye_left"
          style={{
            position: "absolute",
            bottom: "-4px",
            backgroundColor: "black",
            height: "14px",
            width: "14px",
            borderRadius: "50px"
          }}
        />
      </div>
    );
  }
}
