import anime from "animejs";

export default class CommonAnims {
  target: any;

  constructor(target) {
    this.target = target;
  }

  static slideFromLeft(startPos: number = 800) {
    return { translateX: [-startPos, 0] };
  }

  static slideToLeft(endPos) {
    return { translateX: [0, -800] };
  }

  static slideFromRight(startPos: number = 800) {
    return { translateX: [startPos, 0] };
  }

  static slideToRight() {
    return { translateX: [800, 0] };
  }

  static slideFromTop() {
    return { translateY: [] };
  }

  static fadeIn() {
    return { opacity: [0, 1] };
  }

  static fadeOut() {
    return { opacity: [1, 0] };
  }
}
