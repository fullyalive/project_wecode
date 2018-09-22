import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import style from "./style.css";

const NoticeInfo = (props, context) => {
  return (
    <div className={styles.noticeDetail}>
      <div className={styles.noticeIntro}>
        공지사항 <br />
        <span style={{ fontSize: 14, fontWeight: "400" }}>(Notice)</span>
      </div>
      <div className={styles.noticeContainer}>
        <div className={styles.noticeSection}>
          <span className={styles.noticeTitle}>개인준비물</span>
          <span className={styles.noticeContent}>개인 노트북, 충전기</span>
        </div>
        <div className={styles.noticeSection}>
          <span className={styles.noticeTitle}>환불규정</span>
          <p className={styles.noticeContent}>
            <span className={styles.titleHighlight}>1개월(5주)이내인 강의</span>
            - 스터디 시작{" "}
            <span className={styles.contentHighlight}>7일 이전 </span> : 전액
            환불
            <br />- 스터디 시작{" "}
            <span className={styles.contentHighlight}>하루 전 </span> : 80% 환불
            <br />- 스터디 강의 시간이{" "}
            <span className={styles.contentHighlight}>1/3 지나기 전 </span>:
            수강료의 2/3 해당 금액
            <br />- 스터디 강의 시간이{" "}
            <span className={styles.contentHighlight}>1/2 지나기 전 </span> :
            수강료의 1/2 해당 금액
            <br />- 스터디 강의 시간이{" "}
            <span className={styles.contentHighlight}>1/2 경과 후 </span>: 환불
            없음
          </p>
          <p className={styles.noticeContent}>
            <div className={styles.titleHighlight}>환불신청 방법</div>
            <a
              href="http://pf.kakao.com/_qExdRj/chat"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.link}
            >
              카카오톡 1:1 문의
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

NoticeInfo.contextTypes = {
  t: PropTypes.func.isRequired
};

// LectureDetail.propTypes = {
//   id: PropTypes.number.isRequired,
//   creator: PropTypes.shape({
//     profile_image: PropTypes.string,
//     username: PropTypes.string.isRequired
//   }).isRequired,
//   location: PropTypes.string.isRequired,
//   lectureImage: PropTypes.string.isRequired,
//   like_count: PropTypes.number.isRequired,
//   short_description: PropTypes.string.isRequired,
//   lecture_comments: PropTypes.arrayOf(
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

export default NoticeInfo;
