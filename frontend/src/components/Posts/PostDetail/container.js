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

  render() {
    const { postDetail, userInfo, isLoggedIn } = this.props;
    return (
      <PostDetail
        {...this.state}
        postDetail={postDetail}
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

export default Container;