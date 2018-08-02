import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUserPassword: (username, currentPassword, newPassword) => {
      dispatch(
        userActions.updateUserPassword(username, currentPassword, newPassword)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);