import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";

class Footer extends Component {
  render() {
    return (
      <Navbar expand="sm" bg="light">
        <Navbar.Brand>Last update time - {this.props.time}</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
