import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import styles from "./styles.scss";

const Banner = (props, context) => {
  return (
    <div className={styles.banner}>
      <div className={styles.profile}>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={styles.profileImage}
        />
        <div className={styles.profileText}>
          <span className={styles.creator}>{props.creator.username}</span>
          <span className={styles.divider}> / </span>
          <span className={styles.location}>{props.location}</span>
        </div>
        <span className={styles.price}>120,000</span>
      </div>
      <span className={styles.button}>보러가기</span>
      <div className={styles.meta}>
        <span className={styles.bannerTitle}>{props.title}</span>
        <span className={styles.bannerSub}>{props.short_description}</span>
      </div>
      <img
        src={props.bannerImage}
        alt={props.short_description}
        className={styles.bannerImage}
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
  short_description: PropTypes.string.isRequired
};

export default Banner;
