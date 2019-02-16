import anime from "animejs";

export default class CommonAnims {
  target: any;

  constructor(target) {
    this.target = target;
  }

  static constructAnim(animType, duration?) {
    let animObj: any = {};
    if (duration) {
      Object.assign({}, animType, duration);
    } else {
      Object.assign({});
    }
  }

  static slideFromLeft(startPos: number = 800, duration?) {
    return this.constructAnim({
      translateX: [-startPos, 0]
    });
  }

  static slideToLeft(endPos: number = 800, duration?) {
    return {
      translateX: [0, -800],
      duration: 1000
    };
  }

  static slideFromRight(startPos: number = 800, duration?) {
    return {
      translateX: [startPos, 0],
      duration: 1000
    };
  }

  static slideToRight(startPos: number = 800, duration?) {
    return {
      translateX: [800, 0],
      duration: 1000
    };
  }

  static slideFromTop(startPos: number = 800, duration?) {
    return {
      translateY: [-800, 0],
      duration: 1000
    };
  }

  static fadeIn(toOpacity: number) {
    return {
      opacity: [0, 1],
      duration: 1000
    };
  }

  static fadeOut() {
    return {
      opacity: [1, 0],
      duration: 1000
    };
  }
}
