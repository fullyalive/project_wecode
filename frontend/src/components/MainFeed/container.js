import React, { Component } from "react";
import PropTypes from "prop-types";
import MainFeed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getBannerFeed: PropTypes.func.isRequired,
    getLectureFeed: PropTypes.func.isRequired,
    getStudyFeed: PropTypes.func.isRequired
  };
  componentDidMount() {
    const { getBannerFeed, getLectureFeed, getStudyFeed } = this.props;

    if (!this.props.lectureFeed) {
      getBannerFeed();
      getLectureFeed();
      getStudyFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.bannerFeed && nextProps.studyFeed && nextProps.lectureFeed) {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { bannerFeed, studyFeed, lectureFeed } = this.props;
    return (
      <MainFeed
        {...this.state}
        bannerFeed={bannerFeed}
        studyFeed={studyFeed}
        lectureFeed={lectureFeed}
      />
    );
  }
}

export default Container;
