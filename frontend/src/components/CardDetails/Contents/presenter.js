import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Contents = (props, context) => {
  return (
    <div className={styles.contentDetail}>
      <div className={styles.contentIntro}>
        강의내용 <br />
        <span style={{ fontSize: 14, fontWeight: "400" }}>(Contents)</span>
      </div>
      <div className={styles.contentContainer}>
        <p dangerouslySetInnerHTML={{ __html: props.contents }} />
      </div>
      {console.log(props)}
    </div>
  );
};

Contents.contextTypes = {
  t: PropTypes.func.isRequired
};

// LectureDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   lectureImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   lecture_comments: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       message: PropTypes.string.isRequired,
//       creator: PropTypes.shape({
//         profile_image: PropTypes.string,
//         username: PropTypes.string.isRequired
//       }).isRequired
//     })
//   ).isRequired,
//   natural_time: PropTypes.string.isRequired,
//   is_liked: PropTypes.bool.isRequired
// };

export default Contents;
