import React from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import styles from "./styles.scss";

const CommentBox = (props, context) => {
  return (
    <div className={styles.commentBox}>
      {props.isLoggedIn && (
        <div className={styles.commentContainer}>
          <form className={styles.commentContent}>
            <Textarea
              className={styles.input}
              placeholder={context.t("댓글을 입력하세요...")}
              value={props.comment}
              onChange={props.handleInputChange}
              onKeyPress={props.handleKeyPress}
            />
          </form>
          <span className={styles.submitButton} onClick={props.onSubmitClick}>
            글쓰기
          </span>
        </div>
      )}
      {!props.isLoggedIn && (
        <div className={styles.noInput}>
          {context.t("댓글을 달려면 로그인이 필요합니다.")}
        </div>
      )}
    </div>
  );
};

CommentBox.contextTypes = {
  t: PropTypes.func.isRequired
};

CommentBox.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired
};

export default CommentBox;
