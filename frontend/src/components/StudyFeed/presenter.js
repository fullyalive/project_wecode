import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
import StudyCard from "components/StudyCard";

const StudyFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.studyFeed) {
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
      {props.studyFeed.map(study => <StudyCard {...study} key={study.id} />)}
    </div>
);

StudyFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  studyFeed: PropTypes.array
};

export default StudyFeed;
