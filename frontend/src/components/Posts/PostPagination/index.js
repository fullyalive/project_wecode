import { connect } from "react-redux";
import { actionCreators as postActions } from "redux/modules/posts";
import Container from "./container";
import { push } from "react-router-redux";

const mapStateToProps = (state, ownProps) => {
  const { postFeed, count } = state.posts;
  return {
    postFeed,
    count
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
