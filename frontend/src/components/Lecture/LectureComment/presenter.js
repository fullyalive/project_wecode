import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const LectureComment = props => (
  <li className={styles.comment}>
    <span className={styles.username}>{props.creator}</span>
    {console.log(props)}
    {props.isEdit ? (
      <textarea
        className={styles.message}
        value={props.currentComment}
        onChange={props.handleInputChange}
        onKeyPress={props.handleKeyPress}
      >
        {props.currentComment}
      </textarea>
    ) : (
      <span className={styles.message}>{props.comment}</span>
    )}
    {props.isEdit === false && props.creator === props.username ? (
      <button onClick={props.onClick}>수정</button>
    ) : (
      ""
    )}

    {props.creator === props.username ? (
      <button onClick={props.onDeleteClick}>삭제</button>
    ) : (
      ""
    )}
  </li>
);

export default LectureComment;
