import React, { Component } from "react";
import RichTextEditor from "react-rte";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
import { Form, FormGroup, Input } from "reactstrap";
import styles from "./styles.scss";

class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      type: "free",
      value: RichTextEditor.createEmptyValue(),
      onEditBlur: this.onEditBlur
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  // handleBlur(editorValue) {
  //   console.log("BLUR | EditorValue: " + editorValue);
  // }

  handleSubmit(event) {
    const { title, type, value } = this.state;
    const { createPost } = this.props;
    var post_type = null;
    if (type === "Q&A") {
      post_type = "qna";
    } else if (type === "익명게시판") {
      post_type = "free";
    } else if (type === "문의사항") {
      post_type = "ask";
    }
    createPost(title, post_type, value.toString('html'));
    event.preventDefault();
  }

  onChange = value => {
    this.setState({ value });
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      value.toString("html");
    }
  };

  render() {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: [
        "INLINE_STYLE_BUTTONS",
        "BLOCK_TYPE_BUTTONS",
        "LINK_BUTTONS",
        "BLOCK_TYPE_DROPDOWN",
        "HISTORY_BUTTONS"
      ],
      INLINE_STYLE_BUTTONS: [
        { label: "Bold", style: "BOLD", className: "custom-css-class" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: "Normal", style: "unstyled" },
        { label: "Heading Large", style: "header-one" },
        { label: "Heading Medium", style: "header-two" },
        { label: "Heading Small", style: "header-three" }
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: "UL", style: "unordered-list-item" },
        { label: "OL", style: "ordered-list-item" }
      ]
    };
    return (
      <div>
        <Form className={styles.container}>
          <div className={styles.formHeader}>
            <FormGroup cssModule={Bootstrap} className={styles.category}>
              <Input
                type="select"
                name="select"
                id="typeSelect"
                value={this.state.type}
                onChange={this.handleTypeChange}
                cssModule={Bootstrap}
              >
                <option className={styles.option}>익명게시판</option>
                <option className={styles.option}>Q&amp;A</option>
                <option className={styles.option}>문의사항</option>
              </Input>
            </FormGroup>
            <FormGroup cssModule={Bootstrap} className={styles.title}>
              <Input
                cssModule={Bootstrap}
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
                placeholder={"제목"}
                autoFocus={true}
              />
            </FormGroup>
          </div>
          <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
            className={styles.textEditor}
          />
          <div className={styles.formFooter}>
            <span onClick={this.handleSubmit} className={styles.submitButton}>
              등록
            </span>
          </div>
        </Form>
      </div>
    );
  }
}
export default PostEditor;
