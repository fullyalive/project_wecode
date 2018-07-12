import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/photos";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if (ownProps.isLiked) {
        dispatch(lectureActions.unlikePhoto(ownProps.photoId));
      } else {
        dispatch(lectureActions.likePhoto(ownProps.photoId));
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
