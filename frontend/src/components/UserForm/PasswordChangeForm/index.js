import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUserPassword: (username, currentPassWord, newPassWord) => {
      dispatch(
        userActions.updateUserPassword(username, currentPassWord, newPassWord)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
