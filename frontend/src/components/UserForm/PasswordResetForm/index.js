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
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className={styles.formComponent}>
        <form className={styles.form}>
          <input
            type="email"
            placeholder={"이메일"}
            className={styles.textInput}
            value={this.state.currentEmail}
            onChange={this.handleInputChange}
            name="currentEmail"
          />
        </form>
        <button onClick={this.handleSummit}>보내기</button>
        <span>{this.state.status}</span>
      </div>
    );
  }
}
