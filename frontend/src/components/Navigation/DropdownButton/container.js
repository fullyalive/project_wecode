import React, { Component } from "react";
import DropdownButton from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this._onLogoutClick = this._onLogoutClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      // dropdownOpen: !this.state.dropdownOpen
    });
  }

  _onLogoutClick() {
    const { logout, goToHome } = this.props;
    logout();
    goToHome();
  }

  render() {
    const { userInfo } = this.props;
    const { dropdownOpen } = this.state; 
    
    return (
      <DropdownButton
        userInfo={userInfo}
        onLogoutClick={this._onLogoutClick}
        isOpen={dropdownOpen}
        toggle={this.toggle}
      />
    );
  }
}

export default Container;
