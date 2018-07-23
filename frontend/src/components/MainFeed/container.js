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
    if (nextProps.bannerFeed && nextProps.lectureFeed && nextProps.studyFeed ) {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { bannerFeed, lectureFeed, studyFeed } = this.props;
    return (
      <MainFeed
        {...this.state}
        bannerFeed={bannerFeed}
        lectureFeed={lectureFeed}
        studyFeed={studyFeed}
      />
    );
  }
}

export default Container;
