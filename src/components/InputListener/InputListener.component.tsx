import React, { Component, Fragment } from "react";

export default class InputListener extends Component {
  constructor(props) {
    super(props);
  }

  listenToKeyPress() {}

  componentDidMount() {
    this.listenToKeyPress();
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}
