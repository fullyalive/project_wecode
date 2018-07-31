import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    token: user.token
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUserInfo: photo => {
      dispatch(userActions.updateUserInfo(photo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
