import React, { Component } from "react";
import LectureDetail from "./presenter";

class Container extends Component {
    render() {
        return <LectureDetail {...this.props} />;
    }
}

export default Container;
