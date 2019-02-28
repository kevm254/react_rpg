import React, { Component } from "react";

export default class PlayerShadow {
  static getPlayerShadow() {
    return (
      <div
        className="player_shadow"
        style={{
          position: "absolute",
          backgroundColor: "black",
          borderRadius: "190px",
          height: "14px",
          width: "55px",
          left: "0px",
          opacity: ".4",
          top: "115px",
          zIndex: 0
        }}
      />
    );
  }
}
