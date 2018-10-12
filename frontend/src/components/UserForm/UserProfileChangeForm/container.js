import React, { Component } from "react";
import PropTypes from "prop-types";
import UserProfileChangeForm from "./presenter";
import { throws } from "assert";
class Container extends Component {
  state = {
    bio: this.props.bio !== null ? this.props.bio : "",
    name: this.props.name !== null ? this.props.name : "",
    phone: this.props.phone !== null ? this.props.phone : "",
    website: this.props.website !== null ? this.props.website : ""
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
    const { bio, name, phone, website } = this.state;
    const { updateUserProfile } = this.props;
    updateUserProfile(name, bio, phone, website);
    event.preventDefault();
  };
  render() {
    const { bio, name, phone, website } = this.state;
    return (
      <UserProfileChangeForm
        bio={bio}
        name={name}
        phone={phone}
        website={website}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
      />
    );
  }
}
export default Container;
