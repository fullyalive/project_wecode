import { connect } from "react-redux";
import { actionCreators as lectureActions } from "redux/modules/lectures";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    lectures: { feed }
  } = state;
  return {
    feed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getFeed: () => {
      dispatch(lectureActions.getFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
