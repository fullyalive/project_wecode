import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as lectureActions } from "redux/modules/lectures";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitComment: message => {
      dispatch(lectureActions.commentLecture(ownProps.lectureId, message));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
