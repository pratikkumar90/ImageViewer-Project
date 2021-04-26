import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./login/Login";
import Profile from "./profile/Profile";

class Controller extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <Route exact path="/" render={props => <Login {...props} />} />
          <Route exact path="/home" render={props => <Home {...props} />} />
          <Route
            exact
            path="/profile"
            render={props => <Profile {...props} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
