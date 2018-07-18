import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";
// import { actionCreators as studyActions } from "redux/modules/studygroups";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitComment: message => {
      dispatch(lectureActions.commentLecture(ownProps.lectureId, message));
      // dispatch(studyActions.commentStudy(ownProps.studyId, message));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
