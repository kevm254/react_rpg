export default class TitleStyles {
  static backgroundColor: string = "#221122";
  private containerStyles: any;
  private logoStyles: any;
  private menuOptionStyles: any;

  constructor() {
    this.getContainerStyles = this.getContainerStyles.bind(this);
  }

  get(styles: string) {
    switch (styles) {
      case StylesKey.CONTAINER:
        return this.getContainerStyles();
      case StylesKey.LOGO:
        return this.getLogoStyles();
      case StylesKey.MENU_OPTIONS:
        return this.getMenuOptionsStyles();
    }
  }

  setContainerStyles(key: string, prop: any) {
    switch (key) {
      case StylesKey.CONTAINER:
        alert("inside container");
        this.containerStyles = Object.assign({}, this.containerStyles, prop);
      case StylesKey.LOGO:
      case StylesKey.MENU_OPTIONS:
    }
  }

  getContainerStyles() {
    return {
      backgroundColor: "#221122",
      margin: "auto",
      color: "white",
      height: "80vh",
      overflow: "hidden",
      width: "100%"
    };
  }

  getLogoStyles() {
    return {
      paddingTop: "120px",
      fontFamily: "Coda Caption",
      fontSize: "80px",
      color: "white"
    };
  }

  getMenuOptionsStyles() {
    return {
      margin: "auto",
      width: "150px",
      textAlign: "center",
      marginTop: "80px",
      fontSize: "25px"
    };
  }
}

export enum StylesKey {
  CONTAINER = "CONTAINER",
  MENU_OPTIONS = "MENU_OPTIONS"
}
