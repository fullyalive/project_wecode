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
    if (!this.props.postFeed) {
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
    const { type, page } = this.props.match.params;

    if (nextProps.postFeed) {
      this.setState({
        loading: false
      });
    }
    if (nextProps.match.params.page !== this.state.page) {
      getPostFeed(type, this.state.page);
      this.setState({
        page: nextProps.match.params.page
      });
    }
  };
  handlePageChange = page => {
    console.log(page);
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
    const { postFeed, count } = this.props;
    const { type, page } = this.state;
    const currentPage = page * 1;
    return (
      <PostFeed
        {...this.state}
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
