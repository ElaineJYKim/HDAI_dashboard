import React, { Component } from "react";
import IndexInfo from "./indexInfo";
import HistoricalChart from "./historicalChart";
import AssetInfo from "./assetInfo";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Number from "./number";

const API =
  "https://npdpl9r340.execute-api.us-east-1.amazonaws.com/prod/marketdata/v1/index/HDAI/last";

class IndexDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
      returns: [],
      constituents: [],
      isLoading: false,
      search: ""
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 5) });
  }

  componentDidMount() {
    try {
      this.setState({ isLoading: true });

      fetch(API)
        .then(response => response.json())
        .then(data =>
          this.setState({
            index: data,
            returns: data.returns,
            constituents: data.constituents,
            isLoading: false
          })
        );
      setInterval(async () => {
        this.setState({ isLoading: true });

        fetch(API)
          .then(response => response.json())
          .then(data =>
            this.setState({
              index: data,
              returns: data.returns,
              constituents: data.constituents,
              isLoading: false
            })
          );
      }, 30000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    var styles = {
      border: "100"
    };

    let filteredAssets = this.state.constituents.filter(asset => {
      return asset.assetId.indexOf(this.state.search) !== -1;
    });
    const { index, returns, constituents, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading... </p>;
    } else {
      return (
        <React.Fragment>
          <div
            className="container"
            style={{ marginTop: "4rem", marginBottom: "4rem" }}
          >
            <h1
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                fontFamily: ""
              }}
            >
              Hashdex Digital Assets Index
            </h1>
            <Row>
              <Card
                border="info"
                style={{
                  width: "13rem",
                  margin: "0.6rem"
                }}
              >
                <Card.Body>
                  <Card.Title>Current Level</Card.Title>
                  <Card.Text>
                    <Number value={index.currentValue} />
                  </Card.Text>
                </Card.Body>
              </Card>
              <IndexInfo title={"1 Hour Variation"} value={returns.h1} />
              <IndexInfo title={"24 Hour Variation"} value={returns.h24} />
              <IndexInfo title={"1 Month Variation"} value={returns.MtD} />
              <IndexInfo title={"1 Year Variation"} value={returns.YtD} />
            </Row>
          </div>

          <div className="container">
            <h2>Historical Graph</h2>
            <HistoricalChart />
          </div>

          <div className="container">
            <h2>Asset Information</h2>
            <Form inline style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <FormControl
                type="text"
                placeholder="Search Asset Details"
                className="mr-sm-2"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
              />
            </Form>
            <div className="row" style={{ marginBottom: "4rem" }}>
              {filteredAssets.map(constituents => {
                return (
                  <div
                    className="col"
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                  >
                    <AssetInfo
                      key={constituents.assetId}
                      name={constituents.assetName}
                      id={constituents.assetId}
                      lastPrice={constituents.currentPrice}
                      h24Var={constituents.returns.h24}
                      marketCap={constituents.currentMarketCap}
                      weight={constituents.currentWeight}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default IndexDetails;
