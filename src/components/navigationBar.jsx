import React, { Component } from "react";
//import styled from "style-components";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class NavigationBar extends Component {
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 5) });
  }

  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          class="sticky-top"
        >
          <Navbar.Brand href="#home">HDAI</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="">Last update time - {this.props.time} </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
