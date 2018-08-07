import React from "react";
import { Link } from "react-router-dom";
import Loading from "components/Loading";
import Pagination from "react-paginating";
import SideBar from "components/Posts/SideBar";
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
    <div className={styles.containers}>
      <div className={styles.boardContainer}>
        <div className={styles.firstColumn}>
          <SideBar />
        </div>
        <div className={styles.secondColumn}>
          <div className={styles.boardHeader}>
            <div className={styles.boardMenu}>모두보기</div>
            <span className={styles.divider}>|</span>
            <div className={styles.boardMenu}>인기글</div>
          </div>
          <div className={styles.posts}>
            <div className={styles.postHeader}>
              {props.type === "qna" ? (
                <div className={styles.postTitle}>질문 게시판</div>
              ) : null}
              {props.type === "free" ? (
                <div className={styles.postTitle}>자유 게시판</div>
              ) : null}
              {props.type === "ask" ? (
                <div className={styles.postTitle}>FAQ</div>
              ) : null}
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
                  <div className={styles.firstColumn}>
                    <span className={styles.postId}>{post.id}</span>
                    <span className={styles.postTitle}>
                      <Link to={`/community/detail/${post.id}`}>
                        <span className={styles.title}>{post.title}</span>
                      </Link>
                    </span>
                  </div>
                  <div className={styles.secondColumn}>
                    <span className={styles.username}>익명</span>
                    <span className={styles.time}>{post.created_time_ymd}</span>
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
                      &#60;
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
                      &#62;
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
      </div>
    </div>
  );
};

export default PostFeed;
