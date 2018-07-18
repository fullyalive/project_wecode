import React from "react";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import feedStyles from "shared/feedStyles.scss";
import StudyActions from "components/StudyGroups/StudyActions";
import StudyComments from "components/StudyGroups/StudyComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";
import Loading from "components/Loading";

const StudyDetail = props => {
  if (props.studyDetail === undefined) {
    return <LoadingDetail />;
  } else if (props.studyDetail) {
    return <RenderDetail {...props} />;
  }
};

const LoadingDetail = props => (
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      <div className={feedStyles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderDetail = (props, context) => {
  return (
    <div className={styles.studyDetail}>
      <header className={styles.header}>
        <img
          src={
            props.studyDetail.creator.profile_image ||
            require("images/noPhoto.jpg")
          }
          alt={props.studyDetail.creator.username}
          className={styles.image}
        />
        <div className={styles.headerColumn}>
          <span className={styles.creator}>
            {props.studyDetail.creator.username}
          </span>
          <span className={styles.location}>
            {props.studyDetail.location}
          </span>
        </div>
      </header>
      <img
        src={props.studyDetail.studyImage}
        alt={props.studyDetail.short_description}
      />
      <div className={styles.meta}>
        <StudyActions
          number={props.studyDetail.like_count}
          isLiked={props.studyDetail.is_liked}
          studyId={props.studyDetail.id}
        />
        <StudyComments
          creator={props.studyDetail.creator.username}
          comments={props.studyDetail.study_comments}
          studyId={props.studyDetail.id}
        />
        <TimeStamp time={props.studyDetail.natural_time} />
        <CommentBox studyId={props.studyDetail.id} />
        {console.log(props)}
      </div>
    </div>
  );
};

// StudyDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   studyImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   study_comments: PropTypes.arrayOf(
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

export default StudyDetail;
