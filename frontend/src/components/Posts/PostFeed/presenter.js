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
  const countpages = Math.ceil(props.count / 20);
  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardTitle}>인기글</div>
      <div className={styles.boards}>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>Q&amp;A</div>
            <div className={styles.more}>+ 더보기</div>
          </div>
          {props.postFeed.map(post => {
            return (
              <div className={styles.title} key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>자유게시판</div>
            <div className={styles.more}>+ 더보기</div>
          </div>
          {props.postFeed.map(post => {
            return (
              <div className={styles.title} key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>기타</div>
            <div className={styles.more}>+ 더보기</div>
          </div>
          {props.postFeed.map(post => {
            return (
              <div className={styles.title} key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>기타</div>
            <div className={styles.more}>+ 더보기</div>
          </div>
          {props.postFeed.map(post => {
            return (
              <div className={styles.title} key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>기타</div>
            <div className={styles.more}>+ 더보기</div>
          </div>
          {props.postFeed.map(post => {
            return (
              <div className={styles.title} key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <div className={styles.boardName}>기타</div>
            <div className={styles.more}>+ 더보기</div>
          </div>
          {props.postFeed.map(post => {
            return (
              <div className={styles.title} key={post.id}>
                {post.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
