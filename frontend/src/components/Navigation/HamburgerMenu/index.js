import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import styles from "./styles.scss";

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: "slide",
      menuOpen: false
    };
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  showSettings(event) {
    event.preventDefault();
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  // toggleMenu() {
  //   this.setState({ menuOpen: !this.state.menuOpen });
  // }

  render() {
    return (
      <Menu
        right
        width={"100%"}
        styles={MenuStyles}
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        <Link to="/" className={styles.link}>
          <div
            className={styles.menuContainer}
            onClick={() => this.closeMenu()}
          >
            <Ionicon
              icon="md-home"
              fontSize="18px"
              className={styles.menuImage}
            />
            <div className={styles.menu}>
              <span className={styles.menuTitle}>홈</span>
              <span className={styles.menuDescription}>돌아보기</span>
            </div>
          </div>
        </Link>
        <Link to="/lectures" className={styles.link}>
          <div
            className={styles.menuContainer}
            onClick={() => this.closeMenu()}
          >
            <Ionicon
              icon="md-book"
              fontSize="18px"
              className={styles.menuImage}
            />
            <div className={styles.menu}>
              <span className={styles.menuTitle}>스터디찾기</span>
              <span className={styles.menuDescription}>
                오프라인 코딩스터디
              </span>
            </div>
          </div>
        </Link>
        <a
          href="http://bit.ly/2OrZUTO"
          rel="noopener noreferrer"
          target="_blank"
          className={styles.link}
        >
          <div
            className={styles.menuContainer}
            onClick={() => this.closeMenu()}
          >
            <Ionicon
              icon="md-help"
              fontSize="18px"
              className={styles.menuImage}
            />
            <div className={styles.menu}>
              <span className={styles.menuTitle}>질문하기</span>
              <span className={styles.menuDescription}>
                프로그래밍 하다가 머리 아플땐?
              </span>
            </div>
          </div>
        </a>
        <Link to="/support" className={styles.link}>
          <div
            className={styles.menuContainer}
            onClick={() => this.closeMenu()}
          >
            <Ionicon
              icon="md-chatbubbles"
              fontSize="18px"
              className={styles.menuImage}
            />
            <div className={styles.menu}>
              <span className={styles.menuTitle}>고객센터</span>
              <span className={styles.menuDescription}>FAQ, 1:1 문의하기</span>
            </div>
          </div>
        </Link>
        {/* <Link
          to={this.props.isLoggedIn ? "/mypage" : "/login"}
          className={styles.link}
        >
          <div
            className={styles.menuContainer}
            onClick={() => this.closeMenu()}
          >
            <Ionicon
              icon="md-person"
              fontSize="18px"
              className={styles.menuImage}
            />
            <div className={styles.menu}>
              <span className={styles.menuTitle}>
                {this.props.isLoggedIn ? "마이페이지" : "로그인"}
              </span>
              <span className={styles.menuDescription}>
                {this.props.isLoggedIn
                  ? "정보수정, 로그아웃"
                  : "더 많은 정보를 볼 수 있어요!"}
              </span>
            </div>
          </div>
        </Link> */}
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
    right: "15px",
    top: "28.5px",
    width: "24px",
    height: "20px"
  },

  /* Color/shape of burger icon bars */
  bmBurgerBars: {
    background: "#3FA9F5"
  },

  /* Position and sizing of clickable cross button */
  bmCrossButton: {
    width: "24px",
    height: "20px",
    right: "15px",
    top: "28.5px"
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
