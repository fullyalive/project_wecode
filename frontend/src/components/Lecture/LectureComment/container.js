import React, { Component } from "react";
import PropTypes from "prop-types";
import LectureComment from "./presenter";

class Container extends Component {
  state = {
    currentComment: this.props.comment,
    isEdit: false
  };
  static propTypes = {
    submitComment: PropTypes.func.isRequired
  };
  render() {
    return (
      <LectureComment
        {...this.state}
        {...this.props}
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
        onClick={this._onClick}
      />
    );
  }
  _onClick = event => {
    this.setState({
      isEdit: true
    });
  };
  _handleInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      currentComment: value
    });
  };
  _handleKeyPress = event => {
    const { submitComment } = this.props;
    const { currentComment } = this.state;
    const { key } = event;
    if (key === "Enter") {
      event.preventDefault();
      submitComment(currentComment);
      this.setState({
        currentComment: "",
        isEdit: false
      });
    }
  };
}

export default Container;
