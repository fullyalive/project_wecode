import React, { Component } from "react";
import PropTypes from "prop-types";
import UserForm from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
    this._onLogoutClick = this._onLogoutClick.bind(this);
    this._togglePopup = this._togglePopup.bind(this);
  }

  static propTypes = {
    getUserInfo: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserInfo, isLoggedIn, goToHome } = this.props;
    if (!isLoggedIn) {
      goToHome();
    } else {
      getUserInfo();
    }
  }
  _togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    const { logout, goToHome } = this.props;
    logout();
    goToHome();
  }
  _onLogoutClick() {
    // const { logout } = this.props;
    // logout();
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    const { userInfo } = this.props;
    const { showPopup } = this.state;
    return (
      <UserForm
        userInfo={userInfo}
        showPopup={showPopup}
        onLogoutClick={this._onLogoutClick}
        togglePopup={this._togglePopup}
      />
    );
  }
}

export default Container;
