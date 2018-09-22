import React, { Component } from "react";
import PropTypes from "prop-types";
import Comment from "./presenter";

class Container extends Component {
  state = {
    currentComment: this.props.comment,
    currentRecomment: "",
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
        handleRecommentInputChange={this._handleRecommentInputChange}
        onClick={this._onClick}
        onRecommentClick={this._onRecommentClick}
        onRecommentSubmitClick={this._onRecommentSubmitClick}
        onDeleteClick={this._onDeleteClick}
        onRecommentDeleteClick={this._onRecommentDeleteClick}
        onSubmitClick={this._onSubmitClick}
      />
    );
  }
  _onRecommentClick = event => {
    this.setState({
      isReEdit: !this.state.isReEdit,

    });
  };
  _onClick = event => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };
  _onDeleteClick = event => {
    const { deleteComment } = this.props;
    deleteComment();
  };
  _onRecommentDeleteClick = event => {
    const { deleteRecomment } = this.props;
    deleteRecomment();
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
  _handleInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      currentComment: value
    });
  };
  _handleRecommentInputChange = event => {
    const {
      target: { value }
    } = event;
    this.setState({
      currentRecomment: value
    });
  };
}

export default Container;
