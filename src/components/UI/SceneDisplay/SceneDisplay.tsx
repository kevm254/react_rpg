import React, { Component } from "react";
import "./SceneDisplay.css";
import Anim from "../../../components/Anim/Anim.component";
import AnimSequencer from "../../../components/Anim/AnimSequencer.component";
import BaseAnims from "../../../components/Anim/base-anims";

const animTypes = BaseAnims.constructAnim([
  BaseAnims.fadeIn(),
  BaseAnims.setDuration(800),
  BaseAnims.blur(),
  BaseAnims.setEasing(),
  BaseAnims.slideFromLeft(100)
]);

export default class SceneDisplay extends Component {
  animQueue: [] = [];

  constructor(props) {
    super(props);
    this.bindAll();
  }

  componentDidMount() {}

  bindAll() {
    this.registerAnim = this.registerAnim.bind(this);
  }

  registerAnim(animData) {
    this.animQueue.push(animData);
  }

  render() {
    return (
      <div style={{ height: "300px" }} className={"scene-display-container"}>
        <AnimSequencer animQueue={this.animQueue}>
          <Anim
            animTypes={animTypes}
            getAnimData={this.registerAnim}
            animID="TEXTBOX"
          >
            <img
              style={{ height: "auto", width: "100%" }}
              src={this.props.sceneImg}
            />
          </Anim>
        </AnimSequencer>
      </div>
    );
  }
}
