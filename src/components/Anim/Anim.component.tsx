import React, { Component, Ref } from "react";
import BaseAnims from "./base-anims";
import anime from "animejs";

interface AnimateProps {
  animType: string;
}
interface AnimateState {}

export default class Anim extends Component<AnimateProps, AnimateState> {
  private containerRef: Ref;
  private animate: BaseAnims;

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  initAnims() {
    this.animate = new BaseAnims(this.containerRef);
  }

  componentDidMount() {
    let animType: string;
    let animProps: any = {};
    this.initAnims();

    switch (this.props.animType) {
      case "SLIDE_FROM_RIGHT":
        animProps = BaseAnims.constructAnim([
          BaseAnims.fadeIn(),
          BaseAnims.slideFromRight(),
          BaseAnims.slideFromTop(),
          BaseAnims.scale(4, 1)
        ]);
        break;
      case "FADE_IN":
        animProps = BaseAnims.fadeIn();
        break;
      default:
        animProps = BaseAnims.constructAnim([
          BaseAnims.fadeIn(),
          BaseAnims.slideFromBottom(),
          BaseAnims.slideFromLeft(),
          BaseAnims.scale(4, 1)
        ]);
    }

    let test = Object.assign(
      {},
      {
        targets: this.containerRef.current,
        easing: "easeOutExpo",
        duration: 2000
      },
      animProps
    );

    anime(test);
  }

  render() {
    return <div ref={this.containerRef}>{this.props.children}</div>;
  }
}
