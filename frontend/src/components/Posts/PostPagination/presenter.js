import React from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import Pagination from "react-paginating";
import styles from "./styles.scss";
import feedStyles from "shared/feedStyles.scss";

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
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>게시판</div>
      <div className={styles.posts}>
        {props.postFeed.map(post => {
          return (
            <div className={styles.post} key={post.id}>
              <Link to={`/community/detail/${post.id}`}>
                <span className={styles.title}>{post.title}</span>
              </Link>
              <span className={styles.username}>{post.username}</span>
              <span className={styles.time}>{post.created_at}</span>
            </div>
          );
        })}
      </div>
      <Link
        to={{
          pathname: "/community/write",
          state: {
            type: props.type
          }
        }}
        params={{ testvalue: "hello" }}
      >
        <span>글쓰기</span>
      </Link>
      <Pagination
        total={props.count}
        limit={20}
        pageCount={5}
        currentPage={props.currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps
        }) => (
          <div>
            <button
              {...getPageItemProps({
                pageValue: 1,
                onPageChange: props.handlePageChange
              })}
            >
              first
            </button>

            {hasPreviousPage && (
              <button
                {...getPageItemProps({
                  pageValue: previousPage,
                  onPageChange: props.handlePageChange
                })}
              >
                {"<"}
              </button>
            )}

            {pages.map(page => {
              let activePage = null;
              if (currentPage === page) {
                activePage = { backgroundColor: "#fdce09" };
              }
              return (
                <button
                  key={page}
                  style={activePage}
                  {...getPageItemProps({
                    pageValue: page,
                    onPageChange: props.handlePageChange
                  })}
                >
                  {page}
                </button>
              );
            })}

            {hasNextPage && (
              <button
                {...getPageItemProps({
                  pageValue: nextPage,
                  onPageChange: props.handlePageChange
                })}
              >
                {">"}
              </button>
            )}

            <button
              {...getPageItemProps({
                pageValue: totalPages,
                onPageChange: props.handlePageChange
              })}
            >
              last
            </button>
          </div>
        )}
      </Pagination>
    </div>
  );
};

export default PostFeed;
