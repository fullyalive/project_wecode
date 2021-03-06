import { connect } from "react-redux";
import { push } from "react-router-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { userInfo, isLoggedIn } = state.user;
  return { userInfo, isLoggedIn };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goToSearch: searchTerm => {
      dispatch(push(`/search/${searchTerm}`));
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
