import React, { Component } from "react";
import PropTypes from "prop-types";
import StudyComment from "./presenter";

class Container extends Component {
  state = {
    currentComment: this.props.comment,
    isEdit: false
  };
  static propTypes = {
    submitComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  };
  render() {
    return (
      <StudyComment
        {...this.state}
        {...this.props}
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
        onClick={this._onClick}
        onDeleteClick={this._onDeleteClick}
      />
    );
  }

  _onClick = event => {
    this.setState({
      isEdit: true
    });
  };
  _onDeleteClick = event => {
    const { deleteComment } = this.props;
    deleteComment();
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
