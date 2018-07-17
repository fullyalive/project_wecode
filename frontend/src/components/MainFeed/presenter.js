import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import Loading from "components/Loading";
import LectureCard from "components/Lecture/LectureCard";
import StudyCard from "components/StudyGroups/StudyCard";
import BannerCard from "components/Banner";

const MainFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.bannerFeed && props.studyFeed && props.lectureFeed) {
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
    <div>
      {props.bannerFeed.map(banner => (
        <BannerCard {...banner} key={banner.id} />
      ))}
    </div>
    <div className={feedStyles.sectionTitle}>모집중인 강의</div>
    <div className={feedStyles.feed}>
      {props.lectureFeed.map(lecture => (
        <LectureCard {...lecture} key={lecture.id} />
      ))}
    </div>
    <div className={feedStyles.sectionTitle}>모집중인 스터디</div>
    <div className={feedStyles.feed}>
      {props.studyFeed.map(study => <StudyCard {...study} key={study.id} />)}
    </div>
  </div>
);

MainFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  bannerFeed: PropTypes.array,
  lecutreFeed: PropTypes.array,
  studyFeed: PropTypes.array
};

export default MainFeed;
