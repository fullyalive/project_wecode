import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    lectureSearchByTerm: PropTypes.func.isRequired,
    studySearchByTerm: PropTypes.func.isRequired,
    lectureList: PropTypes.array,
    studyList: PropTypes.array
  };
  componentDidMount() {
    const {
      lectureSearchByTerm,
      studySearchByTerm,
      postSearchByTerm
    } = this.props;
    lectureSearchByTerm();
    studySearchByTerm();
    postSearchByTerm();
  }
  componentDidUpdate = (prevProps, prevState) => {
    const {
      lectureSearchByTerm,
      studySearchByTerm,
      postSearchByTerm
    } = this.props;
    if (prevProps.match.params !== this.props.match.params) {
      lectureSearchByTerm();
      studySearchByTerm();
      postSearchByTerm();
    }
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.lectureList && nextProps.studyList) {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { lectureList, studyList, postList } = this.props;

    return (
      <Explore
        {...this.state}
        lectureList={lectureList}
        studyList={studyList}
        postList={postList}
      />
    );
  }
}

export default Container;
