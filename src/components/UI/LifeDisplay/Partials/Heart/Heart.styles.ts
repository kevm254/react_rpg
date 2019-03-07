export default class HeartContainerStyles {
  static getHeartContainerStyles() {
    return {
      position: "relative",
      marginRight: "40px"
    };
  }

  static getOuterHeartStyles() {
    return {
      position: "absolute",
      fontSize: "40px"
    };
  }

  static getEmptyHeartStyles() {
    return {
      position: "absolute",
      fontSize: "35px",
      left: "2px",
      top: "2px",
      color: "black"
    };
  }

  static getPartialHeartContainerStyles() {
    return {
      position: "absolute",
      width: "40px",
      height: "40px",
      overflow: "hidden",
      left: "2px",
      top: "2px"
    };
  }

  static getPartialHeartStyles() {
    return {
      position: "absolute",
      fontSize: "35px",
      color: "red"
    };
  }
}
