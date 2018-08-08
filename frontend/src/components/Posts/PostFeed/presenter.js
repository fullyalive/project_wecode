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
  let qnaPost = [];
  let freePost = [];
  props.postFeed.forEach(post => {
    switch (post.post_type) {
      case "qna":
        qnaPost.push(post);
        break;
      case "free":
        freePost.push(post);
        break;
      default:
        break;
    }
  });
  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardTitle}>
        <span className={styles.title}>라이브러리</span>
        <span className={styles.subTitle}>프로그래밍 하다가 열받을 땐?</span>
      </div>

      <div className={styles.boards}>
        <div className={styles.askBoard}>
          <Link to="/community/ask/1" className={styles.askLink}>
            FAQ
          </Link>
        </div>
        <div className={styles.contentBoards}>
          <div className={styles.mainBoard}>
            <div className={styles.boardHeader}>
              <div className={styles.boardName}>질문하기</div>
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
                    - {post.title}
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
              <div className={styles.boardName}>포스트</div>
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
                    - {post.title}
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
    </div>
  );
};

export default PostFeed;
