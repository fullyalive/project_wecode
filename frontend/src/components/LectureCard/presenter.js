import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const LectureCard = (props, context) => {
  console.log(props);
  return <div className={styles.lectureCard}>Hello!</div>;
};

LectureCard.propTypes = {
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired
  //   created_at: PropTypes.string.isRequired
};

export default LectureCard;
