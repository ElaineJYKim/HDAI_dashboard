import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import PopUp from "./popup";
import Number from "./number";
import Percentage from "./percentage";

class AssetInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: "1.5rem" }}>
              {this.props.name}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.props.id}
            </Card.Subtitle>
            <Card.Text>
              <span key={this.props.id}>
                <b>Price:</b> <Number value={this.props.lastPrice} />
                <br />
                <b>24 Hour Variation: </b>
                <Percentage value={this.props.h24Var} />
                <br />
                <b>Current Market Cap:</b>
                <Number value={this.props.marketCap} />
                <br />
                <b>Index Weight:</b> <Number value={this.props.weight} />
              </span>
            </Card.Text>

            <PopUp
              name={this.props.name}
              id={this.props.id}
              h24Var={this.props.h24Var}
              lastPrice={this.props.lastPrice}
            />
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default AssetInfo;
