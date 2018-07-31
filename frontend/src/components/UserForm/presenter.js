import React from "react";
import Loading from "components/Loading";
import styles from "./styles.scss";
import feedStyles from "shared/feedStyles.scss";
// import PasswordChangeForm from "components/PasswordChangeForm";
// import PropTypes from "prop-types";

const PopUp = props => {
  return (
    <div className="popup">
      <div className="popup_inner">
        <h1 className={styles.logoutMessage}>
          정말{" "}
          <span onClick={props.closePopup} className={styles.logout}>
            로그아웃
          </span>{" "}
          하시겠습니까?
        </h1>
      </div>
    </div>
  );
};

const UserForm = props => {
  if (props.userInfo === undefined) {
    return <LoadingForm />;
  } else if (props.userInfo) {
    return <RenderForm {...props} />;
  }
};

const LoadingForm = props => (
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      <div className={feedStyles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderForm = (props, context) => (
  <div className={styles.container}>
    <div className={styles.profileContainer}>
      <div className={styles.profileTitle}>사용자 정보</div>
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
      <div className={styles.statusButtons}>
        <div className={styles.buttonContainer}>
          <span className={styles.button}>정보변경</span>
          <span className={styles.button} onClick={props.onLogoutClick}>
            로그아웃
          </span>
        </div>
        <div className={styles.message}>
          {props.showPopup ? <PopUp closePopup={props.togglePopup} /> : null}
        </div>
      </div>
    </div>
    <div className={styles.attendContainer}>
      <div className={styles.attendList}>
        <span className={styles.attendCategory}>수강중인 강의</span>
        <span className={styles.attendValue}>props.userInfo.lecture</span>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.attendList}>
        <span className={styles.attendCategory}>참가한 스터디</span>
        <span className={styles.attendValue}>props.userInfo.study</span>
      </div>
    </div>
  </div>
  // {/* <PasswordChangeForm username={props.userInfo.username} /> */}
);

export default UserForm;
