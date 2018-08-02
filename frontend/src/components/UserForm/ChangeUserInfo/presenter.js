import React from "react";
import Loading from "components/Loading";
import ImagehandlerForm from "components/UserForm/ImagehandlerForm";
import PasswordChangeForm from "components/UserForm/PasswordChangeForm";
import styles from "./styles.scss";
import feedStyles from "shared/feedStyles.scss";

const ChangeUserInfo = props => {
  if (props.userInfo === undefined) {
    return <LoadingUserInfo />;
  } else if (props.userInfo) {
    return <RenderUserInfo {...props} />;
  }
};

const LoadingUserInfo = props => (
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      <div className={feedStyles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderUserInfo = (props, context) => (
  <div className={styles.container}>
    <div className={styles.imageHandler}>
      <ImagehandlerForm/>
    </div>
    <div className={styles.changePassword}>
      <PasswordChangeForm />
    </div>
  </div>
);

export default ChangeUserInfo;
