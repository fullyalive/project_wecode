import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  if (ownProps.lectureId !== undefined) {
    return {
      submitComment: message => {
        dispatch(lectureActions.commentLecture(ownProps.lectureId, message));
      }
    };
  } else if (ownProps.studyId !== undefined) {
    return {
      submitComment: message => {
        dispatch(studyActions.commentStudy(ownProps.studyId, message));
      }
    };
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
