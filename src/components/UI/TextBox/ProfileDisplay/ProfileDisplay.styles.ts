export default class ProfileDisplayStyles {
  constructor() {}

  static getProfileDisplayContainerStyles() {
    return {
      position: "absolute",
      top: "-128px",
      left: "20px",
      backgroundColor: "gray",
      fontSize: "40px",
      height: "100px",
      width: "100px",
      border: "5px solid white"
    };
  }

  static getImageStyles() {
    return {
      height: "100px",
      width: "100px"
    };
  }
}
