import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const Comment = props => {
  const isParent = props.parent === 0 ? true : false;
  let style = null;
  switch (props.creator) {
    case props.username:
      style = { color: "#6dc066" }; // green
      break;
    case props.contentCreator:
      style = { color: "#ff4444" }; // red
      break;
    default:
      style = { color: "black" };
      break;
  }
  return (
    <li className={styles.commentContainer}>
      {console.log(props.contentCreator)}
      {!isParent && <span style={{ marginLeft: 30 }} />}
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <div className={styles.firstColumn}>
            <span className={styles.username}>{props.creator}</span>
            <span className={styles.createdTime}>
              {props.created_time_mdhm}
            </span>
          </div>
          <div className={styles.secondColumn}>
            <span className={styles.commentFunction}>
              {props.isLoggedIn &&
                isParent && (
                  <Ionicon
                    icon="md-return-right"
                    fontSize="20px"
                    color="#b4b4b4"
                    onClick={props.onRecommentClick}
                    className={styles.icon}
                  />
                )}
              {props.isEdit === false &&
                props.creator === props.username && (
                  <Ionicon
                    icon="md-create"
                    fontSize="20px"
                    color="#b4b4b4"
                    onClick={props.onClick}
                    className={styles.icon}
                  />
                )}
              {props.creator === props.username ? (
                <Ionicon
                  icon="md-close"
                  fontSize="24px"
                  color="#b4b4b4"
                  onClick={
                    isParent
                      ? props.onDeleteClick
                      : props.onRecommentDeleteClick
                  }
                  className={styles.icon}
                />
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
        <div className={styles.commentMessage}>
          {props.isEdit ? (
            <div className={styles.editMessage}>
              <textarea
                value={props.currentComment}
                onChange={props.handleInputChange}
                onKeyPress={props.handleKeyPress}
                className={styles.input}
              >
                {props.currentComment}
              </textarea>
              <span className={styles.editButton} onClick={props.onSubmitClick}>
                수정
              </span>
            </div>
          ) : (
            <span style={style} className={styles.message}>
              {props.comment}
            </span>
          )}
        </div>
        <div className={styles.commentMessage}>
          {props.isReEdit && (
            <div className={styles.editMessage}>
              <textarea
                value={props.currentRecomment}
                onChange={props.handleRecommentInputChange}
                onKeyPress={props.handleRecommentKeyPress}
                className={styles.input}
              >
                {props.currentComment}
              </textarea>
              <span
                className={styles.editButton}
                onClick={props.onRecommentSubmitClick}
              >
                수정
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Comment;
