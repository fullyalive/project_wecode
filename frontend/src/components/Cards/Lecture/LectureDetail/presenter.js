import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import detailStyles from "shared/detailStyles.scss";
import CommentBox from "components/CardDetails/CommentList/CommentBox";
import Loading from "components/Loading";
import SideBar from "components/CardDetails/SideBar";
import TutorInfo from "components/CardDetails/TutorInfo";
import Contents from "components/CardDetails/Contents";
import Curriculum from "components/CardDetails/Curriculum";
import Comments from "components/CardDetails/CommentList/Comments";
import HeaderBanner from "components/CardDetails/HeaderBanner";
import Notice from "components/CardDetails/Notice";

const LectureDetail = props => {
  if (props.isLoggedIn) {
    if (props.lectureDetail === undefined || props.userInfo === undefined) {
      return <LoadingDetail />;
    } else if (props.lectureDetail && props.userInfo) {
      return <RenderDetail {...props} />;
    }
  } else {
    if (props.lectureDetail === undefined) {
      return <LoadingDetail />;
    } else if (props.lectureDetail) {
      return <RenderDetail {...props} />;
    }
  }
};

const LoadingDetail = props => (
  <div className={feedStyles.feedContainer}>
    <div className={feedStyles.feed}>
      <div className={feedStyles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderDetail = (props, context) => {
  let attendId = [];
  let checkAttend = false;
  if (props.isLoggedIn) {
    props.userInfo.attend_lectures.map(lecture => {
      attendId.push(lecture.id);
      return null;
    });
  }
  if (attendId.indexOf(props.lectureDetail.id) !== -1) {
    checkAttend = true;
  }
  const currentDate = new Date();
  const date = props.lectureDetail.deadline.split("-");
  let prev_3day = new Date(date[0], date[1] - 1, date[2]);
  let after_1day = new Date(date[0], date[1] - 1, date[2]);
  prev_3day.setDate(prev_3day.getDate() - 3);
  after_1day.setDate(after_1day.getDate() + 1);
  let isChecked = "Default";
  if (currentDate > prev_3day) {
    isChecked = "Emergency";
  }
  if (currentDate >= after_1day) {
    isChecked = "Done";
  }
  return (
    <div className={detailStyles.container}>
      <HeaderBanner
        title={props.lectureDetail.title}
        short_description={props.lectureDetail.short_description}
        bannerImage={props.lectureDetail.lectureImage}
      />
      <div className={detailStyles.cardDetail}>
        <div className={detailStyles.imageContainer}>
          <img
            src={props.lectureDetail.lectureImage}
            alt={props.lectureDetail.short_description}
            className={detailStyles.mainImage}
          />
        </div>
        <SideBar
          contentId={props.lectureDetail.id}
          attendId={attendId}
          title={props.lectureDetail.title}
          username={props.lectureDetail.creator.username}
          bio={props.lectureDetail.creator.bio}
          start_date={props.lectureDetail.start_date}
          end_date={props.lectureDetail.end_date}
          start_time={props.lectureDetail.start_time}
          end_time={props.lectureDetail.end_time}
          day1={props.lectureDetail.day1}
          day2={props.lectureDetail.day2}
          location={props.lectureDetail.location}
          comma_price={props.lectureDetail.comma_price}
          url={props.lectureDetail.url}
          isChecked={isChecked}
        />
      </div>
      <div className={detailStyles.meta}>
        <TutorInfo
          profile_image={props.lectureDetail.creator.profile_image}
          name={props.lectureDetail.creator.name}
          username={props.lectureDetail.creator.username}
          bio={props.lectureDetail.creator.bio}
          career1={props.lectureDetail.career1}
          career2={props.lectureDetail.career2}
        />
        <Contents
          description={props.lectureDetail.description}
          contents={props.lectureDetail.contents}
        />
        <Curriculum
          curriculum1={props.lectureDetail.curriculum1}
          curriculum2={props.lectureDetail.curriculum2}
        />
        <Notice />
        <div className={detailStyles.qnaIntro}>
          문의사항 <br />
          <span style={{ fontSize: 14, fontWeight: "400" }}>(Q&amp;A)</span>
        </div>
        <Comments
          creator={props.lectureDetail.creator.username}
          comments={props.lectureDetail.lecture_comments}
          lectureId={props.lectureDetail.id}
          isLoggedIn={props.isLoggedIn}
          contentCreator={props.lectureDetail.creator.username}
        />
        <CommentBox
          lectureId={props.lectureDetail.id}
          isLoggedIn={props.isLoggedIn}
          checkAttend={checkAttend}
        />
      </div>
    </div>
  );
};

RenderDetail.contextTypes = {
  t: PropTypes.func.isRequired
};
// {/* <TimeStamp time={props.lectureDetail.natural_time} /> */}

// {/* <LectureActions
//   number={props.lectureDetail.like_count}
//   isLiked={props.lectureDetail.is_liked}
//   lectureId={props.lectureDetail.id}
//   isFeed={false}
// /> */}

// LectureDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   lectureImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   lecture_comments: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       message: PropTypes.string.isRequired,
//       creator: PropTypes.shape({
//         profile_image: PropTypes.string,
//         username: PropTypes.string.isRequired
//       }).isRequired
//     })
//   ).isRequired,
//   natural_time: PropTypes.string.isRequired,
//   is_liked: PropTypes.bool.isRequired
// };

export default LectureDetail;
