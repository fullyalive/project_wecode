// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_LECTURE_FEED = "SET_LECTURE_FEED";
const SET_LECTURE_DETAIL = "SET_LECTURE_DETAIL";
const SET_LECTURE_LIST = "SET_LECTURE_LIST";
const LIKE_LECTURE = "LIKE_LECTURE";
const UNLIKE_LECTURE = "UNLIKE_LECTURE";
const ADD_LECTURE_COMMENT = "ADD_LECTURE_COMMENT";
const UPDATE_LECTURE_COMMENT = "UPDATE_LECTURE_COMMENT";
const DELETE_LECTURE_COMMENT = "DELETE_LECTURE_COMMENT";
const ADD_LECTURE_RECOMMENT = "ADD_LECTURE_RECOMMENT";
const UPDATE_LECTURE_RECOMMENT = "UPDATE_LECTURE_RECOMMENT";
const DELETE_LECTURE_RECOMMENT = "DELETE_LECTURE_RECOMMENT";

// action creators

function setLectureFeed(lectureFeed) {
  return {
    type: SET_LECTURE_FEED,
    lectureFeed
  };
}

function setLectureDetail(lectureDetail) {
  return {
    type: SET_LECTURE_DETAIL,
    lectureDetail
  };
}

function setLectureList(lectureList) {
  return {
    type: SET_LECTURE_LIST,
    lectureList
  };
}

function doLikeLecture(lectureId, isFeed) {
  return {
    type: LIKE_LECTURE,
    lectureId,
    isFeed
  };
}

function doUnlikeLecture(lectureId, isFeed) {
  return {
    type: UNLIKE_LECTURE,
    lectureId,
    isFeed
  };
}

function addLectureComment(lectureId, comment) {
  return {
    type: ADD_LECTURE_COMMENT,
    lectureId,
    comment
  };
}

function updateLectureComment(lectureId, commentId, comment) {
  return {
    type: UPDATE_LECTURE_COMMENT,
    lectureId,
    commentId,
    comment
  };
}

function deleteLectureComment(lectureId, commentId) {
  return {
    type: DELETE_LECTURE_COMMENT,
    lectureId,
    commentId
  };
}

function addLectureRecomment(lectureId, commentId, recomment) {
  return {
    type: ADD_LECTURE_RECOMMENT,
    lectureId,
    commentId,
    recomment
  };
}

function updateLectureRecomment(lectureId, commentId, recommentId, recomment) {
  return {
    type: UPDATE_LECTURE_RECOMMENT,
    lectureId,
    commentId,
    recommentId,
    recomment
  };
}

function deleteLectureRecomment(lectureId, commentId, recommentId) {
  return {
    type: DELETE_LECTURE_RECOMMENT,
    lectureId,
    commentId,
    recommentId
  };
}
// API actions

function getLectureFeed() {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch("/api/lectures/", {
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
  return dispatch => {
    fetch(`/api/lectures/${lectureId}`, { method: "GET" })
      .then(response => {
        return response.json();
      })
      .then(json => {
        dispatch(setLectureDetail(json));
      });
  };
}

function likeLecture(lectureId, isFeed) {
  return (dispatch, getState) => {
    dispatch(doLikeLecture(lectureId, isFeed));
    const {
      user: { token, isLoggedIn }
    } = getState();
    // 후에 수정 - 비로그인 유저가 라이크 누르면 로그인 페이지로 가도록
    fetch(isLoggedIn ? `/api/lectures/${lectureId}/likes/` : null, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doUnlikeLecture(lectureId, isFeed));
      }
    });
  };
}

function unlikeLecture(lectureId, isFeed) {
  return (dispatch, getState) => {
    dispatch(doUnlikeLecture(lectureId, isFeed));
    const {
      user: { token }
    } = getState();
    fetch(`/api/lectures/${lectureId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doLikeLecture(lectureId, isFeed));
      }
    });
  };
}

function commentLecture(lectureId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/api/lectures/${lectureId}/comments/`, {
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
          dispatch(addLectureComment(lectureId, json));
        }
      });
  };
}

