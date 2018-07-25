import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import detailStyles from "shared/detailStyles.scss";
import StudyActions from "components/StudyGroups/StudyActions";
import StudyComments from "components/StudyGroups/StudyComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";
import Loading from "components/Loading";

const StudyDetail = props => {
  if (props.studyDetail === undefined) {
    return <LoadingDetail />;
  } else if (props.studyDetail) {
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
        <div className={detailStyles.imageContainer}>
          <img
            src={props.studyDetail.studyImage}
            alt={props.studyDetail.short_description}
            className={detailStyles.mainImage}
          />
        </div>
        <div className={detailStyles.meta}>
          <StudyActions
            number={props.studyDetail.like_count}
            isLiked={props.studyDetail.is_liked}
            studyId={props.studyDetail.id}
            isFeed={false}
          />
          <StudyComments
            creator={props.studyDetail.creator.username}
            comments={props.studyDetail.study_comments}
            studyId={props.studyDetail.id}
          />
          <TimeStamp time={props.studyDetail.natural_time} />
          <CommentBox studyId={props.studyDetail.id} />
        </div>
      </div>
      <div className={detailStyles.sideDetail}>
        <header className={detailStyles.header}>
          <img
            src={
              props.studyDetail.creator.profile_image ||
              require("images/noPhoto.jpg")
            }
            alt={props.studyDetail.creator.username}
            className={detailStyles.profileImage}
          />
          <div className={detailStyles.headerColumn}>
            <span className={detailStyles.creator}>
              {props.studyDetail.creator.username}
            </span>
            <span className={detailStyles.bio}>
              {props.studyDetail.creator.bio}
            </span>
          </div>
        </header>
        <div className={detailStyles.headerMeta}>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>기간</span>
            <span className={detailStyles.headerInfo}>
              {props.studyDetail.start_date} ~ {props.studyDetail.end_date}
            </span>
          </div>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>시간</span>
            <span className={detailStyles.headerInfo}>
              {props.studyDetail.day1}
              {props.studyDetail.day2} {props.studyDetail.start_time} ~{" "}
              {props.studyDetail.end_time}
            </span>
          </div>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>장소</span>
            <span className={detailStyles.headerInfo}>
              {props.studyDetail.location}
            </span>
          </div>
          <div className={detailStyles.metaList}>
            <span className={detailStyles.headerCategory}>가격</span>
            <span className={detailStyles.headerInfo}>
              {props.studyDetail.comma_price}원
            </span>
          </div>
          <form>
            <input
              type="submit"
              value={context.t("신청하기")}
              className={detailStyles.button}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

RenderDetail.contextTypes = {
  t: PropTypes.func.isRequired
};

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
