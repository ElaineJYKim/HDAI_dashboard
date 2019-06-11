import React, { Component } from "react";

class Tester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(
      "https://npdpl9r340.execute-api.us-east-1.amazonaws.com/prod/marketdata/v1/summary/" +
        this.props.btc
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          values: data
        })
      );
  }

  render() {
    const { values } = this.state;
    return (
      <div>
        <h1> {values.symbol}</h1>
      </div>
    );
  }
}

export default Tester;
