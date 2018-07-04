import React from "react";
import styles from "./styles.scss";

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.row}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.listItem}>서비스 소개</li>
          <li className={styles.listItem}>이용약관</li>
          <li className={styles.listItem}>개인정보 취급방침</li>
          <li className={styles.listItem}>강의찾기</li>
          <li className={styles.listItem}>스터디찾기</li>
          <li className={styles.listItem}>커뮤니티</li>
        </ul>
      </nav>
    </div>
    <div className={styles.row}>
      <p className={styles.about}>wecode | 대표 | 사업자등록번호 | 주소 <br/>
      전화번호 | E-mail <br/>
      </p>
      <span className={styles.copyright}>Copyright ©2018 wecode. All rights reserved</span>
    </div>
  </footer>
);

export default Footer;
