import React, { Component } from "react";
import TextBoxStyles from "./TextBox.styles";
import Anim from "../../Anim/Anim.component";
import AnimSequencer from "../../Anim/AnimSequencer.component";
import BaseAnims from "../../Anim/base-anims";

const animTypes = BaseAnims.constructAnim([
  BaseAnims.slideFromLeft(),
  BaseAnims.fadeIn(),
  BaseAnims.skew(),
  BaseAnims.setEasing()
]);

export default class TextBox extends Component {
  defaultText: string = `You wake up in the remains of a once beautiful, but now ruined city.
       Flames swirl all around you, devouring the remains of houses and cars. 
       In the midst of the chaos, you take a small minute to ponder how or why
       you survived. You see a stranger approaching...`;
  currentTextPos: number = 0;
  currentInterval: any;
  textLength: number;
  animQueue: [] = [];

  constructor(props) {
    super(props);

    this.state = {
      currentText: ""
    };

    this.bindAll();
  }

  setLength(text: string) {
    this.textLength = text.length;
  }

  componentWillMount() {
    document.addEventListener("keyup", e => {
      console.dir(e);
    });
  }

  componentDidMount() {
    this.setLength(this.defaultText);
    this.currentInterval = this.setTextInterval();
    console.log("ANIMTYPES", animTypes);
  }

  setTextInterval() {
    return setInterval(() => {
      if (this.currentTextPos < this.textLength) {
        this.currentTextPos++;
        this.setState({
          currentText: this.defaultText.slice(0, this.currentTextPos)
        });
      } else {
        clearInterval(this.currentInterval);
      }
    }, 50);
  }

  bindAll() {
    this.registerAnim = this.registerAnim.bind(this);
  }

  registerAnim(animData) {
    this.animQueue.push(animData);
  }

  render() {
    return (
      <AnimSequencer animQueue={this.animQueue}>
        <Anim
          animTypes={animTypes}
          getAnimData={this.registerAnim}
          animID="TEXTBOX"
        >
          <div style={TextBoxStyles.getTextBoxContainerStyles()}>
            <p>{this.state.currentText}</p>
          </div>
        </Anim>
      </AnimSequencer>
    );
  }
}
