import React from "react";
import styles from "./styles.scss";
const UserProfileChangeForm = props => (
  <div className={styles.formComponent}>
    <span className={styles.formTitle}> 상세 정보 변경 </span>
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <div className={styles.inputItems}>
        <div className={styles.inputItem}>
          <span className={styles.infoCategory}>닉네임</span>
          <input
            type="text"
            className={styles.textInput}
            placeholder={"닉네임을 입력해주세요."}
            value={props.name}
            onChange={props.handleInputChange}
            name="name"
          />
        </div>
        <div className={styles.inputItem}>
          <span className={styles.infoCategory}>자기소개</span>
          <input
            type="text"
            placeholder={"프로필과 함께 노출되는 한 마디입니다."}
            className={styles.textInput}
            value={props.bio}
            onChange={props.handleInputChange}
            name="bio"
          />
        </div>
        <div className={styles.inputItem}>
          <span className={styles.infoCategory}>사이트</span>
          <input
            type="url"
            placeholder={"github 또는 블로그 주소를 입력해주세요."}
            className={styles.textInput}
            value={props.website}
            onChange={props.handleInputChange}
            name="website"
          />
        </div>
        <input
          type="submit"
          value={"상세 정보 변경하기"}
          className={styles.button}
          onChange={props.handleSubmit}
        />
        {/* <input
          type="tel"
          placeholder={"번호를 입력해주세요."}
          className={styles.textInput}
          value={props.phone}
          onChange={props.handleInputChange}
          name="phone"
        /> */}
      </div>
    </form>
  </div>
);
export default UserProfileChangeForm;
