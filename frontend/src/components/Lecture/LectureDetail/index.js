import { connect } from "react-redux";
import { actionCreators as userActions } from "redux/modules/user";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const lectureDetail = state.lectures.lectureDetail;
  const { userInfo } = state.user;
  return {
    lectureDetail,
    userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLectureDetail: () => {
      dispatch(
        lectureActions.getLectureDetail(ownProps.match.params.lectureId)
      );
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
