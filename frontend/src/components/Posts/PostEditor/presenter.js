import React, { Component } from "react";
import RichTextEditor from "react-rte";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      type: "Q&A",
      value: RichTextEditor.createEmptyValue()
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {}
  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleTypeChange(event) {
    this.setState({ type: event.target.value });
  }

  handleSubmit(event) {
    const { title, type, value } = this.state;
    const { createPost, goToBack } = this.props;
    var post_type = null;
    if (type === "Q&A") {
      post_type = "qna";
    } else if (type === "자유게시판") {
      post_type = "free";
    }
    // createPost(title, post_type, value.toString('html'));
    goToBack();
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
        {console.log(this.props)}
        <Form>
          <FormGroup cssModule={Bootstrap}>
            <Label cssModule={Bootstrap} for="title">
              제목
            </Label>
            <Input
              cssModule={Bootstrap}
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </FormGroup>
          <FormGroup cssModule={Bootstrap}>
            <Label for="exampleSelect" cssModule={Bootstrap}>
              Select
            </Label>
            <Input
              type="select"
              name="select"
              id="typeSelect"
              value={this.state.type}
              onChange={this.handleTypeChange}
              cssModule={Bootstrap}
            >
              <option>Q&amp;A</option>
              <option>자유게시판</option>
            </Input>
          </FormGroup>
          <RichTextEditor
            toolbarConfig={toolbarConfig}
            value={this.state.value}
            onChange={this.onChange}
          />
          <Button onClick={this.handleSubmit}>등록</Button>
        </Form>
        {/* {console.log(this.state.value.toString('html'))} */}
      </div>
    );
  }
}
export default PostEditor;
