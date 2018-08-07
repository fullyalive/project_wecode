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
    return (
      <PostDetail
        {...this.state}
        postDetail={postDetail}
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
        onDeleteClick={this.onDeleteClick.bind(this)}
      />
    );
  }
}

export default Container;
