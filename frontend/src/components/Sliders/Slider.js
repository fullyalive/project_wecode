import React, { Componetn } from "react";
import SlideOne from "./SliderOne";
import SlideTwo from "./SliderTwo";
import SlideThree from "./SliderThree";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

class Slider extends Componetn {
  constructor(props) {
    super(props);

    this.state = {
      slideCount: 1
    };

    this.previousSlide = this.previousSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  render() {
    return (
      <div className="slider">
        {/* Slides go here */}
        {this.state.slideCount === 1 ? <SlideOne /> : null}
        {this.state.slideCount === 2 ? <SlideTwo /> : null}
        {this.state.slideCount === 3 ? <SlideThree /> : null}

        {/* Arrow Functionality */}
        <LeftArrow previousSlide={this.previousSlide} />
        <RightArrow nextSlide={this.nextSlide} />
      </div>
    );
  }

  previousSlide() {
    this.setState({ slideCount: this.state.slideCount - 1 });
  }
  nextSlide() {
    this.setSTate({ slideCount: this.state.slideCount + 1 });
  }
}

export default Slider;
