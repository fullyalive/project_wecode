import React, { Component } from "react";
import PropTypes from "prop-types";
import PasswordChangeForm from "./presenter";

class Container extends Component {
  state = {
    currentPassWord: "",
    newPassWord: "",
    newPassWord2: ""
  };
  static propTypes = {};

  _handleInputChange = event => {
    const { 
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _handleSubmit = event => {
    const { currentPassWord, newPassWord, newPassWord2 } = this.state;
    const { username } = this.props;

    if (newPassWord !== newPassWord2)
      return alert("비밀번호가 다릅니다. 확인 해 주세요");
    const { updateUserPassword } = this.props;
    updateUserPassword(username, currentPassWord, newPassWord);
    event.preventDefault();
  };

  render() {
    const { currentPassWord, newPassWord, newPassWord2 } = this.state;
    return (
      <PasswordChangeForm
        currentPassWord={currentPassWord}
        newPassWord={newPassWord}
        newPassWord2={newPassWord2}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }
}

export default Container;
