import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const Comment = props => {
  const isParent = props.parent === 0 ? true : false;
  const isWriter = props.creator === props.username? true: false;
  const writerStyle = { color:"red"}
  const readerStyle = { color:"black"}
  return(<li className={styles.commentContainer}>
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
                {props.isLoggedIn && isParent && <Ionicon icon="md-return-right" fontSize="20px" color="#b4b4b4" onClick={props.onRecommentClick} className={styles.icon} />}
                {props.isEdit === false && props.creator === props.username && <Ionicon icon="md-create" fontSize="20px" color="#b4b4b4" onClick={props.onClick} className={styles.icon} />}
                {props.creator === props.username ? <Ionicon icon="md-close" fontSize="24px" color="#b4b4b4" onClick={isParent ? props.onDeleteClick : props.onRecommentDeleteClick} className={styles.icon} /> : ""}
              </span>
            </div>
          </div>
          <div className={styles.commentMessage}>
            {props.isEdit ? <div>
                <textarea  className={styles.editMessage} value={props.currentComment} onChange={props.handleInputChange} onKeyPress={props.handleKeyPress}>
                  {props.currentComment}
                </textarea>
                <Ionicon icon="md-checkmark" fontSize="20px" color="#b4b4b4" onClick={props.onSubmitClick} className={styles.icon} />
        </div> : <span style={isWriter ? writerStyle : readerStyle} className={styles.message}>
                {props.comment}
              </span>}
          </div>
          <div className={styles.commentMessage}>
            {props.isReEdit && <div>
                <textarea className={styles.editMessage} value={props.currentRecomment} onChange={props.handleRecommentInputChange} onKeyPress={props.handleRecommentKeyPress}>
                  {props.currentComment}
                </textarea>
                <Ionicon icon="md-checkmark" fontSize="20px" color="#b4b4b4" onClick={props.onRecommentSubmitClick} className={styles.icon} />
              </div>}
          </div>
        </div>
      </li>);
};

export default Comment;
