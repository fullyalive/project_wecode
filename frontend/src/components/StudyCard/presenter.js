import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import StudyActions from "components/StudyActions";

const StudyCard = (props, context) => {
  return (
    <div className={styles.studyCard}>
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
      {console.log(props)}
      <img src={props.studyImage} alt={props.short_description} className={styles.studyImage}/>
      <div className={styles.meta}>
        {/* 숫자도 안뜨는 오류 있음 */}
        {/* {console.log(props)} */}
        <StudyActions
          number={props.like_count}
          isLiked={props.is_liked}
          studyId={props.id}
        />
      </div>
    </div>
  );
};

StudyCard.propTypes = {
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  studyImage: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  short_description: PropTypes.string.isRequired,
  study_comments: PropTypes.arrayOf(
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

export default StudyCard;
