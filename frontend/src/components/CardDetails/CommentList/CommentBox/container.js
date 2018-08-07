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
        onSubmintClick={this._onSubmintClick}
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
  
  _onSubmintClick = event => {
    const { submitComment } = this.props;
    const { comment } = this.state;
    event.preventDefault();
    submitComment(comment);
    this.setState({
      comment: ""
    });
  };

  _handleKeyPress = event => {
    const { submitComment } = this.props;
    const { comment } = this.state;
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      submitComment(comment);
      this.setState({
        comment: ""
      });
    }
  };
}

export default Container;
