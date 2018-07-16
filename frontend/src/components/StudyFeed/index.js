import { connect } from "react-redux";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const studyFeed = state.studygroups.studyFeed;

  return {
    studyFeed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudyFeed: () => {
      dispatch(studyActions.getStudyFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
