import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  // const {
  //   lectures: { lectureFeed },
  //   studygroups: { studyFeed },
  // } = state;
  const lectureFeed = state.lectures.lectureFeed;

  return {
    lectureFeed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLectureFeed: () => {
      dispatch(lectureActions.getLectureFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
