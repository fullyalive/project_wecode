import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LectureActions from "components/LectureActions";
import LectureComments from "components/LectureComments";
import TimeStamp from "components/TimeStamp";

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
      {console.log(props)}
      <img src={props.lectureImage} alt={props.caption} />
      <div>
        {/* 숫자도 안뜨는 오류 있음 */}
        {console.log(props)}

        <LectureActions number={props.like_count} />
        <LectureComments
          caption={props.short_description}
          creator={props.creator.username}
          comments={props.lecture_comments}
        />
        <TimeStamp time={props.natural_time} />
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
  lectureImage: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  lecture_comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  natural_time: PropTypes.string.isRequired
};

export default LectureCard;
