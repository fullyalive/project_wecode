import React from "react";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

export const LoginForm = (props, context) => (
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input
        type="text"
        placeholder={context.t("아이디")}
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder={context.t("비밀번호")}
        className={styles.textInput}
      />
      <input
        type="submit"
        value={context.t("로그인")}
        className={styles.button}
      />
    </form>
    <span className={styles.divider}>{context.t("또는")}</span>
    <span className={styles.facebookLink}>
      <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />
      {context.t("페이스북으로 로그인")}
    </span>
    <span className={styles.forgotLink}>{context.t("비밀번호 찾기")}</span>
  </div>
);

export const SignupForm = (props, context) => (
  <div className={styles.formComponent}>
    <h3 className={styles.signupHeader}>
      나를 더 성장시켜줄<br />오프라인 코딩 모임, 교육에 참가해보세요!
    </h3>
    <button className={styles.button}>
      {" "}
      <Ionicon icon="logo-facebook" fontSize="20px" color="white" />
      {context.t("페이스북으로 로그인")}
    </button>
    <span className={styles.divider}>{context.t("")}</span>
    <form className={styles.form}>
      <input
        type="email"
        placeholder={context.t("이메일")}
        className={styles.textInput}
      />
      <input
        type="text"
        placeholder={context.t("이름")}
        className={styles.textInput}
      />
      <input
        type="username"
        placeholder={context.t("아이디")}
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder={context.t("비밀번호")}
        className={styles.textInput}
      />
      <input
        type="submit"
        value={context.t("회원가입")}
        className={styles.button}
      />
    </form>
    <p className={styles.terms}>
      회원가입을 통해 <span>개인정보정책과 이용약관</span>에 동의합니다.
    </p>
  </div>
);
