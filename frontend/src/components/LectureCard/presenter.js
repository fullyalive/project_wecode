import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LectureActions from "components/LectureActions";

const LectureCard = (props, context) => {
  return (
    <div className={styles.lectureCard}>
      <header>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
        />
        <div>
          <span>{props.creator.username}</span>
          <span>{props.location}</span>
        </div>
      </header>
      {/* caption은 후에 강의 짧게 설명하는 것으로 바꿀것 */}
      {/* 지금 사진 안뜬다 이것도 수정 */}
      <img src={props.file} alt={props.caption} />
      <div>
        {/* 숫자도 안뜨는 오류 있음 */}
        <LectureActions number={props.like_count} />
      </div>
    </div>
  );
};

LectureCard.propTypes = {
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  // caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
  //   created_at: PropTypes.string.isRequired
};

export default LectureCard;
