import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import Loading from "components/Loading";
import StudyCard from "components/StudyGroups/StudyCard";

const StudyFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.studyFeed) {
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
    <div className={feedStyles.sectionTitle}>모집중인 스터디</div>
    <div className={feedStyles.feed}>
      <div className={feedStyles.cards}>
        {props.studyFeed.map(study => <StudyCard {...study} key={study.id} />)}
      </div>
    </div>
  </div>
);

StudyFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  studyFeed: PropTypes.array
};

export default StudyFeed;
