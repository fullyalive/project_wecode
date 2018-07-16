import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import LectureCard from "components/Lecture/LectureCard";

const LectureFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.lectureFeed) {
    return <RenderFeed {...props} />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <div className={styles.feedLoading}>
      <Loading />
    </div>
  </div>
);

const RenderFeed = props => (
    <div className={styles.feed}>
      {console.log(props)}
      {props.lectureFeed.map(lecture => (
        <LectureCard {...lecture} key={lecture.id} />
      ))}
  </div>
);

LectureFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  lectureFeed: PropTypes.array
};

export default LectureFeed;
