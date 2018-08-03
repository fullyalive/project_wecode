import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component {
  state = {
    term: ""
  };
  static propTypes = {
    goToSearch: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { getUserInfo, isLoggedIn } = this.props;
    if(isLoggedIn){
      getUserInfo();
    }
  }

  render() {
    const { userInfo, isLoggedIn } = this.props;
    return (
      <Navigation
        isLoggedIn={isLoggedIn}
        userInfo={userInfo}
        // username={username}
        // profile_image={profile_image}
        onSubmit={this._onSubmit}
        onInputChange={this._onInputChange}
        value={this.state.term}
      />
    );
  }
  _onInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      term: value
    });
  };
  _onSubmit = event => {
    const { goToSearch } = this.props;
    const { term } = this.state;
    event.preventDefault();
    goToSearch(term);
    this.setState({
      term: ""
    });
  };
}
export default Container;
