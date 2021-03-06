import React, { Component } from "react";
import PropTypes from "prop-types";
import PostFeed from "./presenter";

class Container extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  state = {
    loading: true,
    page: 1,
    type: "qna"
  };
  static propTyeps = {
    getPostFeed: PropTypes.func.isRequired,
    postFeed: PropTypes.array
  };
  componentDidMount() {
    const { getPostFeed } = this.props;
    const { type, page } = this.props.match.params;
    if (this.state.loading) {
      getPostFeed(type, page);
      this.setState(
        {
          type,
          page
        },
        () => {
          window.scrollTo(0, 0);
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    const { getPostFeed } = this.props;
    if (nextProps.postFeed) {
      this.setState({
        loading: false
      });
    }
    if (nextProps.match.params.page !== this.state.page ||
      nextProps.match.params.type !== this.state.type) {
      getPostFeed(nextProps.match.params.type, nextProps.match.params.page);
      this.setState({
        page: nextProps.match.params.page,
        type: nextProps.match.params.type
      });
    }
  };
  handlePageChange = page => {
    this.setState(
      {
        page
      },
      () => {
        this.props.goToPage(this.state.type, this.state.page);
        window.scrollTo(0, 0);
      }
    );
  };

  render() {
    const { postFeed, count, isLoggedIn } = this.props;
    const { type, page } = this.state;
    const currentPage = page * 1;
    return (
      <PostFeed
        {...this.state}
        isLoggedIn={isLoggedIn}
        postFeed={postFeed}
        count={count}
        handlePageChange={this.handlePageChange}
        type={type}
        page={page}
        currentPage={currentPage}
      />
    );
  }
}

export default Container;
