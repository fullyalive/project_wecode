import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import Loading from "components/Loading";
// import Lectures from "components/Lectures";
// import StudyGroups from "components"

const Feed = props => {
  if (props.loading) {
    return <LoadingFeed />;
  }
};

const LoadingFeed = props => (
  <div className={styles.feed}>
    <Loading />
  </div>
);


Feed.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Feed;
