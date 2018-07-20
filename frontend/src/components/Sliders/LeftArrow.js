import React, { Component } from "react";

const LeftArrow = props => {
  return (
    <div onClick={props.previousSlide} className="prevArrow">
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
    </div>
  );
};

export default LeftArrow;
