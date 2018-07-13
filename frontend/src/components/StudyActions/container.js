import React, { Component } from "react";
import StudyActions from "./presenter";

class Container extends Component {
  render() {
    return <StudyActions {...this.props} />;
  }
}

export default Container;