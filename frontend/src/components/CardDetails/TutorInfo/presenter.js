import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import style from "./style.css";

const TutorInfo = (props, context) => {
  return (
    <div className={styles.tutorDetail}>
      <div className={styles.tutorIntro}>
        강사정보 <br />
        <span style={{ fontSize: 14, fontWeight: "400" }}>
          (Tutor Information)
        </span>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={props.profile_image || require("images/noPhoto.jpg")}
          alt={props.username}
          className={styles.profileImage}
        />
        <div className={styles.tutorContainer}>
          <div className={styles.tutorTitle}>
            <img
              src={props.profile_image ||  require("images/noPhoto.jpg")}
              alt={props.name}
              className={styles.tutorImage}
            />
            <div className={styles.tutorCard}>
              <span style={{ fontSize: 18, fontWeight: "700" }}>
                {props.name}
              </span>
              <div className={styles.tutorBio}>{props.bio}</div>
            </div>
          </div>
          <div className={styles.tutorDescription}>
            <div className={styles.firstColumn}>
              <p
                className={styles.paragraph}
                dangerouslySetInnerHTML={{ __html: props.career1 }}
              />
            </div>
            <div className={styles.secondColumn}>
              <p
                className={styles.paragraph}
                dangerouslySetInnerHTML={{ __html: props.career2 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

TutorInfo.contextTypes = {
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

export default TutorInfo;
