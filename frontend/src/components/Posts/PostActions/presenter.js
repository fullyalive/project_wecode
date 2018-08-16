import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import actionStyles from "shared/actionStyles.scss";

const PostActions = (props, context) => (
  <div className={actionStyles.actions}>
    <div className={actionStyles.icons}>
      <span className={actionStyles.icon} onClick={props.handleHeartClick}>
        {props.isLiked ? (
          <Ionicon icon="ios-heart" fontSize="24px" color="#3FA9F5" />
        ) : (
          <Ionicon icon="ios-heart-outline" fontSize="24px" color="black" />
        )}
      </span>
    </div>
    <span className={actionStyles.likes}>
      {props.number}{" "}
      {/* {props.number === 1 ? context.t("like") : context.t("likes")} */}
    </span>
  </div>
);

PostActions.propTypes = {
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  lectureId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired
};

PostActions.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PostActions;
