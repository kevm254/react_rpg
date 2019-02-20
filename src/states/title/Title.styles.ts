export default class TitleStyles {
  static backgroundColor: string = "#221122";
  private containerStyles: any;
  private logoStyles: any;
  private menuOptionStyles: any;

  constructor() {}

  static getContainerStyles() {
    return {
      backgroundColor: "#221122",
      backgroundImage: "linear-gradient(#221122 20%, #000000 50%)",
      margin: "auto",
      color: "white",
      height: "800px"
    };
  }

  static getTitleContainerStyles() {
    return {
      paddingTop: "40px"
    };
  }

  static getLogoStyles(opts = { fontSize: "55px", color: "white" }) {
    return {
      paddingTop: "10px",
      fontFamily: "Coda Caption",
      fontSize: opts.fontSize || "50px",
      color: opts.color || "white"
    };
  }

  static getMenuOptionsStyles() {
    return {
      margin: "auto",
      width: "150px",
      textAlign: "center",
      marginTop: "100px",
      fontSize: "25px"
    };
  }
}
