import React from "react";
import PropTypes from "prop-types";

const TimeStamp = (props, context) => props.time;

TimeStamp.propTypes = {
    time: PropTypes.string.isRequired
}

TimeStamp.contextTypes = {
    t: PropTypes.func.isRequired
}

export default TimeStamp;