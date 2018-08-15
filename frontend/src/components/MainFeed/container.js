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
    window.scrollTo(0, 0);
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
    if (
      nextProps.bannerFeed !== undefined &&
      nextProps.lectureFeed !== undefined &&
      nextProps.studyFeed !== undefined
    ) {
      console.log('next.props',this.state.loading, nextProps.bannerFeed, nextProps.lectureFeed, nextProps.studyFeed);
      console.log('this.props',this.state.loading, this.props.bannerFeed, this.props.lectureFeed, this.props.studyFeed);

      this.setState({
        loading: false
      });
    } 
    if (!this.state.loading) {
      if (
        !nextProps.bannerFeed ||
        !nextProps.lectureFeed ||
        !nextProps.studyFeed
      ) {
        window.location.reload();
      }
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
