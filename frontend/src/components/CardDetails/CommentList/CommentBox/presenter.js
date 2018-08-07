import React from "react";
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";
import styles from "./styles.scss";

const CommentBox = (props, context) => (
  <div className={styles.commentBox}>
    <form className={styles.commentContent}>
      <Textarea
        className={styles.input}
        placeholder={context.t("댓글을 입력하세요...")}
        value={props.comment}
        onChange={props.handleInputChange}
        onKeyPress={props.handleKeyPress}
      />
    </form>
    <span className={styles.submitButton} onClick={props.onSubmintClick}>
      글쓰기
    </span>
  </div>
);

CommentBox.contextTypes = {
  t: PropTypes.func.isRequired
};

CommentBox.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired
};

export default CommentBox;
