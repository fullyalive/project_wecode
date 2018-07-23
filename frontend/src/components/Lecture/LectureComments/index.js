import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { username } = state.user;
  return {
    username
  };
};

export default connect(
  null,
  mapStateToProps
)(Container);
