import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { userInfo, isLoggedIn },
    studygroups: { studyDetail }
  } = state;
  return {
    userInfo,
    isLoggedIn,
    studyDetail
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudyDetail: () => {
      dispatch(studyActions.getStudyDetail(ownProps.match.params.studyId));
    },
    getUserInfo: () => {
      dispatch(userActions.getUserInfo());
    },
    setResetStudyDetail: () => {
      dispatch(studyActions.setResetStudyDetail());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
