import { connect } from "react-redux";
import { push } from "react-router-redux";
import Container from "./container";
import { actionCreators as postActions } from "redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const { isLoggedIn } = state.user;
  const { postFeed, count } = state.posts;
  return {
    postFeed,
    count,
    isLoggedIn
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPostFeed: (type, page) => {
      dispatch(postActions.getPostFeed(type, page));
    },
    goToPage: (type, page) => {
      dispatch(push(`/community/${type}/${page}`));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
