import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LectureComment from "components/Lecture/LectureComment";

const LectureComments = props => (
  <div className={styles.comments}>
    <ul className={styles.list}>
      {/* <LectureComment creator={props.creator} comment={props.message} /> */}
      {props.comments.map(comment => (
        <LectureComment
          creator={comment.creator.username}
          comment={comment.message}
          commentId={comment.id}
          key={comment.id}
          lectureId={props.lectureId}
        />
      ))}
    </ul>
  </div>
);

LectureComments.propTypes = {
  creator: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
};

export default LectureComments;
