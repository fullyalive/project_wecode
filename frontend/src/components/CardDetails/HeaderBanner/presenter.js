import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const HeaderBanner = (props, context) => {
  return (
    <div className={styles.bannerContainer}>
      <span
        className={styles.bannerSub}
        dangerouslySetInnerHTML={{ __html: props.short_description }}
      />
      <span className={styles.bannerTitle}>{props.title}</span>
      <div className={styles.imageContainer}>
        <div
          className={styles.bannerImage}
          style={{
            backgroundImage: `url(${props.bannerImage})`
          }}
        />
      </div>
    </div>
  );
};

HeaderBanner.contextTypes = {
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

export default HeaderBanner;
