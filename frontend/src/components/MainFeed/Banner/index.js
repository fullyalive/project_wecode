import { connect } from "react-redux";
import { actionCreators as bannerActions } from "redux/modules/banners";
import Presenter from "./presenter";

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
)(Presenter);
