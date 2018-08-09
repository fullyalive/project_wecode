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
  let attend_id = [];
  if (props.isLogged) {
    props.userInfo.attend_lectures.map(lecture => {
      attend_id.push(lecture.id);
      return null;
    });
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
          content_id={props.lectureDetail.id}
          attend_id={attend_id}
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
        />
      </div>
      <div className={detailStyles.meta}>
        <TutorInfo
          profile_image={props.lectureDetail.creator.profile_image}
          username={props.lectureDetail.creator.username}
          bio={props.lectureDetail.creator.bio}
          career1={props.lectureDetail.career1}
          career2={props.lectureDetail.career2}
        />
        <Contents contents={props.lectureDetail.contents} />
        <Curriculum
          curriculum1={props.lectureDetail.curriculum1}
          curriculum2={props.lectureDetail.curriculum2}
        />
        <div className={detailStyles.qnaIntro}>
          문의사항 <br />
          <span style={{ fontSize: 14, fontWeight: "400" }}>(Q&amp;A)</span>
        </div>
        <Comments
          creator={props.lectureDetail.creator.username}
          comments={props.lectureDetail.lecture_comments}
          lectureId={props.lectureDetail.id}
        />
        <CommentBox lectureId={props.lectureDetail.id} />
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
