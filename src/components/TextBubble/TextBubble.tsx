import React, { Component } from "react";
import anime from "animejs";
import TextBubbleStyles from "./TextBubble.styles";
import TextBubbleAnims from "./TextBubble.anims";

export default class TextBubble extends Component {
  textBubbleRef: React.ref = React.createRef();
  currentTextContainerRef: React.ref = React.createRef();
  textQueue: string[] = [];
  currentText: string = "";
  currentTextPos: number = 0;

  // Constructor ///////////////////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      displayedText: ""
    };

    this.bindAll();
  }

  bindAll() {
    this.closeTextBubble = this.closeTextBubble.bind(this);
  }
  // END Constructor ////////////////////////////////////////

  // Life-Cycle Methods ///////////////////////////////////
  componentWillMount() {
    this.updateTextQueue(this.props.text);
    let currentText = this.state.text;
  }

  componentDidMount() {
    TextBubbleAnims.fadeInBody({ targets: this.textBubbleRef.current });
    this.setCurrentText(this.textQueue.pop());
    this.animateWords();
    this.setState({ displayedText: "what's going on?" });
  }
  // END Life-Cycle Methods ////////////////////////////////

  // General Methods ///////////////////////////////////////
  animateWords() {
    TextBubbleAnims.slideTextIn({
      targets: this.currentTextContainerRef.current
    });
    setTimeout(() => {
      TextBubbleAnims.slideTextOut({
        targets: this.currentTextContainerRef.current,
        onComplete: this.closeTextBubble
      });
    }, 2000);
  }

  updateTextQueue(text: string) {
    this.textQueue.push(text);
  }

  setCurrentText(text: string) {
    this.currentText = text;
  }

  getCurrentText() {
    return this.currentText;
  }

  closeTextBubble() {
    TextBubbleAnims.fadeOutBody({
      targets: this.textBubbleRef.current,
      onComplete: this.props.closeTextBubble
    });
  }
  // END General Methods ////////////////////////////////////

  // Display Components //////////////////////////
  displayMask() {
    return (
      <div
        className="modal_mask"
        style={TextBubbleStyles.getTextBubbleMaskStyles()}
      />
    );
  }

  displayTextArea(state) {
    return (
      <div
        className="modal_text_area"
        style={TextBubbleStyles.getTextBubbleTextAreaStyles()}
      >
        <div
          className="current_text_container"
          ref={this.currentTextContainerRef}
        >
          {state.displayedText}
        </div>
      </div>
    );
  }

  displayModalTail() {
    return (
      <div
        className="modal_tail"
        style={TextBubbleStyles.getTextBubbleTailStyles()}
      />
    );
  }
  // END Display Components ///////////////////////

  // Render Method ////////////////////////////////
  render() {
    return (
      <div
        style={TextBubbleStyles.getTextBubbleContainerStyles()}
        ref={this.textBubbleRef}
      >
        {this.displayMask()}
        {this.displayTextArea(this.state)}
        {this.displayModalTail()}
      </div>
    );
  }
  // END Render Method /////////////////////////////
}
