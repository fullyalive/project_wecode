import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as postActions } from "redux/modules/posts";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { userInfo, isLoggedIn },
    posts: { postDetail }
  } = state;
  return {
    userInfo,
    isLoggedIn,
    postDetail
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPostDetail: () => {
      dispatch(postActions.getPostDetail(ownProps.match.params.postId));
    },
    getUserInfo: () => {
      dispatch(userActions.getUserInfo());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
