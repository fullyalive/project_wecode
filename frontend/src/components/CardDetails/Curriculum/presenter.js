import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const Curriculum = (props, context) => {
  return <div className={styles.curriculumDetail}>
      <div className={styles.curriculumIntro}>
        커리큘럼 <br />
        <span style={{ fontSize: 14, fontWeight: "400" }}>(Curriculum)</span>
      </div>
      <div className={styles.curriculumCards}>
        <div className={styles.curriculumCard}>
          <div className={styles.curriculumDescription}>
            <div className={styles.firstColumn}>
              <p dangerouslySetInnerHTML={{ __html: props.curriculum1 }} />
            </div>
            <div className={styles.secondColumn}>
            <p dangerouslySetInnerHTML={{ __html: props.curriculum2 }} />
            </div>
          </div>
        </div>
      </div>
    </div>;
};

Curriculum.contextTypes = {
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

export default Curriculum;
