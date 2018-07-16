import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import LectureCard from "components/Lecture/LectureCard";
import StudyCard from "components/StudyGroups/StudyCard";

const MainFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.studyFeed && props.lectureFeed) {
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
  <div>
    <div className={styles.feed}>
      {console.log(props)}
      {props.lectureFeed.map(lecture => (
        <LectureCard {...lecture} key={lecture.id} />
      ))}
    </div>
    <div className={styles.feed}>
      {props.studyFeed.map(study => <StudyCard {...study} key={study.id} />)}
    </div>
  </div>
);

MainFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  feed: PropTypes.array
};

export default MainFeed;
