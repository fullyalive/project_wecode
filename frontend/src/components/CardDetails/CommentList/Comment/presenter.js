import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const Comment = props => (
  <li className={styles.commentContainer}>
    <div className={styles.commentContent}>
      <div className={styles.commentHeader}>
        <div className={styles.firstColumn}>
          <span className={styles.username}>{props.creator}</span>
          <span className={styles.createdTime}>{props.created_time_mdhm}</span>
        </div>
        <div className={styles.secondColumn}>
          <span className={styles.commentFunction}>
            {props.isEdit === false && props.creator === props.username ? (
              <Ionicon
                icon="ios-color-wand"
                fontSize="20px"
                color="#b4b4b4"
                onClick={props.onClick}
                className={styles.icon}
              />
            ) : (
              ""
            )}
            {props.creator === props.username ? (
              <Ionicon
                icon="ios-close"
                fontSize="24px"
                color="#b4b4b4"
                onClick={props.onDeleteClick}
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
          <textarea
            className={styles.editMessage}
            value={props.currentComment}
            onChange={props.handleInputChange}
            onKeyPress={props.handleKeyPress}
          >
            {props.currentComment}
          </textarea>
        ) : (
          <span className={styles.message}>{props.comment}</span>
        )}
      </div>
    </div>
  </li>
);

export default Comment;
