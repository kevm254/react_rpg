export default class TextBubbleStyles {
  static getTextBubbleContainerStyles() {
    return {
      boxSizing: "border-box",
      height: "140px",
      width: "250px",
      position: "absolute",
      color: "black",
      borderRadius: "100px",
      backgroundColor: "rgba(255, 255, 255, 1)",
      zIndex: 100,
      border: "5px solid gray",
      padding: "20px",
      top: "-90px",
      overflow: "hidden"
    };
  }

  static getTextBubbleMaskStyles() {
    return {
      position: "absolute",
      top: "31px",
      marginLeft: "12px",
      left: "0px",
      height: "100px",
      width: "200px",
      borderRadius: "100px",
      backgroundColor: "white",
      zIndex: 80
    };
  }

  static getTextBubbleTailStyles() {
    return {
      backgroundColor: "white",
      border: "4px solid gray",
      height: "40px",
      width: "40px",
      bottom: "-10px",
      left: "40px",
      position: "absolute",
      zIndex: 50,
      transform: "rotate(-10deg)"
    };
  }

  static getTextBubbleTextAreaStyles() {
    return {
      position: "absolute",
      height: "90px",
      width: "200px",
      zIndex: 100,
      textAlign: "center",
      fontSize: "20px",
      fontFamily: "Arial"
    };
  }
}
