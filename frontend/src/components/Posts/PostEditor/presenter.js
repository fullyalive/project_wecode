import React, { Component } from "react";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
import { Form, FormGroup, Input } from "reactstrap";
import postStyles from "shared/postStyles.scss";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import postStyles
import "react-summernote/lang/summernote-ko-KR"; // you can import any other locale
// Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/dist/css/bootstrap.css";

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "질문하기",
      value: "",
      onEditBlur: this.onEditBlur
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

  handleSubmit(event) {
    const { title, type, value } = this.state;
    const { createPost } = this.props;
    let post_type = null;
    if (type === "질문하기") {
      post_type = "qna";
    } else if (type === "문의사항") {
      post_type = "ask";
    }
    createPost(title, post_type, value);
  }

  onChange(content) {
    this.setState({
      value: content
    });
  }

  onImageUpload = fileList => {
    const reader = new FileReader();
    reader.onloadend = () => {
      ReactSummernote.insertImage(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

  render() {
    return (
      <div>
        <Form className={postStyles.container}>
          <div className={postStyles.formHeader}>
            <FormGroup cssModule={Bootstrap} className={postStyles.category}>
              <Input
                type="select"
                name="select"
                id="typeSelect"
                value={this.state.type}
                onChange={this.handleTypeChange}
                cssModule={Bootstrap}
              >
                <option className={postStyles.option}>질문하기</option>
                <option className={postStyles.option}>문의사항</option>
              </Input>
            </FormGroup>
            <FormGroup cssModule={Bootstrap} className={postStyles.title}>
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
          <ReactSummernote
            value={this.state.value}
            options={{
              lang: "ko-KR",
              height: 350,
              dialogsInBody: true,
              toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["insert", ["link", "picture", "video"]]
              ]
            }}
            onChange={this.onChange}
            onImageUpload={this.onImageUpload}
          />
          <div className={postStyles.formFooter}>
            <span
              onClick={this.handleSubmit}
              className={postStyles.submitButton}
            >
              등록
            </span>
          </div>
        </Form>
      </div>
    );
  }
}
export default PostEditor;
