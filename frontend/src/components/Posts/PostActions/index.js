import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as postActions } from "redux/modules/posts";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if (ownProps.isLiked) {
        dispatch(
          postActions.unlikePost(ownProps.postId, ownProps.isFeed)
        );
      } else {
        dispatch(
          postActions.likePost(ownProps.postId, ownProps.isFeed)
        );
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
