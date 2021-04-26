import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";

class Controller extends Component {
  constructor() {
    super();
    this.note = "Triggered from router";
  }
  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={props => <Login {...props} note={this.note} />}
          />
          <Route
            exact
            path="/home"
            render={props => <Home {...props} note={this.note} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
