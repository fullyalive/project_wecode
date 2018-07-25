import React from "react";
import PropTypes from "prop-types";
import detailStyles from "shared/detailStyles.scss";

const CardSideBar = (props, context) => {
  
  return (
    <div className={detailStyles.sideDetail}>
      <header className={detailStyles.header}>
      {console.log(props)}
        <img
          src={
            props.profile_image ||
            require("images/noPhoto.jpg")
          }
          alt={props.username}
          className={detailStyles.profileImage}
        />
        <div className={detailStyles.headerColumn}>
          <span className={detailStyles.creator}>
            {props.username}
          </span>
          <span className={detailStyles.bio}>
            {props.bio}
          </span>
        </div>
      </header>
      <div className={detailStyles.headerMeta}>
        <div className={detailStyles.metaList}>
          <span className={detailStyles.headerCategory}>기간</span>
          <span className={detailStyles.headerInfo}>
            {props.start_date} ~ {props.end_date}
          </span>
        </div>
        <div className={detailStyles.metaList}>
          <span className={detailStyles.headerCategory}>시간</span>
          <span className={detailStyles.headerInfo}>
            {props.day1}
            {props.day2} {props.start_time} ~{" "}
            {props.end_time}
          </span>
        </div>
        <div className={detailStyles.metaList}>
          <span className={detailStyles.headerCategory}>장소</span>
          <span className={detailStyles.headerInfo}>
            {props.location}
          </span>
        </div>
        <div className={detailStyles.metaList}>
          <span className={detailStyles.headerCategory}>가격</span>
          <span className={detailStyles.headerInfo}>
            {props.comma_price}원
          </span>
        </div>
        <form>
          <input
            type="submit"
            value={context.t("신청하기")}
            className={detailStyles.button}
          />
        </form>
      </div>
    </div>
  );
};

CardSideBar.contextTypes = {
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

export default CardSideBar;
