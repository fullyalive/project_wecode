import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import StudyComment from "components/StudyGroups/StudyComment";

const StudyComments = props => (
  <div className={styles.comments}>
    <div className={styles.qnaIntro}>
      문의사항 <br />
      <span style={{ fontSize: 14, fontWeight: "400" }}>(Q&amp;A)</span>
    </div>
    <ul className={styles.list}>
      {/* <StudyComment creator={props.creator} comment={props.creator} /> */}
      {props.comments.map(comment => (
        <StudyComment
          creator={comment.creator.username}
          comment={comment.message}
          commentId={comment.id}
          key={comment.id}
          studyId={props.studyId}
        />
      ))}
    </ul>
  </div>
);

StudyComments.propTypes = {
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

export default StudyComments;
