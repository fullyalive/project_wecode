import { connect } from "react-redux";
import { actionCreators as bannerActions } from "redux/modules/banners";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const bannerFeed = state.banners.bannerFeed;
  return {
    bannerFeed
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBannerFeed: () => {
      dispatch(bannerActions.getBannerFeed());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
