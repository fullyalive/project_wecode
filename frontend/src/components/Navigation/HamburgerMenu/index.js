import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import PropTypes from "prop-types";

class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: "slide",
      side: "left"
    };
  }
  showSettings(event) {
    event.preventDefault();
  }
  render() {
    return (
      <Menu right width={"40%"} styles={MenuStyles}>
        <a id="home" className="menu-item" href="/">
          홈
        </a>
        <a id="about" className="menu-item" href="/lectures">
          강의 찾기
        </a>
        <a id="contact" className="menu-item" href="/studygroups">
          스터디 찾기
        </a>
        <a id="contact" className="menu-item" href="/community">
          커뮤니티
        </a>
        <a id="contact" className="menu-item" href="/mypage">
          마이페이지
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
    flexDirection: "column"
  },

  /* Individual item */
  bmItem: {
    display: "block",
    padding: "5px",
    marginBottom: "1.2em",
    color: "black"
  },

  /* Styling of overlay */
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

export default Burger;
