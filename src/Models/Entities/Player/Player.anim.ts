import anime from "animejs";

export default class PlayerAnims {
  static animateMouth(ref) {
    anime({
      targets: [ref],
      scaleX: [1, 0.5, 1],
      scaleY: [1, 1.2, 1],
      easing: "linear",
      duration: 550,
      loop: true
    });
  }

  static animateEyeLids(lids: string[]) {
    anime({
      targets: lids,
      translateY: [0, -100, 0],
      loop: true,
      easing: "easeInQuart",
      duration: 900
    });
  }

  static animateLeftPupil() {
    anime({
      targets: [".player_inner_eye_left"],
      translateY: [0, 1, 0, -1, 0],
      translateX: [0, 1, 0, 1],
      easing: "linear",
      loop: true,
      duration: 800
    });
  }

  static animateRightPupil() {
    anime({
      targets: [".player_inner_eye_right"],
      translateY: [0, 2, 0, -1, 0],
      translateX: [0, -1, 0, -1, 0],
      easing: "linear",
      loop: true,
      duration: 800
    });
  }

  static rollPlayer1(ref) {
    anime({
      targets: ref,
      rotate: [0, 180],
      easing: "easeOutQuad",
      duration: 350
    });
  }
  static rollPlayer2(ref) {
    anime({
      targets: ref,
      rotate: [180, 360],
      easing: "easeOutQuad",
      duration: 350
    });
  }
}
