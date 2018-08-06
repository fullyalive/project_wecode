import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";

const mapStateToProps = (state, ownProps) => {
  const { username } = state.user;
  return {
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  if (ownProps.lectureId !== undefined) {
    return {
      submitComment: message => {
        dispatch(
          lectureActions.updateCommentLecture(
            ownProps.lectureId,
            ownProps.commentId,
            message
          )
        );
      },
      deleteComment: () => {
        dispatch(
          lectureActions.deleteCommentLecture(
            ownProps.lectureId,
            ownProps.commentId
          )
        );
      }
    };
  } else if (ownProps.studyId !== undefined) {
    return {
      submitComment: message => {
        dispatch(
          studyActions.updateCommentStudy(
            ownProps.studyId,
            ownProps.commentId,
            message
          )
        );
      },
      deleteComment: () => {
        dispatch(
          studyActions.deleteCommentStudy(
            ownProps.studyId,
            ownProps.commentId
          )
        );
      }
    };
  }
  return null;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
