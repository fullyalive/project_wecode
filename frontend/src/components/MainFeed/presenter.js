import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
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
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      <div className={feedStyles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderFeed = props => (
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      {console.log(props)}
      {props.lectureFeed.map(lecture => (
        <LectureCard {...lecture} key={lecture.id} />
      ))}
    </div>
    <div className={feedStyles.feed}>
      {props.studyFeed.map(study => <StudyCard {...study} key={study.id} />)}
    </div>
  </div>
);

MainFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  feed: PropTypes.array
};

export default MainFeed;
