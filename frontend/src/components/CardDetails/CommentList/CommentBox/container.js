import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentBox from "./presenter";

class Container extends Component {
  state = {
    comment: ""
  };
  static propTypes = {
    submitComment: PropTypes.func.isRequired
  };
  render() {
    return (
      <CommentBox
        {...this.state}
        {...this.props}
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
        onSubmitClick={this._onSubmitClick}
      />
    );
  }
  _handleInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      comment: value
    });
  };

  _onSubmitClick = event => {
    const { submitComment } = this.props;
    const { comment } = this.state;
    event.preventDefault();
    submitComment(comment);
    this.setState({
      comment: ""
    });
  };
}

export default Container;
