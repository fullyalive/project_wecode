import React from "react";
import PropTypes from "prop-types";
import Styles from "./styles.scss";
import Loading from "components/Loading";
import BannerCard from "components/Banner/BannerCard";

const BannerFeed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  } else if (props.bannerFeed) {
    return <RenderFeed {...props} />;
  }
};

const LoadingFeed = props => (
  <div className={Styles.feedContainer}>
    <div className={Styles.feed}>
      <div className={Styles.feedLoading}>
        <Loading />
      </div>
    </div>
  </div>
);

const RenderFeed = props => (
  <div className={Styles.feedContainer}>
    <div className={Styles.feed}>
      {props.bannerFeed.map(banner => (
        <BannerCard {...banner} key={banner.id} />
      ))}
    </div>
  </div>
);

BannerFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  bannerFeed: PropTypes.array
};

export default BannerFeed;
