import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const StudyActions = (props, context) => (
  <div className={styles.actions}>
    <div className={styles.icons}>
      <span className={styles.icon} onClick={props.handleHeartClick}>
        {props.isLiked ? (
          <Ionicon icon="ios-heart" fontSize="24px" color="#3FA9F5" />
        ) : (
          <Ionicon icon="ios-heart-outline" fontSize="24px" color="black" />
        )}
      </span>
    </div>
    <span className={styles.likes}>
      {props.number}{" "}
      {props.number === 1 ? context.t("like") : context.t("likes")}
    </span>
  </div>
);

StudyActions.propTypes = {
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  studyId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired
};

StudyActions.contextTypes = {
  t: PropTypes.func.isRequired
};

export default StudyActions;