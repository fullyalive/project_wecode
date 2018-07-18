import React from "react";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import LectureActions from "components/Lecture/LectureActions";
import LectureComments from "components/Lecture/LectureComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";
import Loading from "components/Loading";

const LectureDetail = props => {
  if (props.lectureDetail === undefined) {
    return <LoadingDetail />;
  } else if (props.lectureDetail) {
    return <RenderDetail {...props} />;
  }
};

const LoadingDetail = props => (
  <div>
    <div>
      <div>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderDetail = (props, context) => {
  return (
    <div className={styles.lectureDetail}>
      <header className={styles.header}>
        <img
          src={
            props.lectureDetail.creator.profile_image ||
            require("images/noPhoto.jpg")
          }
          alt={props.lectureDetail.creator.username}
          className={styles.image}
        />
        <div className={styles.headerColumn}>
          <span className={styles.creator}>
            {props.lectureDetail.creator.username}
          </span>
          <span className={styles.location}>
            {props.lectureDetail.location}
          </span>
        </div>
      </header>
      <img
        src={props.lectureDetail.lectureImage}
        alt={props.lectureDetail.short_description}
      />
      <div className={styles.meta}>
        <LectureActions
          number={props.lectureDetail.like_count}
          isLiked={props.lectureDetail.is_liked}
          lectureId={props.lectureDetail.id}
        />
        <LectureComments
          creator={props.lectureDetail.creator.username}
          comments={props.lectureDetail.lecture_comments}
          lectureId={props.lectureDetail.id}
        />
        <TimeStamp time={props.lectureDetail.natural_time} />
        <CommentBox lectureId={props.lectureDetail.id} />
      </div>
    </div>
  );
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

export default LectureDetail;
