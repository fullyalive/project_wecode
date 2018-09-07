import React, { Component } from "react";
import styles from "./styles.scss";
export default class PasswordResetForm extends Component {
  state = {
    currentEmail: "",
    status: ""
  };
  handleSummit = () => {
    const statusArray = {
      404: "등록되지 않은 이메일입니다.",
      200: "가입한 이메일로 임시 비밀번호를 발송하였습니다.",
      etc: "이메일 발송에 실패하였습니다. 다시 한 번 확인해 주세요."
    };
    const email = this.state.currentEmail;
    return fetch("/api/password/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    }).then(response => {
      if (response.status === 404) {
        this.setState({
          currentEmail: "",
          status: statusArray[404]
        });
      } else if (response.ok) {
        this.setState({
          currentEmail: "",
          status: statusArray[200]
        });
      } else {
        this.setState({
          currentEmail: "",
          status: statusArray["etc"]
        });
      }
    });
  };
  handleInputChange = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className={styles.formComponent}>
        <form className={styles.form}>
          <img
            src={require("images/logo.png")}
            alt="wecode"
            className={styles.logo}
          />
          <span className={styles.noticeInfo}>
            이메일을 입력해주세요. 임시 비밀번호를 보내드립니다.
          </span>
          <input
            type="email"
            placeholder={"가입할 때 사용한 이메일을 입력해주세요"}
            className={styles.textInput}
            value={this.state.currentEmail}
            onChange={this.handleInputChange}
            name="currentEmail"
          />
          <button className={styles.sendButton} onClick={this.handleSummit}>
            보내기
          </button>
        </form>
        <span>{this.state.status}</span>
      </div>
    );
  }
}
