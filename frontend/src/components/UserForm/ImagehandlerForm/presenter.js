import React from "react";
import styles from "./styles.scss";

const ImageHandlerForm = props => (
  <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img
        src={props.userInfo.profile_image}
        alt={props.userInfo.bio}
        className={styles.profileImage}
      />
    </div>
    <div className={styles.formContainer}>
      <form onSubmit={props.onFormSubmit} className={styles.formButton}>
        <input
          id="file-upload"
          type="file"
          onChange={props.onChange}
          className={styles.fileUpload}
        />
        <label for="file-upload" className={styles.label}>
          이미지 선택
        </label>
      </form>
      <form onSubmit={props.onFormSubmit} className={styles.formButton}>
        <button type="submit" className={styles.submitButton}>
          변경하기
        </button>
      </form>
    </div>
  </div>
);

export default ImageHandlerForm;
