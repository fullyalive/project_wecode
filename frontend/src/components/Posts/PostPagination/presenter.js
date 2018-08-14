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
                <div className={styles.postTitle}>포스트</div>
              ) : null}
              {props.type === "ask" ? (
                <div className={styles.postTitle}>FAQ</div>
              ) : null}
              {props.type === "qna" ? (
                <div className={styles.postIntro}>
                  프로그래밍 질문 게시판입니다
                </div>
              ) : null}
              {props.type === "free" ? (
                <div className={styles.postIntro}>
                  위코드에서 발행하는 포스트
                </div>
              ) : null}
              {props.type === "ask" ? (
                <div className={styles.postIntro}>
                  자주 묻는 사항과 문의사항 게시판입니다.
                </div>
              ) : null}
            </div>

            <div className={styles.postContainer}>
              {props.type === "free" ? (
                <div className={styles.postCards}>
                  {props.postFeed.map(post => {
                    return (
                      <div className={styles.post} key={post.id}>
                        <div className={styles.firstRow}>
                          <div className={styles.postImage}>
                            <Link to={`/community/detail/${post.id}`}>
                              {/* <img */}
                            </Link>
                          </div>
                          <img
                            src={post.creator.profile_image}
                            alt={post.creator.username}
                            className={styles.creatorImage}
                          />
                          <div className={styles.postcardHeader}>
                            <Link
                              to={`/community/detail/${post.id}`}
                              className={styles.postcardTitle}
                            >
                              {post.title}
                            </Link>
                            {post.comment_count * 1 > 0 ? (
                              <span className={styles.commentCount}>
                                [{post.comment_count}]
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className={styles.secondRow}>
                          <span className={styles.creatorName}>
                            {post.creator.username}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className={styles.postBoard}>
                  <div className={styles.postCategory}>
                    <span className={styles.contentId}>번호</span>
                    <span className={styles.contentTitle}>제목</span>
                    <span className={styles.creatorName}>이름</span>
                    <span className={styles.viewCount}>조회수</span>
                    <span className={styles.time}>날짜</span>
                  </div>
                  {props.postFeed.map(post => {
                    return (
                      <div className={styles.post} key={post.id}>
                        <div className={styles.firstSection}>
                          <span className={styles.contentId}>{post.id}</span>
                          <span className={styles.contentTitle}>
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
                          </span>
                        </div>
                        <div className={styles.secondSection}>
                          <span className={styles.sectionCategory}>by</span>
                          <span className={styles.creatorName}>
                            {post.creator.username}
                          </span>
                          <span className={styles.sectionDivider}>|</span>
                          <span className={styles.sectionCategory}>조회수</span>
                          <span className={styles.viewCount}>
                            {post.view_count}
                          </span>
                          <span className={styles.sectionDivider}>|</span>
                          <span className={styles.time}>
                            {post.created_time_ymd}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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
                    className={styles.pageButton}
                  >
                    &#171;
                  </button>

                  {hasPreviousPage && (
                    <button
                      {...getPageItemProps({
                        pageValue: previousPage,
                        onPageChange: props.handlePageChange
                      })}
                      className={styles.pageButton}
                    >
                      &#60;
                    </button>
                  )}

                  {pages.map(page => {
                    let activePage = null;
                    if (currentPage === page) {
                      activePage = {
                        backgroundColor: "#3FA9F5",
                        borderColor: "#3FA9F5",
                        color: "white"
                      };
                    }
                    return (
                      <button
                        key={page}
                        style={activePage}
                        {...getPageItemProps({
                          pageValue: page,
                          onPageChange: props.handlePageChange
                        })}
                        className={styles.pageButton}
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
                      className={styles.pageButton}
                    >
                      &#62;
                    </button>
                  )}

                  <button
                    {...getPageItemProps({
                      pageValue: totalPages,
                      onPageChange: props.handlePageChange
                    })}
                    className={styles.pageButton}
                  >
                    &#187;
                  </button>
                </div>
              )}
            </Pagination>
            <Link
              to={{ pathname: "/community/write", state: { type: props.type } }}
              className={styles.writeButton}
            >
              글쓰기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
