import React from "react";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

const PasswordChangeForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>
      {context.t("나를 성장시켜줄 오프라인 코딩 모임과 교육을 만나보세요")}
    </h3>

    <span className={formStyles.divider}>{context.t("또는")}</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="password"
        placeholder={context.t("현재 비밀번호")}
        className={formStyles.textInput}
        value={props.currentPassWord}
        onChange={props.handleInputChange}
        name="currentPassWord"
      />
      <input
        type="password"
        placeholder={context.t("새로운 비밀번호")}
        className={formStyles.textInput}
        value={props.newPassWord}
        onChange={props.handleInputChange}
        name="newPassWord"
      />
      <input
        type="password"
        placeholder={context.t("다시 한번 더 입력 해 주세요")}
        className={formStyles.textInput}
        value={props.newPassWord2}
        onChange={props.handleInputChange}
        name="newPassWord2"
      />
      <input
        type="submit"
        value={context.t("비밀번호 변경하기")}
        className={formStyles.button}
        onChange={props.handleSubmit}
      />
    </form>
  </div>
);

PasswordChangeForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
};

PasswordChangeForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PasswordChangeForm;
