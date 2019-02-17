export default class TextBoxStyles {
  constructor() {}

  static getTextBoxContainerStyles() {
    return {
      boxSizing: "border-box",
      width: "100%",
      height: "150px",
      // border: "5px solid white",
      // borderRadius: "10px",
      color: "white",
      fontSize: "20px",
      lineHeight: "25px",
      backgroundColor: "blue",
      backgroundImage: "linear-gradient(#0f1a2d, #647591)",
      // backgroundImage: "linear-gradient(black, white)",
      position: "relative",
      padding: "20px 20px"
    };
  }
}
