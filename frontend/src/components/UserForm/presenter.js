import React from "react";
import Loading from "components/Loading";
import { UserConsumer } from "redux/userContext";

// import PropTypes from "prop-types";

const UserForm = props => {
  if (props.userInfo === undefined) {
    return <LoadingForm />;
  } else if (props.userInfo) {
    return <RenderForm {...props} />;
  }
};

const LoadingForm = props => (
  <div>
    <Loading />
  </div>
);

const RenderForm = (props, context) => (
  <UserConsumer>
    {sample => <div>현재 설정된 값: {sample.state.value}</div>}
  </UserConsumer>
);

export default UserForm;
