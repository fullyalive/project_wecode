import React, { Component } from "react";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import styles from "./styles.scss";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.props.bannerFeed.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.props.bannerFeed.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { bannerFeed } = this.props;
    const { activeIndex } = this.state;
    const items = bannerFeed.map(banner => {
      return { src: banner.id };
    });

    const slides = bannerFeed.map(item => {
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
              <span className={styles.moveButton}>보러가기</span>
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
              <span className={styles.price}>120,000</span>
            </div>
          </div>
        </CarouselItem>
      );
    });

    return (
      <div>
        <style>
          {`.custom-tag {
                max-width: 100%;
                height: 350px;
                background: skyblue};
              }`}
        </style>
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
      </div>
    );
  }
}

export default Banner;
