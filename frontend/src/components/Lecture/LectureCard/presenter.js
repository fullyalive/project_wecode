import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.scss";
import LectureActions from "components/Lecture/LectureActions";


const LectureCard = (props, context) => {
  return (
    <div className={styles.lectureCard}>
      {console.log(props)}
      <header className={styles.header}>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={styles.image}
        />
        <div className={styles.headerColumn}>
          <span className={styles.creator}>{props.creator.username}</span>
          <span className={styles.location}>{props.location}</span>
        </div>
      </header>
      {/* caption은 후에 강의 짧게 설명하는 것으로 바꿀것 */}
      <Link to={`/lectures/${props.id}`} params={
        {}
      }>
        <img
          src={props.lectureImage}
          alt={props.short_description}
          className={styles.lectureImage}
        />
      </Link>
      <div className={styles.meta}>
        <LectureActions
          number={props.like_count}
          isLiked={props.is_liked}
          lectureId={props.id}
        />
      </div>
    </div>
  );
};

LectureCard.propTypes = {
  id: PropTypes.number.isRequired,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  lectureImage: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  short_description: PropTypes.string.isRequired,
  lecture_comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  is_liked: PropTypes.bool.isRequired
};

export default LectureCard;
