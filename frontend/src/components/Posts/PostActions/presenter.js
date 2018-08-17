import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const PostActions = (props, context) => (
  <div className={styles.actions}>
    <span className={styles.actionMessage}>질문이 도움이 되었나요?</span>
    <div className={styles.icons}>
      <span className={styles.button} onClick={props.handleHeartClick}>
        {console.log(props.isLiked)}
        {props.isLiked ? (
          <Ionicon
            icon="md-battery-full"
            fontSize="24px"
            color="#3FA9F5"
            className={styles.icon}
          />
        ) : (
          <Ionicon
            icon="md-battery-dead"
            fontSize="24px"
            color="#3FA9F5"
            className={styles.icon}
          />
        )}
      </span>
      <span className={styles.likes}>
        {props.number}
        {/* {props.number === 1 ? context.t("like") : context.t("likes")} */}
      </span>
    </div>
  </div>
);

PostActions.propTypes = {
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  postId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired
};

PostActions.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PostActions;
