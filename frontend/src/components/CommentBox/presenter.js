import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const CommentBox = (props, context) => (
    <form>
        <textarea placeholder={context.t("댓글을 입력하세요...")} />
    </form>
)

CommentBox.contextTypes = {
    t: PropTypes.func.isRequired
}

export default CommentBox;