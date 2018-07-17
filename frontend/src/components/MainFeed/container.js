import React, { Component } from "react";
import PropTypes from "prop-types";
import MainFeed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getLectureFeed: PropTypes.func.isRequired,
    getStudyFeed: PropTypes.func.isRequired
  };
  componentDidMount() {
    const { getLectureFeed, getStudyFeed } = this.props;

    if (!this.props.lectureFeed) {
      getLectureFeed();
      getStudyFeed();
    } 
    
    else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.studyFeed && nextProps.lectureFeed ) {
      this.setState({
        loading: false
      });
    }
  };
  render() {

    const { studyFeed, lectureFeed } = this.props;
    return <MainFeed {...this.state} studyFeed={studyFeed} lectureFeed={lectureFeed}/>;
  }
}

export default Container;
