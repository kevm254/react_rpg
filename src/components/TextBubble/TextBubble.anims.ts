import anime from "animejs";

export default class TextBubbleAnims {
  static fadeInBody(data: { targets; onComplete? }) {
    anime({
      targets: data.targets,
      opacity: [0, 1],
      scale: [0, 1],
      duration: 500,
      easing: "linear",
      complete: data.onComplete ? data.onComplete : null
    });
  }

  static fadeOutBody(data: { targets; onComplete? }) {
    anime({
      targets: data.targets,
      opacity: [1, 0],
      scale: [1, 0],
      duration: 300,
      easing: "linear",
      complete: data.onComplete ? data.onComplete : null
    });
  }

  static slideTextIn(data: { targets; onComplete? }) {
    return anime({
      targets: data.targets,
      opacity: [0, 1],
      translateX: [-300, 0],
      skew: ["0deg", "-20deg", "-25deg", "0deg"],
      duratiion: 400,
      easing: "linear"
    });
  }

  static slideTextOut(data: { targets; onComplete? }) {
    return anime({
      targets: data.targets,
      opacity: [1, 0],
      translateX: [0, 200],
      skew: ["0deg", "-20deg", "-25deg"],
      duratiion: 1400,
      easing: "linear",
      complete: data.onComplete ? data.onComplete : null
    });
  }
}
