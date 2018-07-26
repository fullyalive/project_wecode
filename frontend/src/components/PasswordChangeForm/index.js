import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePassWord: (username, currentPassWord, newPassWord) => {
      dispatch(
        userActions.changePassWord(username, currentPassWord, newPassWord)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
