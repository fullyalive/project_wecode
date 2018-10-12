import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import Loading from "components/Loading";
import LectureCard from "components/Cards/Lecture/LectureCard";
import Banner from "components/MainFeed/Banner";
// import StudyCard from "components/Cards/StudyGroups/StudyCard";

const MainFeed = props => {
  if (!props.loading) {
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

const RenderFeed = props => {
  const isEmptyLecture = props.lectureFeed.length === 0 ? true : false;
  const maxLectureLength = props.lectureFeed.length < 6 ? props.lectureFeed.length : 6;
  const lectureFeed = props.lectureFeed.slice(0, maxLectureLength);
  // const isEmptyStudy = props.studyFeed.length === 0 ? true : false;
  // const maxStudyLength = props.studyFeed.length < 6 ? props.studyFeed.length : 6;
  // const studyFeed = props.studyFeed.slice(0, maxStudyLength);
  return (
    <div>
      <div className={feedStyles.feedBanner}>
        <Banner />
      </div>
      <div className={feedStyles.feedContainer}>
        <div className={feedStyles.sectionTitle}>모집중인 스터디</div>
        <div className={feedStyles.feed}>
          {!isEmptyLecture ? (
            <div className={feedStyles.cards}>
              {lectureFeed.map(lecture => (
                <LectureCard {...lecture} key={lecture.id} />
              ))}
            </div>
          ) : (
            <div className={feedStyles.cards}>
              현재 모집 중입니다. 개설 신청은 여기에서 해주세요.
            </div>
          )}
        </div>
        {/* <div className={feedStyles.sectionTitle}>모집중인 스터디</div>
        <div className={feedStyles.feed}>
          {!isEmptyStudy ? (
            <div className={feedStyles.cards}>
              {studyFeed.map(study => (
                <StudyCard {...study} key={study.id} />
              ))}
            </div>
          ) : (
            <div className={feedStyles.cardsEmpty}>
              현재 모집 중입니다. 개설 신청은
              <a
                href="https://goo.gl/forms/lBAfkQE4OSFDxKn73"
                target="_blank"
                rel="noopener noreferrer"
                className={feedStyles.cardLink}
              >
                여기
              </a>
              에서 해주세요.
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

MainFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  bannerFeed: PropTypes.array,
  lecutreFeed: PropTypes.array,
  studyFeed: PropTypes.array
};

export default MainFeed;
