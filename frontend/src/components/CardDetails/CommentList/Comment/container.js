import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./presenter";

class Container extends Component {
  state = {
    currentComment: this.props.comment,
    isEdit: false,
    isReEdit: false
  };
  static propTypes = {
    submitComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
  };
  render() {
    return (
      <Comment
        {...this.state}
        {...this.props}
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
        onClick={this._onClick}
        onSubmitClick={this._onSubmitClick}
        onDeleteClick={this._onDeleteClick}
        handleRecommentInputChange={this._handleRecommentInputchange}
        handleRecommentKeyPress={this._handleRecommentKeyPress}
        onRecommentClick={this._onRecmomentClick}
        onRecommentSubmitClick={this._onRecommentSubmitClick}
        onRecommentDeleteClick={this._onRecommentDeleteClick}
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

  _onSubmitClick = event => {
    const { submitComment } = this.props;
    const { currentComment } = this.state;
    event.preventDefault();
    submitComment(currentComment);
    this.setState({
      isEdit: !this.state.isEdit
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
        isEdit: false
      });
    }
  };

  _onRecommentClick = event => {
    this.setState({
      isReEdit: !this.state.isReEdit
    });
  };

  _onRecommentDeleteClick = event => {
    const { deleteComment } = this.props;
    deleteComment();
  };

  _onRecommentSubmitClick = event => {
    const { submitRecomment } = this.props;
    const { currentRecomment } = this.state;
    event.preventDefault();
    submitRecomment(currentRecomment);
    this.setState({
      isReEdit: !this.state.isReEdit,
      currentRecomment: ""
    });
  };

  _handleRecommentInputchange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      currentRecomment: value
    });
  };

  _handleRecommentKeyPress = event => {
    const { submitRecomment } = this.props;
    const { currentRecomment } = this.state;
    const { key } = event;

    if (key === "Enter") {
      event.preventDefault();
      submitRecomment(currentRecomment);
      this.setState({
        isReEdit: false,
        currentRecomment: ""
      });
    }
  };
}

export default Container;
