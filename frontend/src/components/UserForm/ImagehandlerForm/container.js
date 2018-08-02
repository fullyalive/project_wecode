import React, { Component } from "react";
import PropTypes from "prop-types";
import ImagehandlerForm from "./presenter";

class container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    getUserInfo: PropTypes.func.isRequired
  };

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    const { updateUserPhoto } = this.props;
    updateUserPhoto(this.state.file);
    // window.location.reload();
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    const { token, userInfo, updateUserPhoto } = this.props;
    return (
      <ImagehandlerForm
        token={token}
        userInfo={userInfo}
        updateUserPhoto={updateUserPhoto}
        onFormSubmit={this.onFormSubmit}
        onChange={this.onChange}
      />
    );
  }
}

export default container;
