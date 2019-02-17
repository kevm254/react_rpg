import React, { Component } from "react";
import TextBox from "../../components/UI/TextBox/TextBox";

export default class DebugState extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>
        <h1>Debug Screen</h1>
        <TextBox />
      </div>
    );
  }
}
