import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import styles from "./styles.scss";

const Banner = (props, context) => {
  return (
    <AwesomeSlider>
      {props.bannerFeed.map(banner => (
        <div key={banner.title}>
        {console.log(banner)}
          <div className={styles.banner}>
            <div className={styles.profile}>
              <img
                src={
                  banner.creator.profile_image || require("images/noPhoto.jpg")
                }
                alt={banner.creator.username}
                className={styles.profileImage}
              />
              <div className={styles.profileText}>
                <span className={styles.creator}>{banner.creator.username}</span>
                <span className={styles.divider}> / </span>
                <span className={styles.location}>{banner.location}</span>
              </div>
              <span className={styles.price}>120,000</span>
            </div>
            <span className={styles.button}>보러가기</span>
            <div className={styles.meta}>
              <span className={styles.bannerTitle}>{banner.title}</span>
              <span className={styles.bannerSub}>
                {banner.short_description}
              </span>
            </div>
            <img
              src={banner.bannerImage}
              alt={banner.short_description}
              className={styles.bannerImage}
            />
            {/* <Link to={`/banners/${props.id}`} params='dd'
      > */}
            {/* </Link> */}
          </div>
        </div>
      ))}
    </AwesomeSlider>
  );
};

Banner.propTypes = {
  // id: PropTypes.number.isRequired,
  // creator: PropTypes.shape({
  //   profile_image: PropTypes.string,
  //   username: PropTypes.string.isRequired
  // }).isRequired,
  // location: PropTypes.string.isRequired,
  // bannerImage: PropTypes.string.isRequired,
  // short_description: PropTypes.string.isRequired
};

export default Banner;
