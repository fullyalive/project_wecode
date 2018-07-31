import { connect } from "react-redux";
import Container from "./container";
import { push } from "react-router-redux";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { userInfo } = state.user;
  return {
    userInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      dispatch(userActions.logout());
    },
    getUserInfo: () => {
      dispatch(userActions.getUserInfo());
    },
    goToHome: () => {
      dispatch(push("/"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
