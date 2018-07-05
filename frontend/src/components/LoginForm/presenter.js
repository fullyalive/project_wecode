import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import FacebookLogin from "react-facebook-login";
import formStyles from "shared/formStyles.scss";

const LoginForm = (props, context) => (
    <div className={formStyles.formComponent}>
        <form className={formStyles.form} onSubmit={props.handleSubmit}>
            <input
                type="text"
                placeholder={context.t("아이디")}
                className={formStyles.textInput}
                value={props.usernameValue}
                onChange={props.handleInputChange}
                name="username"
            />
            <input
                type="password"
                placeholder={context.t("비밀번호")}
                className={formStyles.textInput}
                value={props.passwordValue}
                onChnage={props.handleInputChange}
                name="password"
            />
            <input
                type="submit"
                value={context.t("로그인")}
                className={formStyles.button}
            />
        </form>
        <span className={formStyles.divider}>{context.t("또는")}</span>
        <span className={formStyles.facebookLink}>
            <Ionicon icon="logo-facebook" fontSize="20px" color="#385185" />{" "}
            {context.t("페이스북으로 로그인")}
        </span>
        <span className={formStyles.forgotLink}>
            {context.t("비밀번호 찾기")}
        </span>
    </div>
);

LoginForm.propTypes = {
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}
LoginForm.contextTypes = {
    t: PropTypes.func.isRequired
};

export default LoginForm;
