import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Footer = (props, context) => (
  <footer className={styles.footer}>
    <div className={styles.columnOne}>
      <div className={styles.row}>
        <nav className={styles.nav}>
          <div className={styles.upper}>
            <ul className={styles.list}>
              <span className={styles.listTitle}>SERVICE</span>
              <li className={styles.listItem}>{context.t("서비스소개")}</li>
              <li className={styles.listItem}>
                <Link to="/lectures" className={styles.link}>
                  {context.t("스터디찾기")}
                </Link>
              </li>
              <li className={styles.listItem}>
                <a
                  href="http://bit.ly/2OrZUTO"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={styles.link}
                >
                  {context.t("질문하기")}
                </a>
              </li>
            </ul>
            <ul className={styles.list}>
              <span className={styles.listTitle}>COMPANY</span>
              <li className={styles.listItem}>{context.t("블로그")}</li>
              <li className={styles.listItem}>
                <a
                  href="https://www.facebook.com/wecode.kr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={styles.link}
                >
                  {context.t("페이스북")}
                </a>
              </li>
            </ul>
            <ul className={styles.list}>
              <span className={styles.listTitle}>POLICIES</span>
              <li className={styles.listItem}>
                <Link to="/support/term" className={styles.link}>
                  {context.t("이용약관")}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/support/privacy" className={styles.link}>
                  {context.t("개인정보 취급방침")}
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.mobileUpper}>
            <ul className={styles.list}>
              <span className={styles.listTitle}>SERVICE</span>
              <li className={styles.listItem}>{context.t("서비스 소개")}</li>
              <li className={styles.listItem}>
                <Link to="/lectures" className={styles.link}>
                  {context.t("스터디찾기")}
                </Link>
              </li>
              <li className={styles.listItem}>
                <a
                  href="http://bit.ly/2OrZUTO"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={styles.link}
                >
                  {context.t("질문하기")}
                </a>
              </li>
              <span className={styles.listTitle}>COMPANY</span>
              <li className={styles.listItem}>{context.t("블로그")}</li>
              <li className={styles.listItem}>
                <a
                  href="https://www.facebook.com/wecode.kr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={styles.link}
                >
                  {context.t("페이스북")}
                </a>
              </li>
            </ul>
            <ul className={styles.list}>
              <span className={styles.listTitle}>POLICIES</span>
              <li className={styles.listItem}>
                <Link to="/support/term" className={styles.link}>
                  {context.t("이용약관")}
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/support/privacy" className={styles.link}>
                  {context.t("개인정보 취급방침")}
                </Link>
              </li>
              <span className={styles.listTitle}>SUPPORT</span>
              <li className={styles.listItem}>
                <img
                  src={require("images/kakaoplus.png")}
                  alt="wecode 플러스친구"
                  className={styles.kakao}
                />
                <a
                  href="http://pf.kakao.com/_qExdRj/chat"
                  rel="noopener noreferrer"
                  target="_blank"
                  className={styles.link}
                >
                  {context.t("카카오 1:1 문의")}
                </a>
              </li>
              <li className={styles.listItem}>
                <Link to="/support" className={styles.link}>
                  {context.t("고객센터")}
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.row}>
            <p className={styles.about}>
              wecode | 대표: 이재형 | 사업자등록번호: 214-73-68258 | 주소:
              서울시 서대문구 연희로8길 24-7 <br />
              전화번호: 0l0-88l7-8674 | E-mail: ask@wecode.kr <br />
            </p>
            <span className={styles.copyright}>
              Copyright ©2018 wecode. All rights reserved
            </span>
          </div>
        </nav>
      </div>
    </div>
    <div className={styles.columnTwo}>
      <ul className={styles.list}>
        <span className={styles.listTitle}>SUPPORT</span>
        <li className={styles.listItem}>
          <img
            src={require("images/kakaoplus.png")}
            alt="wecode 플러스친구"
            className={styles.kakao}
          />
          <a
            href="http://pf.kakao.com/_qExdRj/chat"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.link}
          >
            {context.t("카카오 1:1 문의")}
          </a>
        </li>
        <li className={styles.listItem}>
          <Link to="/support" className={styles.link}>
            {context.t("고객센터")}
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

Footer.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Footer;
