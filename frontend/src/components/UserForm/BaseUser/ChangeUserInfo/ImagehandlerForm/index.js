import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  const { userInfo } = state.user;
  return {
    userInfo,
    token: user.token
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserInfo: () => {
      dispatch(userActions.getUserInfo());
    },
    updateUserPhoto: photo => {
      dispatch(userActions.updateUserPhoto(photo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
