import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if (ownProps.isLiked) {
        dispatch(
          lectureActions.unlikeLecture(ownProps.lectureId, ownProps.isFeed)
        );
      } else {
        dispatch(
          lectureActions.likeLecture(ownProps.lectureId, ownProps.isFeed)
        );
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
