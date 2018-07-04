import React from "react";
import styles from "./styles.scss";
import { LoginForm, SignupForm } from "components/AuthForms";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.row}>
    </div>
    <div className={styles.row}>
      <div className={`${styles.whiteBox} ${styles.formBox}`}>
        <img src={require("images/logo.png")} alt="wecode" />
        {props.action === "login" && <LoginForm />}
        {props.action === "signup" && <SignupForm />}
      </div>
      <div className={styles.whiteBox}>
        {props.action === "login" && (
          <p className={styles.text}>
            아직 회원이 아니신가요?{" "}
            <span onClick={props.changeAction} className={styles.changeLink}>
              회원가입
            </span>
          </p>
        )}
        {props.action === "signup" && (
          <p className={styles.text}>
            회원이신가요?{" "}
            <span onClick={props.changeAction} className={styles.changeLink}>
              로그인
            </span>
          </p>
        )}
      </div>
      <div className={styles.appBox}>
        <span>wecode는 개발자의 자유를 꿈꿉니다</span>
        {/* <div className={styles.appstores}>
          <img src={require("images/ios.png")} alt="" />
          <img src={require("images/ios.png")} alt="" />
        </div> */}
      </div>
    </div>
  </main>
);

export default Auth;
