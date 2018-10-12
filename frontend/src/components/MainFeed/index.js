import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
// import { actionCreators as studyActions } from "redux/modules/studygroups";
import { actionCreators as bannerActions } from "redux/modules/banners";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  // const {
  //   lectures: { lectureFeed },
  //   studygroups: { studyFeed },
  // } = state;
  const lectureFeed = state.lectures.lectureFeed;
  // const bannerFeed = state.banners.bannerFeed;
  // const studyFeed = state.studygroups.studyFeed;

  return {
    lectureFeed,
    // bannerFeed,
    // studyFeed,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLectureFeed: () => {
      dispatch(lectureActions.getLectureFeed());
    },
    // getBannerFeed: () => {
    //   dispatch(bannerActions.getBannerFeed());
    // },
    // getStudyFeed: () => {
    //   // dispatch(studyActions.getStudyFeed());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
