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
  private animTarget: HTMLElement;
  private animate: BaseAnims;
  private animData: any;

  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  setAnimTarget() {
    this.animTarget = this.containerRef;
  }

  componentDidMount() {
    this.setAnimTarget();

    let anim = {
      target: this.containerRef
    };

    let animData = {
      targets: this.containerRef.current,
      ...this.props.animTypes
    };

    if (this.props.animTypes) {
      this.props.getAnimData ? this.props.getAnimData(animData) : null;
    } else {
      if (this.props.animID) {
        console.log("no animdata passed to" + this.props.animID);
        // throw new Error(`No anim data passed in to ${this.props.animID}!`);
      }
    }
  }

  getAnimData() {
    return this.animData;
  }

  render() {
    return (
      <React.Fragment>
        {React.cloneElement(this.props.children, {
          ref: this.containerRef,
          onClick: () => {
            this.props.animOnClick ? this.props.animOnClick() : null;
          },
          onMouseOver: () => {},
          onMouseLeave: () => {}
        })}
      </React.Fragment>
    );
  }
}

// anime
//   .timeline()
//   .add({
//     targets: this.containerRef.current,
//     translateY: [0, 200],
//     opacity: [1, 0]
//   })
//   .add({
//     targets: this.containerRef.current,
//     opacity: [0, 1],
//     translateY: [200, 0]
//   })
//   .play();
