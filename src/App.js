import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import NavigationBar from "./components/navigationBar";
import IndexDetails from "./components/indexDetails";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };

    setInterval(() => {
      this.setState({
        currentTime: new Date()
      });
    }, 30000); //this is 3 seconds
  }
  render() {
    return (
      <React.Fragment>
        <NavigationBar time={this.state.currentTime.toLocaleTimeString()} />
        <IndexDetails />
      </React.Fragment>
    );
  }
}

export default App;