function updateCommentLecture(lectureId, commentId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/api/lectures/${lectureId}/comments/${commentId}/`, {
      method: "PUT",
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
          dispatch(updateLectureComment(lectureId, commentId, json));
        }
      });
  };
}

function deleteCommentLecture(lectureId, commentId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/api/lectures/${lectureId}/comments/${commentId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.status === 204) {
        dispatch(deleteLectureComment(lectureId, commentId));
      }
    });
  };
}

function recommentLecture(lectureId, commentId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/api/lectures/${lectureId}/comments/${commentId}/recomments/`, {
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
          dispatch(addLectureRecomment(lectureId, commentId, json));
        }
      });
  };
}

function updateRecommentLecture(lectureId, commentId, recommentId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(
      `/api/lectures/${lectureId}/comments/${commentId}/recomments/${recommentId}/`,
      {
        method: "PUT",
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
          dispatch(
            updateLectureRecomment(lectureId, commentId, recommentId, json)
          );
        }
      });
  };
}

function deleteRecommentLecture(lectureId, commentId, recommentId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(
      `/api/lectures/${lectureId}/comments/${commentId}/recomments/${recommentId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${token}`
        }
      }
    ).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.status === 204) {
        dispatch(deleteLectureRecomment(lectureId, commentId, recommentId));
      }
    });
  };
}

function searchByTerm(searchTerm) {
  return async (dispatch, getState) => {
    const lectureList = await searchLectures(searchTerm);
    dispatch(setLectureList(lectureList));
  };
}

