import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/Navigation/Auth/LoginForm";
import SignupForm from "components/Navigation/Auth/SignupForm";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.row}>
      <div className={`${styles.whiteBox} ${styles.formBox}`}>
        <img
          src={require("images/logo.png")}
          alt="wecode"
          className={styles.logo}
        />
        {props.action === "login" && <LoginForm />}
        {props.action === "signup" && <SignupForm />}
      </div>
      <div className={styles.whiteBox}>
        {props.action === "login" && (
          <p className={styles.text}>
            {context.t("아직 회원이 아니신가요?")}{" "}
            <span onClick={props.changeAction} className={styles.changeLink}>
              {context.t("회원가입")}
            </span>
          </p>
        )}
        {props.action === "signup" && (
          <p className={styles.text}>
            {context.t("회원이신가요?")}{" "}
            <span onClick={props.changeAction} className={styles.changeLink}>
              {context.t("로그인")}
            </span>
          </p>
        )}
      </div>
    </div>
  </main>
);

Auth.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Auth;
