import React, { Component, Ref } from "react";
import CommonAnims from "./common-anims";
import anime from "animejs";

interface AnimateProps {
  animType: string;
}
interface AnimateState {}

export default class Animate extends Component<AnimateProps, AnimateState> {
  private containerRef: Ref;
  private animate: CommonAnims;

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  initAnims() {
    this.animate = new CommonAnims(this.containerRef);
  }

  componentDidMount() {
    let animType: string;
    let animProps: any = {};
    this.initAnims();

    if (this.props.animType === "SLIDE_FROM_RIGHT") {
      animProps = CommonAnims.slideFromRight();
    } else if (this.props.animType === "FADE_IN") {
      animProps = CommonAnims.fadeIn();
    } else {
      animProps = CommonAnims.slideFromLeft();
    }

    let test = Object.assign(
      {},
      {
        targets: this.containerRef.current,
        easing: "linear"
      },
      animProps
    );

    anime(test);
  }

  render() {
    return <div ref={this.containerRef}>{this.props.children}</div>;
  }
}
