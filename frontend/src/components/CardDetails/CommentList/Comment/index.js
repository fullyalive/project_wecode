import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import { actionCreators as postActions } from "redux/modules/posts";

const mapStateToProps = (state, ownProps) => {
  const { username } = state.user;
  return {
    username
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
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
      },
      submitRecomment: message => {
        dispatch(
          lectureActions.recommentLecture(
            ownProps.lectureId,
            ownProps.commentId,
            message
          )
        );
      },
      submitUpdateRecomment: message => {
        dispatch(
          lectureActions.updateRecommentLecture(
            ownProps.lectureId,
            ownProps.parent,
            ownProps.commentId,
            message
          )
        );
      },
      deleteRecomment: () => {
        dispatch(
          lectureActions.deleteRecommentLecture(
            ownProps.lectureId,
            ownProps.parent,
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
          studyActions.deleteCommentStudy(ownProps.studyId, ownProps.commentId)
        );
      },
      submitRecomment: message => {
        dispatch(
          studyActions.recommentStudy(
            ownProps.studyId,
            ownProps.commentId,
            message
          )
        );
      },
      submitUpdateRecomment: message => {
        dispatch(
          studyActions.updateRecommentStudy(
            ownProps.studyId,
            ownProps.parent,
            ownProps.commentId,
            message
          )
        );
      },
      deleteRecomment: () => {
        dispatch(
          studyActions.deleteRecommentStudy(
            ownProps.studyId,
            ownProps.parent,
            ownProps.commentId
          )
        );
      }
    };
  } else if (ownProps.postId !== undefined) {
    return {
      submitComment: message => {
        dispatch(
          postActions.updateCommentPost(
            ownProps.postId,
            ownProps.commentId,
            message
          )
        );
      },
      deleteComment: () => {
        dispatch(
          postActions.deleteCommentPost(ownProps.postId, ownProps.commentId)
        );
      },
      submitRecomment: message => {
        dispatch(
          postActions.recommentPost(
            ownProps.postId,
            ownProps.commentId,
            message
          )
        );
      },
      submitUpdateRecomment: message => {
        dispatch(
          postActions.updateRecommentPost(
            ownProps.postId,
            ownProps.parent,
            ownProps.commentId,
            message
          )
        );
      },
      deleteRecomment: () => {
        dispatch(
          postActions.deleteRecommentPost(
            ownProps.postId,
            ownProps.parent,
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
