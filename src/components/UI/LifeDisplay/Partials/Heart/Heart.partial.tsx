import React, { Component, Fragment } from "react";
import HeartStyles from "./Heart.styles";

export default class Heart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span style={HeartStyles.getHeartContainerStyles()}>
        <i style={HeartStyles.getOuterHeartStyles()} className="fas fa-heart" />

        <i style={HeartStyles.getEmptyHeartStyles()} className="fas fa-heart" />

        <div style={HeartStyles.getPartialHeartContainerStyles()}>
          <i
            style={HeartStyles.getPartialHeartStyles()}
            className="fas fa-heart"
          />
        </div>
      </span>
    );
  }
}
