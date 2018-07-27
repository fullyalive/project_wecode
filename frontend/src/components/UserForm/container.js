import React, { Component } from "react";
import PropTypes from "prop-types";
import UserForm from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this._onLogoutClick = this._onLogoutClick.bind(this);
  }
  static propTypes = {
    getUserInfo: PropTypes.func.isRquired
  };

  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }
  _onLogoutClick() {
    const { logout } = this.props;
    logout();
  }

  render() {
    const { userInfo } = this.props;
    return (
      <UserForm
        {...this.state}
        userInfo={userInfo}
        onLogoutClick={this._onLogoutClick}
      />
    );
  }
}

export default Container;
