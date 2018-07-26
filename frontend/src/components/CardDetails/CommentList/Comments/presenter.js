import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Comment from "components/CardDetails/CommentList/Comment";

const Comments = props => (
  <div className={styles.comments}>
    <div className={styles.qnaIntro}>
      문의사항 <br />
      <span style={{ fontSize: 14, fontWeight: "400" }}>
        (Q&amp;A)
        </span>
    </div>
    <ul className={styles.list}>
      {props.comments.map(comment => (
        <Comment
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

Comments.propTypes = {
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

export default Comments;