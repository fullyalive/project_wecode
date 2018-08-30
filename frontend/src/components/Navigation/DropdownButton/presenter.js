import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./styles.scss";

const DropdownButton = props => {
  return (
    <Dropdown isOpen={props.isOpen} toggle={props.toggle}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={props.isOpen}
      >
        마이페이지
      </DropdownToggle>
      <DropdownMenu right className={styles.menus}>
        <div className={styles.menu}>
          <div className={styles.menuItem} onClick={props.toggle}>
            <div className={styles.profileContainer}>
              <img
                src={
                  props.userInfo.profile_image || require("images/noPhoto.jpg")
                }
                alt={props.userInfo.username}
                className={styles.profileImage}
              />
              <div className={styles.userInfo}>
                <span className={styles.username}>
                  {props.userInfo.username}
                </span>
                <Link to="/mypage" className={styles.link}>
                  <span className={styles.moveButton}>내 정보 보기</span>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.menuItem} onClick={props.toggle}>
            <Link to="/mypage" className={styles.link}>
              수강중인 강의
            </Link>
          </div>

          <div className={styles.menuItem} onClick={props.onLogoutClick}>
            로그아웃
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownButton;
