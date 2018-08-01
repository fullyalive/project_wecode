import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const studyDetail = state.studygroups.studyDetail;
  const { userInfo } = state.user;
  return {
    studyDetail,
    userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudyDetail: () => {
      dispatch(studyActions.getStudyDetail(ownProps.match.params.studyId));
    },
    getUserInfo: () => {
      dispatch(userActions.getUserInfo());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
