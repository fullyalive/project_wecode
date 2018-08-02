import React, { Component } from "react";
import StudyDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getStudyDetail, getUserInfo, isLoggedIn } = this.props;
    getStudyDetail();
    if (isLoggedIn) {
      getUserInfo();
    }
  }

  render() {
    const { studyDetail, userInfo, isLoggedIn } = this.props;
    return (
      <StudyDetail
        {...this.state}
        studyDetail={studyDetail}
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

export default Container;
