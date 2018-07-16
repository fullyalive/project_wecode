import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import LectureCard from "components/LectureCard";
import StudyCard from "components/StudyCard";
// import LectureDetail from "components/LectureDetail";

const Feed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.feed) {
    return <RenderFeed {...props} />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);

const RenderFeed = props => (
  <div>
    <div className={styles.feed}>
      {props.feed.map(lecture => <LectureCard {...lecture} key={lecture.id} />)}
    </div>
    <div className={styles.feed}>
      {props.feed.map(study => <StudyCard {...study} key={study.id} />)}
    </div>
  </div>
);

Feed.propTypes = {
  loading: PropTypes.bool.isRequired,
  feed: PropTypes.array
};

export default Feed;
