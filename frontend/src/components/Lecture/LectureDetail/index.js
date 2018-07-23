import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const lectureDetail = state.lectures.lectureDetail;
  return {
    lectureDetail
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getLectureDetail: () => {
      dispatch(
        lectureActions.getLectureDetail(ownProps.match.params.lectureId)
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
