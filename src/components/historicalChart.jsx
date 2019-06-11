import React, { Component } from "react";
import Chart from "./chart";

const API =
  "https://npdpl9r340.execute-api.us-east-1.amazonaws.com/prod/marketdata/v1/index/HDAI/history?from=2019-01-01&to=2050-01-01&groupBy=1d";

class HistoricalChart extends Component {
  constructor() {
    super();

    this.state = {
      chartData: {},
      isLoading: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      fetch(API)
        .then(response => response.json())
        .then(data => {
          const allData = data;
          let values = [];
          let times = [];
          allData.forEach(element => {
            values.push(element.currentValue);
            times.push(element.time);
          });
          this.setState({
            chartData: {
              labels: times,
              datasets: [
                {
                  label: "Value During Specified Time",
                  data: values,
                  backgroundColor: ["rgba(54, 162, 235, 0.6)"]
                }
              ]
            },
            isLoading: false
          });
        });
      setInterval(async () => {
        this.setState({ isLoading: true });
        fetch(API)
          .then(response => response.json())
          .then(data => {
            const allData = data;
            let values = [];
            let times = [];
            allData.forEach(element => {
              values.push(element.currentValue);
              times.push(element.time);
            });
            this.setState({
              chartData: {
                labels: times,
                datasets: [
                  {
                    label: "Value During Specified Time",
                    data: values,
                    backgroundColor: ["rgba(54, 162, 235, 0.6)"]
                  }
                ]
              },
              isLoading: false //WTF?????? only works when its false..
            });
          });
      }, 30000);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { chartData, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading... </p>;
    } else {
      return (
        <React.Fragment>
          <div
            className="container"
            style={{ marginTop: "2rem", marginBottom: "4rem" }}
          >
            <Chart chartData={chartData} />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default HistoricalChart;
