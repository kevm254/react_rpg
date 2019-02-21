import React, { Component } from "react";
import ProfileDisplayStyles from "./ProfileDisplay.styles";

enum Character {
  KEN = "https://i.pinimg.com/originals/9a/98/af/9a98af8af0d30ce7d27b466401f332fe.jpg",
  SAGAT = "https://vignette.wikia.nocookie.net/streetfighter/images/d/d9/Character_Select_Sagat_by_UdonCrew.jpg/revision/latest?cb=20091113010442"
}

export default class ProfileDisplay extends Component {
  render() {
    return (
      <div style={ProfileDisplayStyles.getProfileDisplayContainerStyles()}>
        <img
          style={ProfileDisplayStyles.getImageStyles()}
          src={this.props.profileImage}
        />
      </div>
    );
  }
}
