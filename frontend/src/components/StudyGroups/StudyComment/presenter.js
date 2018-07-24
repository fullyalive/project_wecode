import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import commentStyles from "shared/commentStyles.scss";

const StudyComment = props => (
  <li className={commentStyles.commentContainer}>
    <span className={commentStyles.commentContent}>
      <span className={commentStyles.username}>{props.creator}</span>
      {props.isEdit ? (
        <textarea
          className={commentStyles.message}
          value={props.currentComment}
          onChange={props.handleInputChange}
          onKeyPress={props.handleKeyPress}
        >
          {props.currentComment}
        </textarea>
      ) : (
          <span className={commentStyles.message}>{props.comment}</span>
        )}
    </span>
    <span className={commentStyles.commentFunction}>
      {props.isEdit === false && props.creator === props.username ? (
        <Ionicon
          icon="ios-color-wand"
          fontSize="20px"
          color="#b4b4b4"
          onClick={props.onClick}
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
        />
      ) : (
          ""
        )}
    </span>
  </li>
);

export default StudyComment;
