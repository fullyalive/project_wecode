// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_LECTUREFEED = "SET_LECTUREFEED";
const SET_LECTUREDETAIL = "SET_LECTUREDETAIL";
const LIKE_LECTURE = "LIKE_LECTURE";
const UNLIKE_LECTURE = "UNLIKE_LECTURE";
const ADD_LECTURECOMMENT = "ADD_LECTURECOMMENT";

// action creators

function setLectureFeed(lectureFeed) {
  return {
    type: SET_LECTUREFEED,
    lectureFeed
  };
}

function setLectureDetail(lectureDetail) {
  return {
    type: SET_LECTUREDETAIL,
    lectureDetail
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
    type: ADD_LECTURECOMMENT,
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
        dispatch(setLectureFeed(json));
      });
  };
}

function getLectureDetail(lectureId) {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch(`/lectures/${lectureId}`, {
      method: "GET",
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
        dispatch(setLectureDetail(json));
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
    })
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
    case SET_LECTUREFEED:
      return applySetLectureFeed(state, action);
    case SET_LECTUREDETAIL:
      return applySetLectureDetail(state, action);
    case LIKE_LECTURE:
      return applyLikeLecture(state, action);
    case UNLIKE_LECTURE:
      return applyUnlikeLecture(state, action);
    case ADD_LECTURECOMMENT:
      return applyAddLectureComment(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetLectureFeed(state, action) {
  const { lectureFeed } = action;
  return {
    ...state,
    lectureFeed
  };
}

function applySetLectureDetail(state, action) {
  const { lectureDetail } = action;
  return {
    ...state,
    lectureDetail
  };
}

//Authorization: (isLoggedIn)?`JWT ${token}`:null
function applyLikeLecture(state, action) {
  const { lectureId } = action;
  const { lectureFeed } = state;
  const updatedFeed = lectureFeed.map(lecture => {
    if (lecture.id === lectureId) {
      return { ...lecture, is_liked: true, like_count: lecture.like_count + 1 };
    }
    return lecture;
  });
  return { ...state, lectureFeed: updatedFeed };
}

function applyUnlikeLecture(state, action) {
  const { lectureId } = action;
  const { lectureFeed } = state;
  const updatedFeed = lectureFeed.map(lecture => {
    if (lecture.id === lectureId) {
      return {
        ...lecture,
        is_liked: false,
        like_count: lecture.like_count - 1
      };
    }
    return lecture;
  });
  return { ...state, lectureFeed: updatedFeed };
}

function applyAddLectureComment(state, action) {
  const { comment } = action;
  const { lectureDetail } = state;
  return {
    ...state,
    lectureDetail: {
      ...lectureDetail,
      lecture_comments: [...lectureDetail.lecture_comments, comment]
    }
  };
}

const actionCreators = {
  getLectureFeed,
  getLectureDetail,
  likeLecture,
  unlikeLecture,
  commentLecture
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
