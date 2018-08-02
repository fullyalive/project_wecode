import React, { Component } from "react";
import PropTypes from "prop-types";
import ChangeUserInfo from "./presenter";

class Container extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }w

  render() {
    const { userInfo } = this.props;
    return <ChangeUserInfo userInfo={userInfo} />;
  }
}

export default Container;
