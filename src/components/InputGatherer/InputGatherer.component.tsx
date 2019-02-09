import React, { Component } from "react";

export default class InputGatherer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    alert("document");
  }

  render() {
    {
      this.props.children;
    }
  }
}
