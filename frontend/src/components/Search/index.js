import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import { actionCreators as studyActions } from "redux/modules/studygroups";
import { actionCreators as postActions } from "redux/modules/posts";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    lectures: { lectureList },
    studygroups: { studyList },
    posts: { postList }
  } = state;
  return {
    lectureList,
    studyList,
    postList
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
    },
    postSearchByTerm: () => {
      dispatch(postActions.searchByTerm(searchTerm, 1));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
