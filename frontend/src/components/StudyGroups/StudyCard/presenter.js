import React from "react";
import PropTypes from "prop-types";
import cardStyles from "shared/cardStyles.scss";
import StudyActions from "components/StudyGroups/StudyActions";

const StudyCard = (props, context) => {
  return (
    <div className={cardStyles.card}>
      <header className={cardStyles.header}>
        <div className={cardStyles.headerColumn}>
          <span className={cardStyles.creator}>{props.creator.username}</span>
          <span className={cardStyles.location}>{props.location}</span>
        </div>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={cardStyles.image}
        />
      </header>
      {/* caption은 후에 강의 짧게 설명하는 것으로 바꿀것 */}
      {console.log(props)}
      <img
        src={props.studyImage}
        alt={props.short_description}
        className={cardStyles.cardImage}
      />
      <div className={cardStyles.meta}>
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