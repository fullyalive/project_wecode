// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_FEED = "SET_FEED";
const LIKE_LECTURE = "LIKE_LECTURE";
const UNLIKE_LECTURE = "UNLIKE_LECTURE";
const ADD_COMMENT = "ADD_COMMENT";

// action creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function doLikeLecture(lectureId) {
  return {
    type: LIKE_LECTURE,
    lectureId
  };
}

function doUnlikeLecture(lectureId) {
  return {
    type: UNLIKE_LECTURE,
    lectureId
  };
}

function addComment(lectureId, comment) {
  return {
    type: ADD_COMMENT,
    lectureId,
    comment
  };
}

// API actions

function getLectureFeed() {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
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
    fetch(isLoggedIn ? `/lectures/${lectureId}/likes/` : null, {
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
    // fetch(
    //   isLoggedIn ? `/lectures/${lectureId}/comments/` : `/rest-auth/login/`,
    //   {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message
        })
      }
    )
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        if (json.message) {
          dispatch(addComment(lectureId, json));
        }
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
    case LIKE_LECTURE:
      return applyLikeLecture(state, action);
    case UNLIKE_LECTURE:
      return applyUnlikeLecture(state, action);
    case ADD_COMMENT:
      return applyAddComment(state, action);
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
  const updatedFeed = feed.map(lecture => {
    if (lecture.id === lectureId) {
      return { ...lecture, is_liked: true, like_count: lecture.like_count + 1 };
    }
    return lecture;
  });
  return { ...state, feed: updatedFeed };
}

function applyUnlikeLecture(state, action) {
  const { lectureId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(lecture => {
    if (lecture.id === lectureId) {
      return {
        ...lecture,
        is_liked: false,
        like_count: lecture.like_count - 1
      };
    }
    return lecture;
  });
  return { ...state, feed: updatedFeed };
}

function applyAddComment(state, action) {
  const { lectureId, comment } = action;
  const { feed } = state;
  const updatedFeed = feed.map(lecture => {
    if (lecture.id === lectureId) {
      return {
        ...lecture,
        lecture_comments: [...lecture.lecture_comments, comment]
      };
    }
    return lecture;
  });
  return { ...state, feed: updatedFeed };
}

const actionCreators = {
  getLectureFeed,
  likeLecture,
  unlikeLecture,
  commentLecture
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
