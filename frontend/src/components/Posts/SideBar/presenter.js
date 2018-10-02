import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const SideBar = (props, context) => {
  return (
    <div className={styles.sideContainer}>
      <ul className={styles.sideMenu}>
        <li className={styles.categoryTitle}>라이브러리</li>

        <li className={styles.sideItem}>
          <Link to="/community/qna/1" className={styles.more}>
            질문하기
          </Link>
        </li>
        <li className={styles.sideItem}>
          <Link to="/community/free/1" className={styles.more}>
            포스트
          </Link>
        </li>
      </ul>
      {/* <ul className={styles.sideMenu}>
        <li className={styles.categoryTitle}>문의하기</li>
        <li className={styles.sideItem}>
          <Link to="/community/ask/1" className={styles.more}>
            FAQ
          </Link>
        </li>
        <li className={styles.sideItem}>1:1 문의</li>
      </ul> */}
    </div>
  );
};

SideBar.contextTypes = {
  t: PropTypes.func.isRequired
};

// LectureDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   lectureImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   lecture_comments: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       message: PropTypes.string.isRequired,
//       creator: PropTypes.shape({
//         profile_image: PropTypes.string,
//         username: PropTypes.string.isRequired
//       }).isRequired
//     })
//   ).isRequired,
//   natural_time: PropTypes.string.isRequired,
//   is_liked: PropTypes.bool.isRequired
// };

export default SideBar;
