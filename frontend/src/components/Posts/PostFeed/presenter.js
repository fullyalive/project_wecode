import React from "react";
import Loading from "components/Loading";
import { Link } from "react-router-dom";
import cardStyles from "shared/cardStyles.scss";
import feedStyles from "shared/feedStyles.scss";
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
    <div className={feedStyles.feedContainer}>
      <div className={feedStyles.sectionTitle}>게시판</div>
      <div className={feedStyles.feed}>
        {props.postFeed.map(post => {
          return (
            <div className={cardStyles.card} key={post.id}>
              {post.title}
            </div>
          );
        })}
        <Link to={"/community/write/"}>
          <span>글쓰기</span>
        </Link>
      </div>
      <div />
    </div>
  );
};

export default PostFeed;
