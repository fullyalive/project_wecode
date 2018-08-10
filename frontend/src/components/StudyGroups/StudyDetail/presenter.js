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

const StudyDetail = props => {
  if (props.isLoggedIn) {
    if (props.studyDetail === undefined || props.userInfo === undefined) {
      return <LoadingDetail />;
    } else if (props.studyDetail && props.userInfo) {
      return <RenderDetail {...props} />;
    }
  } else {
    if (props.studyDetail === undefined) {
      return <LoadingDetail />;
    } else if (props.studyDetail) {
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
  if (props.isLoggedIn) {
    props.userInfo.attend_studygroups.map(studygroup => {
      attend_id.push(studygroup.id);
      return null;
    });
  }
  return <div className={detailStyles.container}>
      <HeaderBanner title={props.studyDetail.title} short_description={props.studyDetail.short_description} bannerImage={props.studyDetail.studyImage} />
      <div className={detailStyles.cardDetail}>
        <div className={detailStyles.imageContainer}>
          <img src={props.studyDetail.studyImage} alt={props.studyDetail.short_description} className={detailStyles.mainImage} />
        </div>
        <SideBar content_id={props.studyDetail.id} attend_id={attend_id} title={props.studyDetail.title} username={props.studyDetail.creator.username} bio={props.studyDetail.creator.bio} start_date={props.studyDetail.start_date} end_date={props.studyDetail.end_date} start_time={props.studyDetail.start_time} end_time={props.studyDetail.end_time} day1={props.studyDetail.day1} day2={props.studyDetail.day2} location={props.studyDetail.location} comma_price={props.studyDetail.comma_price} />
      </div>
      <div className={detailStyles.meta}>
        <TutorInfo profile_image={props.studyDetail.creator.profile_image} username={props.studyDetail.creator.username} bio={props.studyDetail.creator.bio} career1={props.studyDetail.career1} career2={props.studyDetail.career2} />
        <Contents contents={props.studyDetail.contents} />
        <Curriculum curriculum1={props.studyDetail.curriculum1} curriculum2={props.studyDetail.curriculum2} />
        <div className={detailStyles.qnaIntro}>
          문의사항 <br />
          <span style={{ fontSize: 14, fontWeight: "400" }}>(Q&amp;A)</span>
        </div>
        <Comments creator={props.studyDetail.creator.username} comments={props.studyDetail.study_comments} studyId={props.studyDetail.id} isLoggedIn={props.isLoggedIn} />
        <CommentBox studyId={props.studyDetail.id} isLoggedIn={props.isLoggedIn} />
      </div>
    </div>;
};

RenderDetail.contextTypes = {
  t: PropTypes.func.isRequired
};
// {/* <TimeStamp time={props.studyDetail.natural_time} /> */}

// {/* <StudyActions
//   number={props.studyDetail.like_count}
//   isLiked={props.studyDetail.is_liked}
//   studyId={props.studyDetail.id}
//   isFeed={false}
// /> */}

// StudyDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   studyImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   study_comments: PropTypes.arrayOf(
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

export default StudyDetail;
