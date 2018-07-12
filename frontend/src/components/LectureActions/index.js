import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if (ownProps.isLiked) {
        dispatch(lectureActions.unlikePhoto(ownProps.lectureId));
      } else {
        dispatch(lectureActions.likePhoto(ownProps.lectureId));
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
