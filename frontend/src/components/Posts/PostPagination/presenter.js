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
      <div className={styles.boardTitle}>게시판 설명</div>
      <div className={styles.posts}>
        <div className={styles.postHeader}>
          <div className={styles.postTitle}>게시판 이름</div>
          <div className={styles.postCategory}>
            <span>번호</span>
            <span>제목</span>
            <span>이름</span>
            <span>추천</span>
            <span>조회수</span>
            <span>날짜</span>
          </div>
        </div>
        {props.postFeed.map(post => {
          return (
            <div className={styles.post} key={post.id}>
              <div className={styles.postTitle}>
                <Link to={`/community/detail/${post.id}`}>
                  <span className={styles.title}>{post.title}</span>
                </Link>
              </div>
              <div className={styles.postInfo}>
                <span className={styles.username}>익명</span>
                <span className={styles.time}>{post.created_month}</span>
              </div>
            </div>
          );
        })}
        {console.log(props)}
      </div>
      <div className={styles.postFooter}>
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
            <div className={styles.pagination}>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: props.handlePageChange
                })}
              >
                &#171;
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
                  activePage = { backgroundColor: "#3FA9F5" };
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
                &#187;
              </button>
            </div>
          )}
        </Pagination>
        <Link
          to={{ pathname: "/community/write", state: { type: props.type } }}
          params={{ testvalue: "hello" }}
        >
          <span className={styles.writeButton}>글쓰기</span>
        </Link>
      </div>
    </div>
  );
};

export default PostFeed;
