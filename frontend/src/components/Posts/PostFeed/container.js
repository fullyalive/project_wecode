import React, { Component } from "react";
import PropTypes from "prop-types";
import PostFeed from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
  }
  state = {
    loading: true,
    pageOfItems: []
  };
  static propTypes = {
    getPostFeed: PropTypes.func.isRequired,
    postFeed: PropTypes.array
  };
  componentDidMount() {
    const { getPostFeed } = this.props;
    window.scrollTo(0, 0);
    if (this.state.loading) {
      getPostFeed('qna');
      getPostFeed("free");
      getPostFeed("ask");
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.postFeed) {
      this.setState({
        loading: false
      });
    }
  };
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }
  render() {
    const { postFeed, count, next, previous } = this.props;
    return (
      <PostFeed
        {...this.state}
        postFeed={postFeed}
        count={count}
        next={next}
        previous={previous}
        onChangePage={this.onChangePage}
      />
    );
  }
}

export default Container;
