import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const SideBar = (props, context) => {
  let isAttended = false;
  props.attendId.map(id => {
    if (props.contentId === id) {
      isAttended = true;
    }
    return null;
  });
  return (
    <div className={styles.sideDetail}>
      <header className={styles.header}>
        <div className={styles.headerColumn}>
          <span className={styles.title}>{props.title}</span>
          <span className={styles.creator}>
            by <span className={styles.highlight}>{props.username}</span>
          </span>
        </div>
      </header>
      <div className={styles.headerMeta}>
        <div className={styles.metaList}>
          <span className={styles.headerCategory}>기간</span>
          <span className={styles.headerInfo}>
            {props.start_date} ~ {props.end_date}
          </span>
        </div>
        <div className={styles.metaList}>
          <span className={styles.headerCategory}>시간</span>
          <span className={styles.headerInfo}>
            {props.day1}
            {props.day2} {props.start_time} ~ {props.end_time}
          </span>
        </div>
        <div className={styles.metaList}>
          <span className={styles.headerCategory}>장소</span>
          <span className={styles.headerInfo}>{props.location}</span>
        </div>
        <div className={styles.metaList}>
          <span className={styles.headerCategory}>가격</span>
          <span className={styles.headerInfo}>{props.comma_price}원</span>
        </div>
        <form>
          <input
            type="submit"
            value={isAttended ? "신청완료" : "신청하기"}
            className={isAttended ? styles.greybutton : styles.button}
          />
        </form>
      </div>
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
