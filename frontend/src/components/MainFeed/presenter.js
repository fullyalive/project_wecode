import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import Loading from "components/Loading";
import LectureCard from "components/Lecture/LectureCard";
import StudyCard from "components/StudyGroups/StudyCard";
import Banner from "components/Banner";

const MainFeed = props => {
  console.log(props);
  if (props.bannerFeed && props.studyFeed && props.lectureFeed) {
    return <RenderFeed {...props} />;
  } else {
    return <LoadingFeed />;
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
  <div>
    <div className={feedStyles.feedBanner}>
      <Banner />
    </div>
    <div className={feedStyles.feedContainer}>
      <div className={feedStyles.sectionTitle}>모집중인 강의</div>
      <div className={feedStyles.feed}>
        <div className={feedStyles.cards}>
          {props.lectureFeed.map(lecture => (
            <LectureCard {...lecture} key={lecture.id} />
          ))}
        </div>
      </div>
      <div className={feedStyles.sectionTitle}>모집중인 스터디</div>
      <div className={feedStyles.feed}>
        <div className={feedStyles.cards}>
          {props.studyFeed.map(study => (
            <StudyCard {...study} key={study.id} />
          ))}
        </div>
      </div>
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
