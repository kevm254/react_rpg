export default class DebugStyles {
  static getGameContainerStyles() {
    return {
      marginTop: "100px",
      position: "relative"
    };
  }

  static getUIContainerStyles() {
    return {
      position: "fixed",
      display: "flex",
      alignItems: "center",
      bottom: "40px",
      height: "50px",
      width: "400px"
    };
  }

  static getTileStyles() {
    return {
      display: this.props.row ? "inline-block" : "block",
      height: 64,
      width: 64,
      border: this.props.showBorder ? "1px solid white" : "",
      overflow: "hidden",
      marginTop: "-4px"
    };
  }
}
