export default class PlayerStyles {
  static getBodyStyles() {
    return {
      height: "64px",
      top: "64px",
      width: "64px",
      borderRadius: "100px",
      backgroundColor: "royalblue",
      overflow: "hidden",
      position: "absolute",
      border: "1px solid black",
      boxSizing: "border-box",
      zIndex: 1
    };
  }

  static getTextureStyles() {
    return {
      position: "absolute",
      height: "64px",
      width: "64px",
      top: 0,
      left: 0
    };
  }

  static getOuterEyeStyles(eyePos: {
    left?: number | string;
    right?: number | string;
    top?: number | string;
    bottom?: number | string;
  }) {
    return {
      ...eyePos,
      borderRadius: "50px",
      height: "17px",
      width: "14px",
      position: "absolute",
      border: "1px solid black",
      backgroundColor: "white",
      overflow: "hidden"
    };
  }
}
