import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Styles from "./styles.scss";

const Banner = (props, context) => {
  return (
    <div className={Styles.banner}>
      <div className={Styles.profile}>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={Styles.profileImage}
        />
        <div className={Styles.profileText}>
          <span className={Styles.creator}>{props.creator.username}</span>
          <span className={Styles.divider}> / </span>
          <span className={Styles.location}>{props.location}</span>
        </div>
        <span className={Styles.price}>120,000</span>
      </div>
      <span className={Styles.button}>보러가기</span>
      <div className={Styles.meta}>
        <span className={Styles.bannerTitle}>{props.title}</span>
        <span className={Styles.bannerSub}>{props.short_description}</span>
      </div>
      <img
        src={props.bannerImage}
        alt={props.short_description}
        className={Styles.bannerImage}
      />
      {/* <Link to={`/banners/${props.id}`} params='dd'
      > */}
      {/* </Link> */}
    </div>
  );
};

Banner.propTypes = {
  id: PropTypes.number.isRequired,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  bannerImage: PropTypes.string.isRequired,
  short_description: PropTypes.string.isRequired,

};

export default Banner;
