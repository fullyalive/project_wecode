import React, { Component } from "react";
import LoginForm from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: ""
  };
  render() {
    const { username, password } = this.state;
    return (
      <LoginForm
        usernameValue={username}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleFacebooklogin={this._handleFacebookLogin}
        handleSubmit={this._handleSubmit}
      />
    );
  }
  _handleInputChange = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _handleSubmit = event => {
      event.preventDefault();
  }
  _handleFacebookLogin = response => {
    console.log(response);
  }
}

export default Container;
