import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Styles from "./styles.scss";

const BannerCard = (props, context) => {
  return (
    <div className={Styles.card}>
      <header className={Styles.header}>
        <div className={Styles.headerColumn}>
          <span className={Styles.creator}>{props.creator.username}</span>
          <span className={Styles.location}>{props.location}</span>
        </div>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={Styles.image}
        />
      </header>
      {/* <Link to={`/banners/${props.id}`} params='dd'
      > */}
      <img
        src={props.bannerImage}
        alt={props.short_description}
        className={Styles.cardImage}
      />
      {/* </Link> */}
      <div className={Styles.meta}>
        <span className={Styles.cardTitle}>{props.title}</span>
        <span className={Styles.cardSub}>{props.short_description}</span>
      </div>
      {console.log(props)}
      <div className={Styles.cardFooter}>
        <span className={Styles.price}>price</span>
      </div>
    </div>
  );
};

BannerCard.propTypes = {
  id: PropTypes.number.isRequired,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.string.isRequired,
  bannerImage: PropTypes.string.isRequired,
  like_count: PropTypes.number.isRequired,
  short_description: PropTypes.string.isRequired,
  banner_comments: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  is_liked: PropTypes.bool.isRequired
};

export default BannerCard;
