import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Percentage from "./percentage";

class IndexInfo extends Component {
  render() {
    return (
      <Card border="info" style={{ width: "13rem", margin: "0.6rem" }}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>
            <Percentage value={this.props.value} />
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default IndexInfo;
