import React from "react";
// import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import detailStyles from "shared/detailStyles.scss";
import LectureActions from "components/Lecture/LectureActions";
import LectureComments from "components/Lecture/LectureComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";
import Loading from "components/Loading";

const LectureDetail = props => {
  if (props.lectureDetail === undefined) {
    return <LoadingDetail />;
  } else if (props.lectureDetail) {
    return <RenderDetail {...props} />;
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
  return (
    <div className={detailStyles.container}>
      <div className={detailStyles.cardDetail}>
        <img
          src={props.lectureDetail.lectureImage}
          alt={props.lectureDetail.short_description}
        />
        <div className={detailStyles.meta}>
          <LectureActions
            number={props.lectureDetail.like_count}
            isLiked={props.lectureDetail.is_liked}
            lectureId={props.lectureDetail.id}
          />
          <LectureComments
            creator={props.lectureDetail.creator.username}
            comments={props.lectureDetail.lecture_comments}
            lectureId={props.lectureDetail.id}
          />
          <TimeStamp time={props.lectureDetail.natural_time} />
          <CommentBox lectureId={props.lectureDetail.id} />
        </div>
      </div>
      <div className={detailStyles.sideDetail}>
        <header className={detailStyles.header}>
          <img
            src={
              props.lectureDetail.creator.profile_image ||
              require("images/noPhoto.jpg")
            }
            alt={props.lectureDetail.creator.username}
            className={detailStyles.profileImage}
          />
          <div className={detailStyles.headerColumn}>
            <span className={detailStyles.creator}>
              {props.lectureDetail.creator.username}
            </span>
            <span className={detailStyles.location}>
              {props.lectureDetail.location}
            </span>
          </div>
        </header>
        <div className={detailStyles.headerMeta}>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>기간</span>
            <span className={detailStyles.headerInfo}>
              {props.lectureDetail.start_date} ~ {props.lectureDetail.end_date}
            </span>
          </div>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>시간</span>
            <span className={detailStyles.headerInfo}>
              {props.lectureDetail.day1}
              {props.lectureDetail.day2} {props.lectureDetail.start_time} ~ {props.lectureDetail.end_time}
            </span>
          </div>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>장소</span>
            <span className={detailStyles.headerInfo}>{props.lectureDetail.location}</span>
          </div>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>가격</span>
            <span className={detailStyles.headerInfo}>
              {props.lectureDetail.comma_price}원
            </span>
          </div>
        </div>
      </div>
      {console.log(props)}
    </div>
  );
};

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
