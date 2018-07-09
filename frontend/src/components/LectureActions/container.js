import React, { Component } from "react";
import LectureActions from "./presenter";

class Container extends Component {
  render() {
    return <LectureActions {...this.props} />;
  }
}

export default Container;
