import { connect } from "react-redux";
import { actionCreators as postActions } from "redux/modules/posts";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { postFeed, count, next, previous } = state.posts;
  return {
    postFeed,
    count,
    next,
    previous
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPostFeed: (type) => {
      dispatch(postActions.getPostFeed('popular', 1));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
