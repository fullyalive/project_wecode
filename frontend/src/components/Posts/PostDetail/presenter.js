import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import feedStyles from "shared/feedStyles.scss";
import Loading from "components/Loading";
import Comments from "components/CardDetails/CommentList/Comments";
import CommentBox from "components/CardDetails/CommentList/CommentBox";
import SideBar from "components/Posts/SideBar";
import styles from "./styles.scss";

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
  let isCreator = false;
  if (
    props.isLoggedIn &&
    props.userInfo.username === props.postDetail.creator.username
  ) {
    isCreator = true;
  }
  return <div className={styles.container}>
      <div className={styles.boardContainer}>
        <div className={styles.firstColumn}>
          <SideBar />
        </div>
        <div className={styles.secondColumn}>
          <div className={styles.boardHeader}>
            <Link to={`/community/${props.postDetail.post_type}/1`} className={styles.link}>
              <div className={styles.boardMenu}>모두보기</div>
            </Link>
            <span className={styles.divider}>|</span>
            <div className={styles.boardMenu}>인기글</div>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.postHeader}>
              <span className={styles.title}>{props.postDetail.title}</span>
            </div>
            <div className={styles.subInfo}>
              <div className={styles.info}>
                by {props.postDetail.creator.username}
              </div>
              <div className={styles.info}>
                {props.postDetail.created_time_ymdhm}
              </div>
            </div>
            <div className={styles.functionBar}>
              {isCreator ? <Link to={{ pathname: `/community/edit`, state: { postId: props.postId, post_type: props.postDetail.post_type, title: props.postDetail.title, description: props.postDetail.description } }} className={styles.editButton}>
                  수정
                </Link> : null}
              <div className={styles.deleteButton}>
                {isCreator ? (
                  <span onClick={props.onDeleteClick}>삭제</span>
                ) : null}
              </div>
            </div>
            <div className={styles.postContent}>
              <p dangerouslySetInnerHTML={{ __html: props.postDetail.description }} />
            </div>
          </div>
          <div className={styles.commentContainer}>
            <div className={styles.postInfo}>
              <span className={styles.commentCount}>
                댓글 {props.postDetail.comment_count}개
              </span>
              <span className={styles.divider}>|</span>
              <span className={styles.viewCount}>
                조회수 {props.postDetail.view_count}
              </span>
            </div>
            <Comments creator={props.postDetail.creator.username} comments={props.postDetail.post_comments} postId={props.postDetail.id} isLoggedIn={props.isLoggedIn} />
            <CommentBox postId={props.postDetail.id} isLoggedIn={props.isLoggedIn} />
          </div>
        </div>
      </div>
    </div>;
};

RenderDetail.contextTypes = {
  t: PropTypes.func.isRequired
};

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
