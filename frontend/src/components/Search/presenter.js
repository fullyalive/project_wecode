import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import feedStyles from "shared/feedStyles.scss";
import Loading from "components/Loading";
import LectureCard from "components/Cards/Lecture/LectureCard";
import StudyCard from "components/Cards/StudyGroups/StudyCard";

const Explore = props => {
  if (props.loading) {
    return <LoadingExplore />;
  } else {
    return <RenderExplore {...props} />;
  }
};

const LoadingExplore = props => (
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      <div className={feedStyles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderExplore = props => (
  <div className={styles.searchContainers}>
    <div className={styles.searchContainer}>
      <span className={styles.searchTitle}>강의 목록</span>
      <div className={styles.searchLists}>
        <div className={styles.searchList}>
          {props.lectureList.map(lecture => (
            <LectureCard {...lecture} key={lecture.id} />
          ))}
        </div>
      </div>
    </div>
    <div className={styles.searchContainer}>
      <span className={styles.searchTitle}>스터디 목록</span>
      <div className={styles.searchLists}>
        <div className={styles.searchList}>
          {props.studyList.map(study => (
            <StudyCard {...study} key={study.id} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

Explore.propTypes = {
  loading: PropTypes.bool.isRequired
  // feed: PropTypes.array
};

export default Explore;
