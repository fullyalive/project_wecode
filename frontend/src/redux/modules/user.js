// imports

import { push } from "react-router-redux";
import { post } from "axios";

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SAVE_USER_INFO = "SAVE_USER_INFO";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
const CHANGE_USER_PHOTO = "CHANGE_USER_PHOTO";
const LOGOUT = "LOGOUT";

// action creators

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

function saveUserInfo(userInfo) {
  return {
    type: SAVE_USER_INFO,
    userInfo
  };
}

function changeUserPassword() {
  return {
    type: CHANGE_PASSWORD
  };
}

function changeUserPhoto(photo) {
  return {
    type: CHANGE_USER_PHOTO,
    photo
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

// API actions

function facebookLogin(access_token) {
  return dispatch => {
    ("/api/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
          dispatch(getUserInfo());
          dispatch(push("/"));
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return dispatch => {
    ("/api/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => {
        if (response.status === 400) {
          alert("이메일 또는 비밀번호를 확인해주세요 :)");
        }
        return response.json();
      })
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
          dispatch(getUserInfo());
          dispatch(push("/"));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, password, email, name) {
  return dispatch => {
    ("/api/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email,
        name
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
          dispatch(getUserInfo());
          dispatch(push("/"));
        }
      })
      .catch(err => console.log(err));
  };
}

function getUserInfo() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch("/api/users/profile/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(saveUserInfo(json));
      });
  };
}

function updateUserPassword(username, currentpassword, newpassword) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    (`/api/users/${username}/password/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        current_password: currentpassword,
        new_password: newpassword
      })
    })
      .then(response => {
        if (response.status === 200) {
          dispatch(changeUserPassword());
          dispatch(push("/"));
          alert("변경성공! 다시 로그인해주세요 :)");
        } else if (response.status === 400) {
          alert("현재 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch(err => console.log(err));
  };
}

function updateUserPhoto(photo) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    const url = "/api/users/updatephoto/";
    const formData = new FormData();
    formData.append("profile_image", photo);
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "multipart/form-data"
      }
    };
    post(url, formData, config)
      .then(response => {
        if (response.status === 201) {
          dispatch(changeUserPhoto(photo));
          dispatch(push("/mypage/"));
        }
      })
      .catch(err => console.log(err));
  };
}

// initial state

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  username: localStorage.getItem("username")
};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case SAVE_USER_INFO:
      return applySetUserInfo(state, action);
    case CHANGE_PASSWORD:
      return applyChangeUserPassword(state, action);
    case CHANGE_USER_PHOTO:
      return applyChangeUserPhoto(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applySetUserInfo(state, action) {
  const { userInfo } = action;
  localStorage.setItem("username", userInfo.username);
  return {
    ...state,
    userInfo,
    username: userInfo.username
  };
}

function applyChangeUserPassword(state, action) {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  return {
    ...state,
    isLoggedIn: false,
    token: null,
    username: null
  };
}

function applyChangeUserPhoto(state, action) {
  // const { userPhoto } = action;
  const { userInfo } = state;

  return {
    ...state,
    userInfo: {
      ...userInfo
      // profile_image : reader.result
    }
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  return {
    ...state,
    isLoggedIn: false,
    token: null,
    username: null
  };
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  getUserInfo,
  updateUserPassword,
  updateUserPhoto,
  logout
};

export { actionCreators };

// export reducer by default

export default reducer;
