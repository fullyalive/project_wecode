import React from "react";
import Loading from "components/Loading";
import { Link } from "react-router-dom";
import feedStyles from "shared/feedStyles.scss";
import styles from "./styles.scss";
// import PropTypes from "prop-types";

const PostFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.postFeed) {
    return <RenderFeed {...props} />;
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
  var qnaPost = [];
  var freePost = [];
  var askPost = [];
  props.postFeed.forEach(post => {
    switch (post.post_type) {
      case "qna":
        qnaPost.push(post);
        break;
      case "free":
        freePost.push(post);
        break;
      case "ask":
        askPost.push(post);
        break;
      default:
        break;
    }
  });
  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardTitle}>커뮤니티</div>
      <div className={styles.boards}>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>Q&amp;A</div>
            <Link to="/community/qna/1" className={styles.more}>
              + 더보기
            </Link>
          </div>
          {qnaPost.map(post => {
            return (
              <div className={styles.titleContainer} key={post.id}>
                <Link
                  to={`/community/detail/${post.id}`}
                  className={styles.title}
                >
                  {post.title}
                </Link>
                {post.comment_count * 1 > 0 ? (
                  <span className={styles.commentCount}>
                    [{post.comment_count}]
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>자유게시판</div>
            <Link to="/community/free/1" className={styles.more}>
              + 더보기
            </Link>
          </div>
          {freePost.map(post => {
            return (
              <div className={styles.titleContainer} key={post.id}>
                <Link
                  to={`/community/detail/${post.id}`}
                  className={styles.title}
                >
                  {post.title}
                </Link>
                {post.comment_count * 1 > 0 ? (
                  <span className={styles.commentCount}>
                    [{post.comment_count}]
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>문의사항</div>
            <Link to="/community/ask/1" className={styles.more}>
              + 더보기
            </Link>
          </div>
          {askPost.map(post => {
            return (
              <div className={styles.titleContainer} key={post.id}>
                <Link
                  to={`/community/detail/${post.id}`}
                  className={styles.title}
                >
                  {post.title}
                </Link>
                {post.comment_count * 1 > 0 ? (
                  <span className={styles.commentCount}>
                    [{post.comment_count}]
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
