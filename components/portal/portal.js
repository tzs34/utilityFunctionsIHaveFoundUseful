import React, { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

class Portal extends Component {
  domElement = document.createElement("div");

  componentDidMount() {
    modalRoot.appendChild(this.domElement);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.domElement);
  }

  render() {
    return createPortal(this.props.children, this.domElement);
  }
}

export default Portal;
