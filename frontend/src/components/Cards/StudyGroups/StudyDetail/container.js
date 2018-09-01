import React, { Component } from "react";
import StudyDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getStudyDetail, getUserInfo, isLoggedIn } = this.props;
    getStudyDetail();
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      getUserInfo();
    }
  }

  componentWillUnmount() {
    const { setResetStudyDetail } = this.props;
    setResetStudyDetail();
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
