import React, { Component } from "react";
import anime from "animejs";
import "./modal.css";

const modalStyles = {
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
  top: "-90px"
};

const modalMaskStyles = {
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

const modalTailStyles = {
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

const modalTextAreaStyles = {
  position: "absolute",
  height: "90px",
  width: "200px",
  zIndex: 100,
  textAlign: "center",
  fontSize: "20px",
  fontFamily: "Arial"
};

export default class Modal extends Component {
  modalRef: React.ref = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      text: "this is some modal text"
    };
  }

  componentDidMount() {
    console.log(this.modalRef.current);
    anime({
      targets: this.modalRef.current,
      opacity: [0, 1],
      scale: [0, 1],
      duration: 500,
      easing: "linear"
    });
  }

  componentWillUnMount() {}

  fadeIn() {}

  getStyles() {
    return Object.assign({}, modalStyles);
  }

  render() {
    return (
      <div style={modalStyles} ref={this.modalRef}>
        <div className="modal_mask" style={modalMaskStyles} />
        <div className="modal_text_area" style={modalTextAreaStyles}>
          {this.state.text}
        </div>
        <div className="modal_tail" style={modalTailStyles} />
      </div>
    );
  }
}
