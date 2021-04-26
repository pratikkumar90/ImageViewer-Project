import React, { Component } from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import Header from "../../common/header/Header";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameRequired: "display-none",
      username: "",
      loginPasswordRequired: "display-none",
      loginPassword: "",
      loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
      loginControl: "display-none"
    };
  }

  closeModalHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  tabChangeHandler = (event, value) => {
    this.setState({ value });
  };

  loginClickHandler = () => {
    let hardCodedUserName = "asd";
    let hardCodedPassword = "123";

    let hardCodedAccessToken =
      "IGQVJYVklNeEFScHlFdEp5Y2tiMVVjQkxXWnhXN0JYOVQwYjFyNFZAnM0hJamdjblI3b2xnSkZAENkd0WGFKYmVnRWV2RkpFejVUYVBkM0RMa1IxckZA3MGRScFcwQlhkVWYtS05ENVF6WndtOVlKM2VGMgZDZD";

    console.log("username=" + this.state.username);

    this.state.username === ""
      ? this.setState({ usernameRequired: "display-block" })
      : this.setState({ usernameRequired: "display-none" });
    this.state.loginPassword === ""
      ? this.setState({ loginPasswordRequired: "display-block" })
      : this.setState({ loginPasswordRequired: "display-none" });

    if (this.state.username === "" || this.state.loginPassword === "") {
      return;
    }

    if (
      this.state.username === hardCodedUserName &&
      this.state.loginPassword === hardCodedPassword
    ) {
      sessionStorage.setItem("access-token", hardCodedAccessToken);
      // Redirect to next page
      this.props.history.push("/home");
    } else {
      this.setState({ loginControl: "display-block" });
    }
  };

  inputUsernameChangeHandler = e => {
    this.setState({ username: e.target.value });
  };

  inputLoginPasswordChangeHandler = e => {
    this.setState({ loginPassword: e.target.value });
  };

  render() {
    return (
      <div>
        <Header history={this.props.history} />

        <div className="login-card">
          <br />

          <Card className="login-content">
            <CardContent>
              <b>LOGIN</b>
              <br />
              <br />

              <FormControl required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                  id="username"
                  type="text"
                  username={this.state.username}
                  onChange={this.inputUsernameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl required fullWidth>
                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                <Input
                  id="loginPassword"
                  type="password"
                  loginpassword={this.state.loginPassword}
                  onChange={this.inputLoginPasswordChangeHandler}
                />
                <FormHelperText className={this.state.loginPasswordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormHelperText
                id="error-text"
                className={this.state.loginControl}
              >
                <br />
                <span className="red">
                  {" "}
                  Incorrect username and/or password{" "}
                </span>
              </FormHelperText>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                LOGIN
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default Login;
