interface Position {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
}

export default class PlayerStyles {
  static getContainerStyles() {
    return {
      top: 0,
      position: "relative",
      height: "64px",
      width: "64px"
    };
  }

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

  static getOuterEyeStyles(styleData: Position) {
    return {
      ...styleData,
      borderRadius: "50px",
      height: "17px",
      overflow: "hidden",
      width: "14px",
      position: "absolute",
      border: "1px solid black",
      backgroundColor: "white"
    };
  }

  static getEyeLidStyles(lidPos: Position) {
    return {
      position: "absolute",
      top: "-17px",
      height: "17px",
      width: "14px",
      borderRadius: "100px",
      backgroundColor: "blue",
      zIndex: 520
    };
  }
}
