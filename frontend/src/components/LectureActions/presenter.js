import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const LectureActions = (props, context) => (
  <div className={styles.actions}>
    <div className={styles.icons}>
      <span className={styles.icon} onClick={props.handleHeartClick}>
        {props.isLiked ? (
          <Ionicon icon="ios-heart" fontSize="28px" color="#3FA9F5" />
        ) : (
          <Ionicon icon="ios-heart-outline" fontSize="28px" color="#3FA9F5" />
        )}
      </span>
    </div>
    <span className={styles.likes}>
      {console.log(props)}
      {props.number}{" "}
      {props.number === 1 ? context.t("like") : context.t("likes")}
    </span>
  </div>
);

LectureActions.propTypes = {
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  photoId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired
};

LectureActions.contextTypes = {
  t: PropTypes.func.isRequired
};

export default LectureActions;
