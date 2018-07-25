import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import detailStyles from "shared/detailStyles.scss";
import LectureActions from "components/Lecture/LectureActions";
import LectureComments from "components/Lecture/LectureComments";
import CommentBox from "components/CommentBox";
import TimeStamp from "components/TimeStamp";
import Loading from "components/Loading";
import CardSideBar from "components/SideBar/CardSideBar";

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
        <div className={detailStyles.imageContainer}>
          <img
            src={props.lectureDetail.lectureImage}
            alt={props.lectureDetail.short_description}
            className={detailStyles.mainImage}
          />
        </div>
        <div className={detailStyles.meta}>
          <LectureActions
            number={props.lectureDetail.like_count}
            isLiked={props.lectureDetail.is_liked}
            lectureId={props.lectureDetail.id}
            isFeed={false}
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
      <CardSideBar
        profile_image={props.lectureDetail.creator.profile_image}
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
      {console.log(props)}
    </div>
  );
};

RenderDetail.contextTypes = {
  t: PropTypes.func.isRequired
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
