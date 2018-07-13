import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import StudyActions from "components/StudyActions";
import StudyComments from "components/StudyComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";

const StudyDetail = (props, context) => {
  return (
    <div className={styles.studyDetail}>
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
      <img src={props.studyImage} alt={props.short_description} />
      <div className={styles.meta}>
        <StudyActions
          number={props.like_count}
          isLiked={props.is_liked}
          studyId={props.id}
        />
        <StudyComments
          creator={props.creator.username}
          comments={props.study_commnets}
          studyId={props.id}
        />
        <TimeStamp time={props.natural_time} />
        <CommentBox studyId={props.id}/>
      </div>
    </div>
  );
};

StudyDetail.propTypes = {
    id: PropTypes.number.isRequired,
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
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            creator: PropTypes.shape({
                profile_image: PropTypes.string,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    natural_time: PropTypes.string.isRequired,
    is_liked: PropTypes.bool.isRequired
};

export default StudyDetail;
