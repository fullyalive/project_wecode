import { connect } from "react-redux";
import { actionCreators as postActions } from "redux/modules/posts";
import Presenter from "./presenter";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { username }
  } = state;
  return {
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPost: (title, post_type, description) => {
      dispatch(postActions.createPost(title, post_type, description));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presenter);
