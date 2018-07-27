import React from "react";
import Loading from "components/Loading";
// import PasswordChangeForm from "components/PasswordChangeForm";
import styles from "./styles.scss";
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
  <div className={styles.container}>
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <img
          src={props.userInfo.profile_image || require("images/noPhoto.jpg")}
          alt={props.username}
          className={styles.profileImage}
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileList}>
            <span className={styles.profileCategory}>아이디</span>
            <span className={styles.profileValue}>
              {props.userInfo.username}
            </span>
          </div>
          <div className={styles.profileList}>
            <span className={styles.profileCategory}>전화번호</span>
            <span className={styles.profileValue}>
              props.userInfo.phoneNumber
            </span>
          </div>
          {console.log(props)}
        </div>
      </div>
      <div className={styles.buttons}>
        <span className={styles.button}>정보변경</span>
        <span className={styles.button}>로그아웃</span>
      </div>
    </div>
    <div className={styles.statusContainer}>
      <div className={styles.statusList}>
        <span className={styles.statusCategory}>수강중인 강의</span>
        <span className={styles.statusValue}>props.userInfo.lecture</span>
      </div>
      <div className={styles.statusList}>
        <span className={styles.statusCategory}>참가한 스터디</span>
        <span className={styles.statusValue}>props.userInfo.study</span>
      </div>
    </div>
  </div>
  // {/* <PasswordChangeForm username={props.userInfo.username} /> */}
);

export default UserForm;
