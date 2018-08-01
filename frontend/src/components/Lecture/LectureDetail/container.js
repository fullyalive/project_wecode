import React, { Component } from "react";
import LectureDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getLectureDetail, getUserInfo } = this.props;
    getLectureDetail();
    getUserInfo();
  }

  render() {
    const { lectureDetail, userInfo } = this.props;
    return (
      <LectureDetail
        {...this.state}
        lectureDetail={lectureDetail}
        userInfo={userInfo}
      />
    );
  }
}

export default Container;
