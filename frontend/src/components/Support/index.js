import React from "react";
import FAQtabs from "components/Support/FAQ/Study";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Support = (props, context) => {
  let supportBanner = require(`images/supportBanner.jpg`);
  return (
    <div className={styles.container}>
      <div
        className={styles.containerTitle}
        style={{ backgroundImage: `url(${supportBanner})` }}
      >
        <span className={styles.title}>위코드 고객센터</span>
        <span className={styles.subTitle}>도움이 필요하신가요?</span>
      </div>
      <div className={styles.boardCategories}>
        <Link to="/support/study" className={styles.boardCategory}>
          스터디FAQ
        </Link>
        <Link to="/support/question" className={styles.boardCategory}>
          질문FAQ
        </Link>
        {/* <Link to="/support/rule" className={styles.boardCategory}>
          환불정책
        </Link>
        <Link to="/support/privacy" className={styles.boardCategory}>
          개인정보 취급방침
        </Link>
        <Link to="/support/term" className={styles.boardCategory}>
          이용약관
        </Link> */}
      </div>
      <div className={styles.boardContainer}>
        <span className={styles.boardTitle}>스터디 FAQ</span>
        <div className={styles.board}>
          <FAQtabs />
        </div>
      </div>
      <div className={styles.boardContainer}>
        <span className={styles.boardTitle}>위코드 센터</span>
        <div className={styles.board}>
          <div className={styles.faqTitle}>1번 질문</div>
          <div className={styles.faqTitle}>2번 질문</div>
          <div className={styles.faqTitle}>3번 질문</div>
          <div className={styles.faqTitle}>4번 질문</div>
          <div className={styles.faqTitle}>5번 질문</div>
          <div className={styles.faqTitle}>6번 질문</div>
          <div className={styles.faqTitle}>7번 질문</div>
          <div className={styles.faqTitle}>8번 질문</div>
          <div className={styles.faqTitle}>9번 질문</div>
        </div>
      </div>
    </div>
  );
};

export default Support;
