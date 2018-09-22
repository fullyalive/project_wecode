import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUserProfile: (name, bio, phone, website) => {
      dispatch(userActions.updateUserProfile(name, bio, phone, website));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Container);
