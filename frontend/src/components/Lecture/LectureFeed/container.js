import React, { Component } from "react";
import PropTypes from "prop-types";
import LectureFeed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getLectureFeed: PropTypes.func.isRequired,
    lectureFeed: PropTypes.array
  };
  componentDidMount() {
    const { getLectureFeed } = this.props;

    if (!this.props.lectureFeed) {
      getLectureFeed();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.lectureFeed) {
      this.setState({
        loading: false
      });
    }
  };
  render() {
    const { lectureFeed } = this.props;
    return <LectureFeed {...this.state} lectureFeed={lectureFeed} />;
  }
}

export default Container;
