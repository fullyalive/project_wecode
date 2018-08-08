import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
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
    <div className={feedStyles.sectionTitle}>모집중인 강의</div>
    <div className={feedStyles.feed}>
      <div className={feedStyles.cards}>
        {props.lectureFeed.map(lecture => (
          <LectureCard {...lecture} key={lecture.id} />
        ))}
      </div>
    </div>
  </div>
);

LectureFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  lectureFeed: PropTypes.array
};

export default LectureFeed;
