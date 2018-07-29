// imports
import { push } from "react-router-redux";
// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SAVE_USER_INFO = "SAVE_USER_INFO";
const CHANGE_PASSWORD = "CHANGE_PASSWORD";
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

function doChangePassword() {
  return {
    type: CHANGE_PASSWORD
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
    fetch("/users/login/facebook/", {
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
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
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

function createAccount(username, password, email, name) {
  return dispatch => {
    fetch("/rest-auth/registration/", {
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
    fetch("/users/profile/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
          dispatch(push("/"));
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        dispatch(saveUserInfo(json));
      });
  };
}

function changePassword(username, currentpassword, newpassword) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/users/${username}/password/`, {
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
          dispatch(logout());
          dispatch(doChangePassword());
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
      return applyChangePassword(state, action);
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
    userInfo
  };
}

function applyChangePassword() {
  return null;
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  return {
    isLoggedIn: false
  };
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  getUserInfo,
  changePassword,
  logout
};

export { actionCreators };

// export reducer by default

export default reducer;
