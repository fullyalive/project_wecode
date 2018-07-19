import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    searchByTerm: PropTypes.func.isRequired,
    lectureList: PropTypes.array,
    studyList: PropTypes.array
  };
  componentDidMount() {
    const { searchByTerm } = this.props;
    searchByTerm();
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.lectureList && nextProps.studyList) {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { lectureList, studyList } = this.props;
    return (
      <Explore
        {...this.state}
        lectureList={lectureList}
        studyList={studyList}
      />
    );
  }
}

export default Container;