function searchLectures(searchTerm) {
  return fetch(
    `/api/lectures/search/?title=${searchTerm}&&creator=${searchTerm}`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json);
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LECTURE_FEED:
      return applySetLectureFeed(state, action);
    case SET_LECTURE_DETAIL:
      return applySetLectureDetail(state, action);
    case SET_LECTURE_LIST:
      return applySetLectureList(state, action);
    case LIKE_LECTURE:
      return applyLikeLecture(state, action);
    case UNLIKE_LECTURE:
      return applyUnlikeLecture(state, action);
    case ADD_LECTURE_COMMENT:
      return applyAddLectureComment(state, action);
    case UPDATE_LECTURE_COMMENT:
      return applyUpdateLectureComment(state, action);
    case DELETE_LECTURE_COMMENT:
      return applyDeleteLectureComment(state, action);
    case ADD_LECTURE_RECOMMENT:
      return applyAddLectureRecomment(state, action);
    case UPDATE_LECTURE_RECOMMENT:
      return applyUpdateLectureRecomment(state, action);
    case DELETE_LECTURE_RECOMMENT:
      return applyDeleteLectureRecomment(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetLectureFeed(state, action) {
  const { count, next, previous, results } = action.lectureFeed;
  return {
    ...state,
    count,
    next,
    previous,
    lectureFeed: results
  };
}

function applySetLectureDetail(state, action) {
  const { lectureDetail } = action;
  return {
    ...state,
    lectureDetail
  };
}

function applySetLectureList(state, action) {
  const { lectureList } = action;
  return {
    ...state,
    lectureList
  };
}

//Authorization: (isLoggedIn)?`JWT ${token}`:null
function applyLikeLecture(state, action) {
  const { lectureId, isFeed } = action;
  if (isFeed) {
    const { lectureFeed } = state;
    const updatedLectureFeed = lectureFeed.map(lecture => {
      if (lecture.id === lectureId) {
        return {
          ...lecture,
          is_liked: true,
          like_count: lecture.like_count + 1
        };
      }
      return lecture;
    });
    return { ...state, lectureFeed: updatedLectureFeed };
  } else {
    const { lectureDetail } = state;
    const updatedLectureDetail = {
      ...lectureDetail,
      like_count: lectureDetail.like_count + 1,
      is_liked: true
    };
    return { ...state, lectureDetail: updatedLectureDetail };
  }
}

function applyUnlikeLecture(state, action) {
  const { lectureId, isFeed } = action;
  if (isFeed) {
    const { lectureFeed } = state;
    const updatedLectureFeed = lectureFeed.map(lecture => {
      if (lecture.id === lectureId) {
        return {
          ...lecture,
          is_liked: false,
          like_count: lecture.like_count - 1
        };
      }
      return lecture;
    });
    return { ...state, lectureFeed: updatedLectureFeed };
  } else {
    const { lectureDetail } = state;
    const updatedLectureDetail = {
      ...lectureDetail,
      like_count: lectureDetail.like_count - 1,
      is_liked: false
    };
    return { ...state, lectureDetail: updatedLectureDetail };
  }
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

function applyUpdateLectureComment(state, action) {
  const { comment } = action;
  const { lectureDetail } = state;
  const updateLectureDetail = {
    ...lectureDetail,
    lecture_comments: lectureDetail.lecture_comments.map(find_comment => {
      if (find_comment.id === comment.id) {
        return {
          ...find_comment,
          message: comment.message
        };
      }
      return find_comment;
    })
  };
  return {
    ...state,
    lectureDetail: updateLectureDetail
  };
}

function applyDeleteLectureComment(state, action) {
  const { commentId } = action;
  const { lectureDetail } = state;
  const updateLectureDetail = {
    ...lectureDetail,
    lecture_comments: lectureDetail.lecture_comments.map(find_comment => {
      if (find_comment.id === commentId) {
        return {
          ...find_comment,
          message: "삭제된 댓글입니다."
        };
      }
      return find_comment;
    })
  };
  return {
    ...state,
    lectureDetail: updateLectureDetail
  };
}

function applyAddLectureRecomment(state, action) {
  const { recomment } = action;
  const { lectureDetail } = state;
  const find_prevcomment_index = lectureDetail.lecture_comments.findIndex(
    comment => {
      return comment.groupNumber > recomment.groupNumber;
    }
  );
  if (find_prevcomment_index === -1) {
    return {
      ...state,
      lectureDetail: {
        ...lectureDetail,
        lecture_comments: [...lectureDetail.lecture_comments, recomment]
      }
    };
  } else {
    const prev_comments = lectureDetail.lecture_comments.slice(
      0,
      find_prevcomment_index
    );
    prev_comments.push(recomment);
    const next_comments = lectureDetail.lecture_comments.slice(
      find_prevcomment_index
    );
    const update_comments = prev_comments.concat(next_comments);
    return {
      ...state,
      lectureDetail: {
        ...lectureDetail,
        lecture_comments: update_comments
      }
    };
  }
}

function applyUpdateLectureRecomment(state, action) {
  const { recomment } = action;
  const { lectureDetail } = state;
  const updateLectureDetail = {
    ...lectureDetail,
    lecture_comments: lectureDetail.lecture_comments.map(find_comment => {
      if (find_comment.id === recomment.id) {
        return {
          ...find_comment,
          message: recomment.message
        };
      }
      return find_comment;
    })
  };
  return {
    ...state,
    lectureDetail: updateLectureDetail
  };
}

function applyDeleteLectureRecomment(state, action) {
  const { recommentId } = action;
  const { lectureDetail } = state;
  const updateLectureDetail = {
    ...lectureDetail,
    lecture_comments: lectureDetail.lecture_comments.filter(
      comment => comment.id !== recommentId
    )
  };
  return {
    ...state,
    lectureDetail: updateLectureDetail
  };
}

const actionCreators = {
  getLectureFeed,
  getLectureDetail,
  likeLecture,
  unlikeLecture,
  commentLecture,
  updateCommentLecture,
  deleteCommentLecture,
  recommentLecture,
  updateRecommentLecture,
  deleteRecommentLecture,
  searchByTerm
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
