import React, { Component } from "react";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import "./styles.css";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";
// import {Link} from 'react-router-dom';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, loading: true };
  }
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
  onExiting = ()=> {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.bannerFeed.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.bannerFeed.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { bannerFeed } = this.props;
    const { activeIndex, loading } = this.state;
    let items = null
    let slides =null
    if (!loading){
      items = bannerFeed.map(banner => {
        return { src: banner.id };
      });
      slides = bannerFeed.map(item => {
        return (
          <CarouselItem
            className="custom-tag"
            tag="div"
            key={item.id}
            onExiting={this.onExiting}
            onExited={this.onExited}
            cssModule={Bootstrap}
          >
            <div
              className={styles.banner}
              style={{ backgroundImage: `url(${item.bannerImage})` }}
            >
              <div className={styles.meta}>
                <span className={styles.bannerTitle}>{item.title}</span>
                <span
                  className={styles.bannerSub}
                  dangerouslySetInnerHTML={{ __html: item.short_description }}
                />
                {/* <Link className={styles.moveButton} to={(item.url===null)?'/':item.url}>
                보러가기
              </Link> */}
                <a
                  className={styles.moveButton}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>보러가기</span>
                </a>
              </div>
              <div className={styles.profile}>
                <img
                  src={
                    item.creator.profile_image || require("images/noPhoto.jpg")
                  }
                  alt={item.creator.username}
                  className={styles.profileImage}
                />
                <div className={styles.profileText}>
                  <span className={styles.creator}>{item.creator.username}</span>
                  <span className={styles.divider}> / </span>
                  <span className={styles.location}>{item.location}</span>
                </div>
                <span className={styles.price}>
                  {item.comma_price === "0" ? "" : item.comma_price + "원"}
                </span>
              </div>
            </div>
          </CarouselItem>
        );
      });
    }
    

    return (
  
      <div>
        <style>
          {`.custom-tag {
                max-width: 100%;
                height: 350px;
                background: skyblue};
              }`}
        </style>
        {!loading && (
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
            cssModule={Bootstrap}
          >
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={this.goToIndex}
              cssModule={Bootstrap}
            />
            {slides}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={this.previous}
              cssModule={Bootstrap}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={this.next}
              cssModule={Bootstrap}
            />
          </Carousel>
        )}
        
      </div>
    );
  }
}

export default Banner;
