import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import { actionCreators as postActions } from "redux/modules/posts";

const mapDispatchToProps = (dispatch, ownProps) => {
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
  } else if (ownProps.postId !== undefined) {
    return {
      submitComment: message => {
        dispatch(postActions.commentPost(ownProps.postId, message));
      }
    };
  }
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
