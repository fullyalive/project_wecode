import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import PropTypes from "prop-types";
import styles from "./styles.scss";

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: "slide"
    };
  }
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <Menu right width={"70%"} styles={MenuStyles}>
        <a id="home" className="menu-item" href="/">
          <img
            src={require("images/logo.png")}
            alt="wecode"
            className={styles.menuImage}
          />
          <div className={styles.menu}>
            <span className={styles.menuTitle}>홈</span>
            <span className={styles.menuDescription}>돌아보기</span>
          </div>
        </a>
        <a id="about" className="menu-item" href="/lectures">
          <img
            src={require("images/lectures.jpg")}
            alt="wecode"
            className={styles.menuImage}
          />
          <div className={styles.menu}>
            <span className={styles.menuTitle}>강의 찾기</span>
            <span className={styles.menuDescription}>오프라인 코딩강의</span>
          </div>
        </a>
        <a id="contact" className="menu-item" href="/studygroups">
          <img
            src={require("images/studygroups.jpg")}
            alt="wecode"
            className={styles.menuImage}
          />
          <div className={styles.menu}>
            <span className={styles.menuTitle}>스터디 찾기</span>
            <span className={styles.menuDescription}>오프라인 코딩스터디</span>
          </div>
        </a>
        <a id="contact" className="menu-item" href="/community">
          <img
            src={require("images/community.jpg")}
            alt="wecode"
            className={styles.menuImage}
          />
          <div className={styles.menu}>
            <span className={styles.menuTitle}>커뮤니티</span>
            <span className={styles.menuDescription}>준비중입니다 :)</span>
          </div>
        </a>
        <a id="contact" className="menu-item" href="/mypage">
          <img
            src={require("images/mypage.jpg")}
            alt="wecode"
            className={styles.menuImage}
          />
          <div className={styles.menu}>
            <span className={styles.menuTitle}>마이페이지</span>
            <span className={styles.menuDescription}>정보수정, 로그아웃</span>
          </div>
        </a>
        {/* <a onClick={this.showSettings} className="menu-item--small" href="" /> */}
      </Menu>
    );
  }
}

Burger.contextTypes = {
  t: PropTypes.func.isRequired
};

const MenuStyles = {
  /* Position and sizing of burger button */
  bmBurgerButton: {
    position: "absolute",
    width: "24px",
    height: "20px",
    right: "36px",
    top: "36px"
  },

  /* Color/shape of burger icon bars */
  bmBurgerBars: {
    background: "#3FA9F5"
  },

  /* Position and sizing of clickable cross button */
  bmCrossButton: {
    width: "24px",
    height: "20px",
    right: "36px",
    top: "36px"
  },

  /* Color/shape of close button cross */
  bmCross: {
    background: "#3FA9F5",
    height: "21px"
  },

  /* General sidebar styles */
  bmMenuWrap: {
    position: "fixed",
    top: "0px"
  },
  bmMenu: {
    background: "white",
    boxShadow: "0 8px 38px rgba(133, 133, 133, 0.5)",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  /* Morph shape necessary with bubble or elastic */
  bmMorphShape: {
    fill: "#373a47"
  },

  /* Wrapper for item list */
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    paddingTop: "100px"
  },

  /* Individual item */
  bmItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5px",
    marginBottom: "2em",
    color: "black"
  },

  /* Styling of overlay */
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

export default Burger;
