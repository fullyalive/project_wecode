import React, { Component } from "react";
import LectureDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getLectureDetail, getUserInfo, isLoggedIn } = this.props;
    getLectureDetail();
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      getUserInfo();
    }
  }
  
  componentWillUnmount() {
    const { setResetLectureDetail } = this.props;
    setResetLectureDetail();
  }

  render() {
    const { lectureDetail, userInfo, isLoggedIn } = this.props;
    return (
      <LectureDetail
        {...this.state}
        lectureDetail={lectureDetail}
        userInfo={userInfo}
        isLoggedIn={isLoggedIn}
      />
    );
  }
}

export default Container;
