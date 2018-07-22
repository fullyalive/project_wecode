import React, { Component } from "react";
import PropTypes from "prop-types";
import UserForm from "./presenter";

class Container extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRquired
  };
  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  render() {
    const { userInfo } = this.props;
    return <UserForm {...this.state} userInfo={userInfo} />;
  }
}

export default Container;