import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const PasswordChangeForm = (props, context) => (
  <div className={styles.formComponent}>
    <span className={styles.formTitle}>비밀번호 변경</span>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <input
        type="password"
        placeholder={context.t("현재 비밀번호")}
        className={styles.textInput}
        value={props.currentPassWord}
        onChange={props.handleInputChange}
        name="currentPassWord"
      />
      <input
        type="password"
        placeholder={context.t("새로운 비밀번호")}
        className={styles.textInput}
        value={props.newPassWord}
        onChange={props.handleInputChange}
        name="newPassWord"
      />
      <input
        type="password"
        placeholder={context.t("다시 한번 더 입력 해 주세요")}
        className={styles.textInput}
        value={props.newPassWord2}
        onChange={props.handleInputChange}
        name="newPassWord2"
      />
      <input
        type="submit"
        value={context.t("비밀번호 변경하기")}
        className={styles.button}
        onChange={props.handleSubmit}
      />
    </form>
  </div>
);

// PasswordChangeForm.propTypes = {
//   emailValue: PropTypes.string.isRequired,
//   nameValue: PropTypes.string.isRequired,
//   usernameValue: PropTypes.string.isRequired,
//   passwordValue: PropTypes.string.isRequired,
//   handleInputChange: PropTypes.func.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   handleFacebookLogin: PropTypes.func.isRequired
// };

PasswordChangeForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PasswordChangeForm;
