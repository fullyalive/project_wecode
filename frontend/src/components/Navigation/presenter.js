import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Burger from "components/Navigation/HamburgerMenu";
import styles from "./styles.scss";

const Navigation = (props, context) => (
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
              {context.t("커뮤니티")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to={props.isLoggedIn ? "/mypage" : "/login"}
              style={{ color: "black" }}
            >
              {props.isLoggedIn ? context.t("마이페이지") : context.t("로그인")}
            </Link>
          </li>
        </ul>
        <ul className={styles.mobileNav}>
          <Burger {...props}/>
        </ul>
      </div>
    </div>
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default Navigation;
