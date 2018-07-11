import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LectureActions from "components/LectureActions";
import LectureComments from "components/LectureComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";

const LectureDetail = (props, context) => {
  return (
    <div className={styles.lectureDetail}>
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
    
      <img src={props.lectureImage} alt={props.short_description} />
      <div className={styles.meta}>
        {/* 숫자도 안뜨는 오류 있음 */}
        {/* {console.log(props)} */}

        <LectureActions
          number={props.like_count}
          isLiked={props.is_liked}
          photoId={props.id}
        />
        <LectureComments
          creator={props.creator.username}
          comments={props.lecture_comments}
          photoId={props.id}
        />
        <TimeStamp time={props.natural_time} />
        <CommentBox />
      </div>
    </div>
  );
};

LectureDetail.propTypes = {
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
  natural_time: PropTypes.string.isRequired,
  is_liked: PropTypes.bool.isRequired
};

export default LectureDetail;
