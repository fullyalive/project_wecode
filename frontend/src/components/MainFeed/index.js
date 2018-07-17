import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import { actionCreators as bannerActions } from "redux/modules/banners";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  // const {
  //   lectures: { lectureFeed },
  //   studygroups: { studyFeed },
  // } = state;
  const bannerFeed = state.banners.bannerFeed;
  const lectureFeed = state.lectures.lectureFeed;
  const studyFeed = state.studygroups.studyFeed;

  return {
    bannerFeed,
    lectureFeed,
    studyFeed,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBannerFeed: () => {
      dispatch(bannerActions.getBannerFeed());
    },
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
