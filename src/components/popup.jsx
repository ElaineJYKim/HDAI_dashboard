import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Figure from "react-bootstrap/Figure";
import Percentage from "./percentage";
import Number from "./number";

class PopUp extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      lgShow: false,
      details: [],
      hdarp: []
    };
  }

  componentDidMount() {
    try {
      this.setState({ isLoading: true });

      fetch(
        "https://npdpl9r340.execute-api.us-east-1.amazonaws.com/prod/marketdata/v1/summary/" +
          this.props.id
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({
            details: data,
            hdarp: data.hdarp
          });
        });
      setInterval(async () => {
        this.setState({ isLoading: true });

        fetch(
          "https://npdpl9r340.execute-api.us-east-1.amazonaws.com/prod/marketdata/v1/summary/" +
            this.props.id
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({
              details: data,
              hdarp: data.hdarp
            });
          });
      }, 30000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    let lgClose = () => this.setState({ lgShow: false });
    const { details, hdarp } = this.state;

    return (
      <ButtonToolbar>
        <Button
          size="sm"
          variant="info"
          onClick={() => this.setState({ lgShow: true })}
        >
          Full Asset Detail
        </Button>

        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={lgClose}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {this.props.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-4">
                <Figure>
                  <Figure.Image
                    width={180}
                    height={180}
                    alt="Asset Logo"
                    src={
                      "https://elainejykim.github.io/" + details.symbol + ".png"
                    }
                  />
                </Figure>
              </div>
              <div className="col-8">
                <span key={this.props.name}>
                  <b>Name:</b> {this.props.name} <br />
                  <b>Symbol: </b>
                  {details.symbol} <br />
                  <b>Market Cap:</b>
                  <Number
                    value={this.props.lastPrice * details.circulating_supply}
                  />{" "}
                  <br />
                  <b>Last Price:</b> <Number value={this.props.lastPrice} />{" "}
                  <br />
                  <b>24h Variations:</b>
                  <Percentage value={this.props.h24Var} /> <br />
                  <b>Open:</b>
                  <Number value={hdarp.open} /> <br />
                  <b>High:</b> <Number value={hdarp.high} /> <br />
                  <b>Low:</b>
                  <Number value={hdarp.low} />
                </span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </ButtonToolbar>
    );
  }
}

export default PopUp;
