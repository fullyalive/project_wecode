import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as studyActions } from "redux/modules/studygroups";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHeartClick: () => {
      if (ownProps.isLiked) {
        dispatch(studyActions.unlikeLecture(ownProps.studyId));
      } else {
        dispatch(studyActions.likeLecture(ownProps.studyId));
      }
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
