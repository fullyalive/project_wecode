import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Comment from "components/CardDetails/CommentList/Comment";

const Comments = props => (
  <div className={styles.comments}>
    <ul className={styles.list}>
      {props.comments.map(comment => (
        <Comment
          creator={comment.creator.username}
          comment={comment.message}
          commentId={comment.id}
          created_time_mdhm={comment.created_time_mdhm}
          key={comment.id}
          lectureId={props.lectureId}
          studyId={props.studyId}
          groupOrder={comment.groupOrder}
          parent={comment.parent}
          postId={props.postId}
          isLoggedIn={props.isLoggedIn}
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
