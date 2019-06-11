import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: false,
    legendPositions: "right"
  };

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Index Value Over Time",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPositions
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Date",
                    fontSize: 15,
                    fontStyle: "bold"
                  },
                  ticks: {
                    major: {
                      fontStyle: "bold",
                      fontColor: "#FF0000"
                    }
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Value",
                    fontSize: 15,
                    fontStyle: "bold"
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
