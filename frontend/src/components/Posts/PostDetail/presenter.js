import React from "react";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import detailStyles from "shared/detailStyles.scss";
import Loading from "components/Loading";
import TutorInfo from "components/CardDetails/TutorInfo";
import Contents from "components/CardDetails/Contents";
import Curriculum from "components/CardDetails/Curriculum";

const PostDetail = props => {
  if (props.isLoggedIn) {
    if (props.postDetail === undefined || props.userInfo === undefined) {
      return <LoadingDetail />;
    } else if (props.postDetail && props.userInfo) {
      return <RenderDetail {...props} />;
    }
  } else {
    if (props.postDetail === undefined) {
      return <LoadingDetail />;
    } else if (props.postDetail) {
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
  return (
    <div className={detailStyles.container}>
      <div className={detailStyles.cardDetail} />
      <div className={detailStyles.meta}>
        <TutorInfo
          profile_image={props.postDetail.creator.profile_image}
          username={props.postDetail.creator.username}
          bio={props.postDetail.creator.bio}
        />
        <Contents contents={props.postDetail.description} />
        <Curriculum
          curriculum1={props.postDetail.curriculum1}
          curriculum2={props.postDetail.curriculum2}
        />
      </div>
    </div>
  );
};

RenderDetail.contextTypes = {
  t: PropTypes.func.isRequired
};
// {/* <TimeStamp time={props.postDetail.natural_time} /> */}

// {/* <LectureActions
//   number={props.postDetail.like_count}
//   isLiked={props.postDetail.is_liked}
//   postId={props.postDetail.id}
//   isFeed={false}
// /> */}

// LectureDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   postImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   post_comments: PropTypes.arrayOf(
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

export default PostDetail;