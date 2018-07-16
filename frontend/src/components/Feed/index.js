import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  
  // const {
  //   lectures: { lectureFeed },
  //   studygroups: { studyFeed },
  // } = state;
  const lectureFeed = state.lectures.feed;
  const studyFeed = state.studygroups.studyFeed;
  
  return {
    lectureFeed,
    studyFeed,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLectureFeed: () => {
      dispatch(lectureActions.getLectureFeed());
    },
    getStudyFeed: () => {
      dispatch(studyActions.getStudyFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
