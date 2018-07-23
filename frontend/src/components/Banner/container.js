import React, { Component } from "react";
import PropTypes from "prop-types";
import BannerFeed from "./presenter";

class Container extends Component {
    state = {
        loading: true
    };
    static propTypes = {
        getBannerFeed: PropTypes.func.isRequired,
        bannerFeed: PropTypes.array
    };
    componentDidMount() {
        const { getBannerFeed } = this.props;

        if (!this.props.bannerFeed) {
            getBannerFeed();
        } else {
            this.setState({
                loading: false
            });
        }
    }
    componentWillReceiveProps = nextProps => {
        if (nextProps.bannerFeed) {
            this.setState({
                loading: false
            });
        }
    };
    render() {
        const { bannerFeed } = this.props;
        return <BannerFeed {...this.state} bannerFeed={bannerFeed} />;
    }
}

export default Container;
