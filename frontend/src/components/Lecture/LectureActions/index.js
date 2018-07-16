import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if (ownProps.isLiked) {
        dispatch(lectureActions.unlikeLecture(ownProps.lectureId));
      } else {
        dispatch(lectureActions.likeLecture(ownProps.lectureId));
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
