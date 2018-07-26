import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    lectures: { lectureList },
    studygroups: { studyList }
  } = state;
  return {
    lectureList,
    studyList
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { searchTerm }
    }
  } = ownProps;
  return {
    lectureSearchByTerm: () => {
      dispatch(lectureActions.searchByTerm(searchTerm));
    },
    studySearchByTerm: () => {
      dispatch(studyActions.searchByTerm(searchTerm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
