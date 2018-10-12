import React, { Component } from "react";
import PropTypes from "prop-types";
import MainFeed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getLectureFeed: PropTypes.func.isRequired
    // getBannerFeed: PropTypes.func.isRequired,
    // getSztudyFeed: PropTypes.func.isRequired
  };
  componentDidMount() {
    const {
      getLectureFeed
      // getBannerFeed, getStudyFeed
    } = this.props;
    window.scrollTo(0, 0);
    if (this.state.loading) {
      getLectureFeed();
      // getBannerFeed();
      // getStudyFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.lectureFeed) {
      // nextProps.bannerFeed !== undefined &&
      // nextProps.studyFeed !== undefined
      this.setState({
        loading: false
      });
    }
    // if (!this.state.loading) {
    //   if (
    //     !nextProps.bannerFeed ||
    //     !nextProps.lectureFeed ||
    //     !nextProps.studyFeed
    //   ) {
    //     window.location.reload();
    //   }
    // }
  };

  render() {
    const { 
      lectureFeed,
      // bannerFeed, studyFeed 
    } = this.props;
    return (
      <MainFeed
        {...this.state}
        lectureFeed={lectureFeed}
        // bannerFeed={bannerFeed}
        // studyFeed={studyFeed}
      />
    );
  }
}

export default Container;
