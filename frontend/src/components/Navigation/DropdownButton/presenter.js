import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { Link } from "react-router-dom";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
import styles from "./styles.scss";

const DropdownButton = props => {
  return (
    <Dropdown isOpen={props.isOpen} toggle={props.toggle} cssModule={Bootstrap}>
      <DropdownToggle
        tag="span"
        onClick={props.toggle}
        data-toggle="dropdown"
        aria-expanded={props.isOpen}
        cssModule={Bootstrap}
      >
        마이페이지
      </DropdownToggle>
      <DropdownMenu right cssModule={Bootstrap} className={styles.menus}>
        <div className={styles.menu}>
          <Link to="/mypage">
            <div className={styles.menuItem} onClick={props.toggle}>
              <div className={styles.profileContainer}>
                <img
                  src={props.userInfo.profile_image}
                  alt={props.userInfo.username}
                  className={styles.profileImage}
                />
                <div className={styles.userInfo}>
                  <span className={styles.username}>
                    {props.userInfo.username}
                  </span>
                  <span className={styles.moveButton}>내 정보 보기</span>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/mypage" style={{ paddingLeft: 10 }}>
            <div className={styles.menuItem} onClick={props.toggle}>
              수강중인 강의
            </div>
          </Link>
          <div className={styles.menuItem} onClick={props.onLogoutClick}>
            로그아웃
          </div>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownButton;
