import React from "react";
import styles from "./styles.scss";
const UserProfileChangeForm = props => (
  <div className={styles.formComponent}>
    <span> 상세 정보 변경 </span>
    <form onSubmit={props.handleSubmit}>
      닉네임 :{" "}
      <input
        type="text"
        className={styles.textInput}
        placeholder={"닉네임을 입력해주세요."}
        value={props.name}
        onChange={props.handleInputChange}
        name="name"
      />
      <br />
      자기소개 :{" "}
      <input
        type="text"
        placeholder={"자기소개 해주세요."}
        className={styles.textInput}
        value={props.bio}
        onChange={props.handleInputChange}
        name="bio"
      />
      <br />
      phone :{" "}
      <input
        type="tel"
        placeholder={"번호를 입력해주세요."}
        className={styles.textInput}
        value={props.phone}
        onChange={props.handleInputChange}
        name="phone"
      />
      <br />
      사이트 :{" "}
      <input
        type="url"
        placeholder={"github 주소를 입력해주세요."}
        className={styles.textInput}
        value={props.website}
        onChange={props.handleInputChange}
        name="website"
      />
      <br />
      <input
        type="submit"
        value={"상세 정보 변경하기"}
        className={styles.button}
        onChange={props.handleSubmit}
      />
      <br />
    </form>
  </div>
);
export default UserProfileChangeForm;
