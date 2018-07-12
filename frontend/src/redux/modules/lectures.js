// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";

// action creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function doLikeLecture(lectureId) {
  return {
    type: LIKE_PHOTO,
    lectureId
  };
}

function doUnlikeLecture(lectureId) {
  return {
    type: UNLIKE_PHOTO,
    lectureId
  };
}

// api actions

function getFeed() {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    console.log(isLoggedIn);
    fetch("/lectures/", {
      headers: {
        Authorization: isLoggedIn ? `JWT ${token}` : null
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setFeed(json));
      });
  };
}

function likeLecture(lectureId) {
  return (dispatch, getState) => {
    dispatch(doLikeLecture(lectureId));
    const {
      user: { token, isLoggedIn }
    } = getState();

    // 후에 수정 - 비로그인 유저가 라이크 누르면 로그인 페이지로 가도록
    fetch(isLoggedIn ? `/lectures/${lectureId}/likes/` : `/login/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doUnlikeLecture(lectureId));
      }
    });
  };
}

function unlikeLecture(lectureId) {
  return (dispatch, getState) => {
    dispatch(doUnlikeLecture(lectureId));
    const {
      user: { token }
    } = getState();
    fetch(`/lectures/${lectureId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doLikeLecture(lectureId));
      }
    });
  };
}

function commentLecture(lectureId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/lectures/${lectureId}/comments/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "applications/json"
      },
      body: JSON.stringify({
        message
      })
    });
  };
}
// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case LIKE_PHOTO:
      return applyLikeLecture(state, action);
    case UNLIKE_PHOTO:
      return applyUnlikeLecture(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

//Authorization: (isLoggedIn)?`JWT ${token}`:null
function applyLikeLecture(state, action) {
  const { lectureId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if (photo.id === lectureId) {
      return { ...photo, is_liked: true, like_count: photo.like_count + 1 };
    }
    return photo;
  });
  return { ...state, feed: updatedFeed };
}

function applyUnlikeLecture(state, action) {
  const { lectureId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if (photo.id === lectureId) {
      return { ...photo, is_liked: false, like_count: photo.like_count - 1 };
    }
    return photo;
  });
  return { ...state, feed: updatedFeed };
}

const actionCreators = {
  getFeed,
  likeLecture,
  unlikeLecture,
  commentLecture
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
