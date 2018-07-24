import React from "react";
import Loading from "components/Loading";

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
  <div>
    <li>{props.userInfo.id}</li>
    <li>{props.userInfo.username}</li>
    <li>{props.userInfo.lecture}</li>
    <li>{props.userInfo.email}</li>
  </div>
);

export default UserForm;
