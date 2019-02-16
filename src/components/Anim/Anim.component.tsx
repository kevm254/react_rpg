import React, { Component, Ref } from "react";
import BaseAnims from "./base-anims";
import anime from "animejs";

interface AnimateProps {
  animType: string;
  duration?: number;
}
interface AnimateState {}

export default class Anim extends Component<AnimateProps, AnimateState> {
  private containerRef: Ref;
  private animate: BaseAnims;
  private animData: any;

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
        animProps = BaseAnims.constructAnim([
          BaseAnims.fadeIn(),
          BaseAnims.scale(0, 1),
          BaseAnims.setDuration(5000)
        ]);
        break;
      case "ROTATE":
        animProps = BaseAnims.constructAnim([
          BaseAnims.rotate(),
          BaseAnims.fadeIn(),
          BaseAnims.setDuration(5000)
        ]);
        break;
      default:
        animProps = BaseAnims.constructAnim([
          BaseAnims.fadeIn(),
          BaseAnims.slideFromBottom(),
          BaseAnims.slideFromLeft(),
          BaseAnims.scale(4, 1)
        ]);
    }

    this.animData = Object.assign(
      {},
      {
        targets: this.containerRef.current,
        easing: "easeOutExpo",
        duration: 2000
      },
      animProps
    );
    console.log("ANIMDATA", this.animData);
    this.props.callback ? this.props.callback(this.animData) : null;
    this.props.getAnimData ? this.props.getAnimData(this.animData) : null;
  }

  getAnimData() {
    return this.animData;
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, { ref: this.containerRef })}
      </React.Fragment>
    );
  }
}
