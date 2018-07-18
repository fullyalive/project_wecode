import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cardStyles from "shared/cardStyles.scss";
import StudyActions from "components/StudyGroups/StudyActions";

const StudyCard = (props, context) => {
  return <div className={cardStyles.card}>
      <header className={cardStyles.header}>
        <div className={cardStyles.headerColumn}>
          <span className={cardStyles.creator}>{props.creator.username}</span>
          <span className={cardStyles.location}>{props.location}</span>
        </div>
        <img src={props.creator.profile_image || require("images/noPhoto.jpg")} alt={props.creator.username} className={cardStyles.image} />
      </header>
      <Link to={`/studygroups/${props.id}`}>
      <img src={props.studyImage} alt={props.short_description} className={cardStyles.cardImage} />
      </Link>
      <div className={cardStyles.meta}>
        <span className={cardStyles.cardTitle}>{props.title}</span>
        <span className={cardStyles.cardSub}>{props.short_description}</span>
      </div>
      <div className={cardStyles.cardSchedule}>
        <div className={cardStyles.cardDate}>
          <span className={cardStyles.date}>
            {props.startDate} ~ {props.endDate}
          </span>
        </div>
        <div className={cardStyles.cardTime}>
          <span className={cardStyles.day}>
            {props.day1}
            {props.day2} -
          </span>
          <span className={cardStyles.time}>
            {props.startTime} ~ {props.endTime}
          </span>
        </div>
      </div>
      <div className={cardStyles.cardFooter}>
        <StudyActions number={props.like_count} isLiked={props.is_liked} studyId={props.id} />
        <span className={cardStyles.price}>{props.comma_price}원</span>
      </div>
    </div>;
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
