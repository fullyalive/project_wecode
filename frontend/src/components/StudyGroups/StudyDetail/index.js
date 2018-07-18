import { connect } from "react-redux";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const studyDetail = state.studygroups.studyDetail;
  return {
    studyDetail
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudyDetail: () => {
      dispatch(studyActions.getStudyDetail(ownProps.match.params.studyId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
