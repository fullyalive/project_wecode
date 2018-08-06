import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as postActions } from "redux/modules/posts";
import Presenter from "./presenter";
import { push } from "react-router-redux";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username }
  } = state;
  return {
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { type } = ownProps.history.location.state;
  return {
    createPost: (title, post_type, description) => {
      dispatch(postActions.createPost(title, post_type, description));
    },
    goToBack: () => {
      dispatch(push(`/community/${type}/1`));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presenter);
