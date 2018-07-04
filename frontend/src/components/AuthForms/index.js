import React from "react";
import styles from "./styles.scss";

export const LoginForm = props => (
  <div>
    <form>
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <input type="submit" value="로그인" />
    </form>
    <span>또는</span>
    <span>페이스북으로 로그인</span>
    <span>비밀번호 찾기</span>
  </div>
);

export const SignupForm = props => (
  <div>
    <h3>wecode의 세계로 초대합니다</h3>
    <button>페이스북으로 로그인</button>
    <span>또는</span>
    <form>
      <input type="email" placeholder="이메일" />
      <input type="text" placeholder="이름" />
      <input type="username" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <input type="submit" placeholder="회원가입" />
    </form>
    <p>
        회원가입을 통해 <span>개인정보정책과 이용약관</span>에 동의합니다.
    </p>
  </div>
);
