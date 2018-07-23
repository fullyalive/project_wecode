import React, { Component } from "react";
import StudyDetail from "./presenter";

class Container extends Component {
  componentDidMount() {
    const { getStudyDetail } = this.props;
    getStudyDetail();
  }

  render() {
    const { studyDetail } = this.props;
    return <StudyDetail {...this.state} studyDetail={studyDetail} />;
  }
}

export default Container;
