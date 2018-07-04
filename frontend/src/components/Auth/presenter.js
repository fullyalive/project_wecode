import React from "react";
import styles from "./styles.scss";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.row}>
      <img
        className={styles.logoImg}
        src={require("images/logo.png")}
        alt="wecode"
      />
    </div>
    <div className={styles.row}>
      <div className={styles.whiteBox}>
        {(() => {
          switch (props.action) {
            case "login":
              return (
                <p>
                  아직 회원이 아니신가요?{" "}
                  <span
                    onClick={props.changeAction}
                    className={styles.changeLink}
                  >
                    회원가입
                  </span>
                </p>
              );
            case "signup":
              return (
                <p>
                  회원이신가요?{" "}
                  <span
                    onClick={props.changeAction}
                    className={styles.changeLink}
                  >
                    로그인
                  </span>
                </p>
              );
            default:
              null;
          }
        })()}
      </div>
      {/* <div className={styles.appBox}>
        <span>Get the app</span>
        <div className={styles.appstores}>
          <img src={require("images/ios.png")} alt="" />
          <img src={require("images/ios.png")} alt="" />
        </div>
      </div> */}
    </div>
  </main>
);

export default Auth;
