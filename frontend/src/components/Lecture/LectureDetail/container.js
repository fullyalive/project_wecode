import React, { Component } from "react";
import LectureDetail from "./presenter";

class Container extends Component {
  
  componentDidMount() {
    const { getLectureDetail } = this.props;
    getLectureDetail();
  }

  render() {
    const { lectureDetail } = this.props;
    return <LectureDetail {...this.state} lectureDetail={lectureDetail} />;
  }
}

export default Container;
