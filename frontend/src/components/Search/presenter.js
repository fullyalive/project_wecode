import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";

const Explore = props => {
  if (props.loading) {
    return <LoadingExplore />;
  } else {
    return <RenderExplore {...props} />;
  }
};

const LoadingExplore = props => (
  <div className={styles.search}>
    <Loading />
  </div>
);

const RenderExplore = props => (
  <div className={styles.search}>
    <div> 강의 목록 </div>
    {props.lectureList.map(lecture => (
      <div>
        <div>{lecture.id}</div>
        <div>{lecture.title}</div>
        <div>{lecture.creator.username}</div>
      </div>
    ))}
    <div> ------ </div>
    <div> 스터디 목록 </div>
    {props.studyList.map(study => (
      <div>
        <div>{study.id}</div>
        <div>{study.title}</div>
        <div>{study.creator.username}</div>
      </div>
    ))}
  </div>
);

Explore.propTypes = {
  loading: PropTypes.bool.isRequired
  // feed: PropTypes.array
};

export default Explore;
