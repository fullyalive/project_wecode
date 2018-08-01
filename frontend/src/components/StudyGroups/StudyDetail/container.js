import React, { Component } from "react";
import StudyDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getStudyDetail, getUserInfo } = this.props;
    getStudyDetail();
    getUserInfo();
  }

  render() {
    const { studyDetail, userInfo } = this.props;
    return (
      <StudyDetail
        {...this.state}
        studyDetail={studyDetail}
        userInfo={userInfo}
      />
    );
  }
}

export default Container;
