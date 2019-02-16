import anime from "animejs";

export default class CommonAnims {
  target: any;

  constructor(target) {
    this.target = target;
  }

  static constructAnim(animTypes: any[], duration?) {
    console.log(">>>>>>>>>>>>>");
    let animObj: any = {};
    if (Array.isArray(animTypes)) {
      animTypes.forEach(anim => {
        Object.assign(animObj, anim);
      });
    } else {
      throw new Error("Please provide an array of animations");
    }
    console.log(animObj);
    return animObj;
  }

  static slideFromLeft(startPos: number = 800, duration?) {
    return {
      translateX: [-startPos, 0]
    };
  }

  static slideToLeft(endPos: number = 800, duration?) {
    return {
      translateX: [0, -endPos]
    };
  }

  static slideFromRight(startPos: number = 800, duration?) {
    return {
      translateX: [startPos, 0]
    };
  }

  static slideToRight(endPos: number = 800, duration?) {
    return {
      translateX: [endPos, 0]
    };
  }

  static slideFromTop(startPos: number = 800, duration?) {
    return {
      translateY: [-startPos, 0]
    };
  }

  static slideFromBottom(startPos: number = 800) {
    return {
      translateY: [startPos, 0]
    };
  }

  static fadeIn(toOpacity: number) {
    return {
      opacity: [0, 1]
    };
  }

  static fadeOut() {
    return {
      opacity: [1, 0]
    };
  }

  static rotate(deg = 720) {
    return {
      rotate: deg
    };
  }

  static scale(from: number = 1, to: number = 2) {
    return {
      scale: [from, to]
    };
  }

  static blur(from, to) {
    return {
      filter: ["blur(20px)", "blur(0px)"]
    };
  }

  static brighten(from, to) {
    return {
      filter: ["brightness(20)", "brightness(1)"]
    };
  }

  static contrast(from, to) {
    return {
      filter: ["contrast(5)", "contrast(0)"]
    };
  }
}
