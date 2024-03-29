import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import cardStyles from "shared/cardStyles.scss";
import StudyActions from "components/Cards/StudyGroups/StudyActions";

const StudyCard = (props, context) => {
  const currentDate = new Date();
  const date = props.deadline.split("-");
  let prev_3day = new Date(date[0], date[1] - 1, date[2]);
  let after_1day = new Date(date[0], date[1] - 1, date[2]);
  prev_3day.setDate(prev_3day.getDate() - 3);
  after_1day.setDate(after_1day.getDate() + 1);
  let isChecked = "Default";
  if (currentDate > prev_3day) {
    isChecked = "Emergency";
  }
  if (currentDate >= after_1day) {
    isChecked = "Done";
  }
  return (
    <div className={cardStyles.card}>
      <header className={cardStyles.header}>
        <div className={cardStyles.headerColumn}>
          <span className={cardStyles.creator}>{props.creator.username}</span>
          <span className={cardStyles.location}>
            {props.location}
            {isChecked === "Default" && (
              <span className={cardStyles.alert}>
                |<span className={cardStyles.doingButton}>모집중</span>
              </span>
            )}
            {isChecked === "Emergency" && (
              <span className={cardStyles.alert}>
                |<span className={cardStyles.emergencyButton}>마감 임박</span>
              </span>
            )}
            {isChecked === "Done" && (
              <span className={cardStyles.alert}>
                |<span className={cardStyles.endButton}>마감 완료</span>
              </span>
            )}
          </span>
        </div>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={cardStyles.profileImage}
        />
      </header>
      <Link to={`/studygroups/${props.id}`}>
        <img
          src={props.studyImage}
          alt={props.short_description}
          className={cardStyles.cardImage}
        />
      </Link>
      <div className={cardStyles.meta}>
        <span className={cardStyles.cardTitle}>{props.title}</span>
        <span
          className={cardStyles.cardSub}
          dangerouslySetInnerHTML={{ __html: props.short_description }}
        />
      </div>
      <div className={cardStyles.cardSchedule}>
        <div className={cardStyles.cardDate}>
          <span className={cardStyles.date}>
            {props.start_date} ~ {props.end_date}
          </span>
        </div>
        <div className={cardStyles.cardTime}>
          <span className={cardStyles.day}>{props.day1} </span>
          {props.day2 === null ? (
            ""
          ) : (
            <span className={cardStyles.day}>, {props.day2}</span>
          )}
          <span className={cardStyles.time}>
            {props.start_time} ~ {props.end_time}
          </span>
        </div>
      </div>
      <div className={cardStyles.cardFooter}>
        <StudyActions
          number={props.like_count}
          isLiked={props.is_liked}
          studyId={props.id}
          isFeed={true}
        />
        <span className={cardStyles.price}>{props.comma_price}원</span>
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
  is_liked: PropTypes.bool.isRequired,
  comma_price: PropTypes.string.isRequired,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
  start_time: PropTypes.string.isRequired,
  end_time: PropTypes.string.isRequired
};

export default StudyCard;
