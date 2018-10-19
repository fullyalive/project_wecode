import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Burger from "components/Navigation/HamburgerMenu";
// import DropdownButton from "components/Navigation/DropdownButton";
import styles from "./styles.scss";

const Navigation = props => {
  if (props.isLoggedIn && props.userInfo === undefined) {
    return <div />;
  } else return <RenderNavigation {...props} />;
};

const RenderNavigation = (props, context) => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/" className={styles.logo}>
          <img
            src={require("images/logo.png")}
            alt="wecode"
            className={styles.logoImage}
          />
          <span className={styles.logoName}>wecode</span>
        </Link>
        {/* <form onSubmit={props.onSubmit} className={styles.form}>
          <input
            type="text"
            placeholder={context.t("검색")}
            className={styles.searchInput}
            onChange={props.onInputChange}
            value={props.value}
          />
        </form> */}
      </div>
      <div className={styles.column}>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              {context.t("홈")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/lectures" className={styles.navLink}>
              {context.t("스터디찾기")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <a
              href="http://bit.ly/2OrZUTO"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.navLink}
            >              {context.t("질문하기")}
            </a>
          </li>
          <li className={styles.navItem}>
            <Link to="/support" className={styles.navLink}>
              {context.t("고객센터")}
            </Link>
          </li>
          {/* <li className={styles.navItem}>
            {props.isLoggedIn ? <DropdownButton {...props} /> : <LoginButton />}
          </li> */}
        </ul>
        <ul className={styles.mobileNav}>
          <Burger {...props} />
        </ul>
      </div>
    </div>
  </div>
);

const LoginButton = props => {
  return (
    <Link to="/login" className={styles.navLink}>
      <span className={styles.loginButton}>로그인</span>
    </Link>
  );
};

RenderNavigation.contextTypes = {
  t: PropTypes.func.isRequired
};

RenderNavigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Navigation;
