import React, { Component, Fragment } from "react";
import TextBoxStyles from "./TextBox.styles";
import { Keys } from "../../../Models/keys.model";
import Anim from "../../Anim/Anim.component";
import AnimSequencer from "../../Anim/AnimSequencer.component";
import BaseAnims from "../../Anim/base-anims";
import ProfileDisplay from "./ProfileDisplay/ProfileDisplay";

const animTypes = BaseAnims.constructAnim([
  BaseAnims.slideFromLeft(),
  BaseAnims.fadeIn(),
  BaseAnims.skew(),
  BaseAnims.setEasing()
]);

export default class TextBox extends Component {
  currentTextPos: number = 0;
  currentInterval: any;
  textLength: number;
  textFinished: boolean = false; // text finished showing
  animQueue: [] = [];

  constructor(props) {
    super(props);

    this.state = {
      storedText: "",
      currentText: "",
      textFinished: false
    };

    this.bindAll();
  }

  // LIFE-CYCLE METHODS ////////////////////
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (
        this.props.spaceWasPressed &&
        this.props.spaceWasPressed !== prevProps.spaceWasPressed
      ) {
        if (this.state.textFinished) {
          this.props.requestNewText();
          this.setState({ textFinished: false });
          this.props.textIsFinished(false);
        } else {
          clearInterval(this.currentInterval);
          this.setState({ currentText: this.props.sceneText });
          this.setState({ textFinished: true });
          this.props.textIsFinished(true);
        }
      }
      if (prevProps.sceneText !== this.props.sceneText) {
        this.updateCurrentText(this.props.sceneText);
      }
    }
  }

  componentDidMount() {
    this.updateCurrentText(this.props.sceneText);
  }

  // GENERAL METHODS //////////////////////
  setLength(text: string) {
    this.textLength = text.length;
  }

  resetTextPos() {
    this.currentTextPos = 0;
  }

  showAllText();

  updateCurrentText(text: string) {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
    }
    this.resetTextPos();
    this.clearCurrentText();
    this.setTextInterval(50, text);
  }

  clearCurrentText() {
    this.setState({ currentText: "" });
  }

  setTextInterval(interval: number = 50, text?: string) {
    clearInterval(this.currentInterval);
    this.setLength(text);

    this.currentInterval = setInterval(() => {
      if (this.currentTextPos < this.textLength) {
        this.currentTextPos++;
        this.setState({
          currentText: text.slice(0, this.currentTextPos)
        });
      } else {
        clearInterval(this.currentInterval);
        this.setState({ textFinished: true });
        // this.props.requestNewText();
      }
    }, interval);
  }

  updateText() {
    this.currentTextPos = 0;
    this.setTextLength();
  }

  bindAll() {
    this.registerAnim = this.registerAnim.bind(this);
  }

  registerAnim(animData) {
    this.animQueue.push(animData);
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        {this.props.displayProfile && (
          <ProfileDisplay profileImage={this.props.profileImage} />
        )}
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
      </div>
    );
  }
}
