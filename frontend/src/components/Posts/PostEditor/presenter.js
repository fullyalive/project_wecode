import React, { Component } from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "react-summernote/lang/summernote-ko-KR"; // you can import any other locale
// Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import Bootstrap from "bootstrap/scss/bootstrap.scss";
import { Form, FormGroup, Input } from "reactstrap";
import styles from "./styles.scss";

class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      type: "qna",
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

  // handleBlur(editorValue) {
  //   console.log("BLUR | EditorValue: " + editorValue);
  // }

  handleSubmit(event) {
    const { title, type, value } = this.state;
    const { createPost } = this.props;
    var post_type = null;
    if (type === "질문하기") {
      post_type = "qna";
    } else if (type === "문의사항") {
      post_type = "ask";
    }
    createPost(title, post_type, value);
    event.preventDefault();
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
                <option className={styles.option}>질문하기</option>
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
