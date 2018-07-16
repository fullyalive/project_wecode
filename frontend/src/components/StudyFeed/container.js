import React, { Component } from "react";
import PropTypes from "prop-types";
import StudyFeed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getStudyFeed: PropTypes.func.isRequired,
    feed: PropTypes.array
  };
  componentDidMount() {
    const { getStudyFeed } = this.props;

    if (!this.props.studyFeed) {
      getStudyFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.studyFeed) {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { studyFeed } = this.props;
    return <StudyFeed {...this.state} studyFeed={studyFeed} />;
  }
}

export default Container;
