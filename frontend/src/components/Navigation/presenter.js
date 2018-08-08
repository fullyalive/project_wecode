import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Burger from "components/Navigation/HamburgerMenu";
import DropdownButton from "components/Navigation/DropdownButton";
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
        <Link to="/">
          <div className={styles.logo}>wecode</div>
        </Link>
        <form onSubmit={props.onSubmit}>
          <input
            type="text"
            placeholder={context.t("검색")}
            className={styles.searchInput}
            value={props.value}
            onChange={props.onInputChange}
          />
        </form>
      </div>
      <div className={styles.column}>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link to="/" style={{ color: "black" }}>
              {context.t("홈")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/lectures" style={{ color: "black" }}>
              {context.t("강의찾기")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/studygroups" style={{ color: "black" }}>
              {context.t("스터디찾기")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/community" style={{ color: "black" }}>
              {context.t("질문하기")}
            </Link>
          </li>
          <li className={styles.navItem}>
            {props.isLoggedIn ? (
              <DropdownButton
                {...props}
                // profileImage={props.userInfo.profile_image}
              />
            ) : (
              <LoginButton />
            )}
          </li>
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
    <Link to="/login" style={{ color: "black" }}>
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
