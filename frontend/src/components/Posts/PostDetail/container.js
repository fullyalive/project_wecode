import React, { Component } from "react";
import PostDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getPostDetail, getUserInfo, isLoggedIn } = this.props;
    getPostDetail();
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      getUserInfo();
    }
  }

  componentWillUnmount() {
    const { setResetPostDetail } = this.props;
    setResetPostDetail();
  }

  onDeleteClick(event) {
    const { postDetail } = this.props;
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      this.props.deletePost(postDetail);
    } else {
      return;
    }
  }

  render() {
    const { postDetail, userInfo, isLoggedIn } = this.props;
    const { postId } = this.props.match.params;
    return (
      <PostDetail
        {...this.state}
        postDetail={postDetail}
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
        onDeleteClick={this.onDeleteClick.bind(this)}
        postId={postId}
      />
    );
  }
}

export default Container;
