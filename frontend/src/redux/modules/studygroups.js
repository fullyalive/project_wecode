// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_STUDY_FEED = "SET_STUDY_FEED";
const SET_STUDY_DETAIL = "SET_STUDY_DETAIL";
const LIKE_STUDY = "LIKE_STUDY";
const UNLIKE_STUDY = "UNLIKE_STUDY";
const ADD_STUDY_COMMENT = "ADD_STUDY_COMMENT";
const UPDATE_STUDY_COMMENT = "UPDATE_STUDY_COMMENT";
const DELETE_STUDY_COMMENT = "DELETE_STUDY_COMMENT";

// action creators

function setStudyFeed(studyFeed) {
  return {
    type: SET_STUDY_FEED,
    studyFeed
  };
}

function setStudyDetail(studyDetail) {
  return {
    type: SET_STUDY_DETAIL,
    studyDetail
  };
}

function doLikeStudy(studyId, isFeed) {
  return {
    type: LIKE_STUDY,
    studyId,
    isFeed
  };
}

function doUnLikeStudy(studyId, isFeed) {
  return {
    type: UNLIKE_STUDY,
    studyId,
    isFeed
  };
}

function addStudyComment(studyId, comment) {
  return {
    type: ADD_STUDY_COMMENT,
    studyId,
    comment
  };
}

function updateStudyComment(studyId, commentId, comment) {
  return {
    type: UPDATE_STUDY_COMMENT,
    studyId,
    commentId,
    comment
  };
}

function deleteStudyComment(studyId, commentId) {
  return {
    type: DELETE_STUDY_COMMENT,
    studyId,
    commentId
  };
}

// API actions

function getStudyFeed() {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch("/studygroups/", {
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
        dispatch(setStudyFeed(json));
      });
  };
}

function getStudyDetail(studyId) {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch(`/studygroups/${studyId}`, {
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
        dispatch(setStudyDetail(json));
      });
  };
}

function likeStudy(studyId, isFeed) {
  return (dispatch, getState) => {
    dispatch(doLikeStudy(studyId, isFeed));
    const {
      user: { token, isLoggedIn }
    } = getState();
    // 후에 수정 - 비로그인 유저가 라이크 누르면 로그인 페이지로 가도록
    fetch(isLoggedIn ? `/studygroups/${studyId}/likes/` : null, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doUnLikeStudy(studyId, isFeed));
      }
    });
  };
}

function unlikeStudy(studyId, isFeed) {
  return (dispatch, getState) => {
    dispatch(doUnLikeStudy(studyId, isFeed));
    const {
      user: { token }
    } = getState();
    fetch(`/studygroups/${studyId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doLikeStudy(studyId, isFeed));
      }
    });
  };
}

function commentStudy(studyId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/studygroups/${studyId}/comments/`, {
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
          dispatch(addStudyComment(studyId, json));
        }
      });
  };
}

function updateCommentStudy(studyId, commentId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/studygroups/${studyId}/comments/${commentId}/`, {
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
          dispatch(updateStudyComment(studyId, commentId, json));
        }
      });
  };
}

function deleteCommentStudy(studyId, commentId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/studygroups/${studyId}/comments/${commentId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.status === 204) {
        dispatch(deleteStudyComment(studyId, commentId));
      }
    });
  };
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDY_FEED:
      return applySetStudyFeed(state, action);
    case SET_STUDY_DETAIL:
      return applySetStudyDetail(state, action);
    case LIKE_STUDY:
      return applyLikeStudy(state, action);
    case UNLIKE_STUDY:
      return applyUnlikeStudy(state, action);
    case ADD_STUDY_COMMENT:
      return applyAddStudyComment(state, action);
    case UPDATE_STUDY_COMMENT:
      return applyUpdateStudyComment(state, action);
    case DELETE_STUDY_COMMENT:
      return applyDeleteStudyComment(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetStudyFeed(state, action) {
  const { studyFeed } = action;
  return {
    ...state,
    studyFeed
  };
}

function applySetStudyDetail(state, action) {
  const { studyDetail } = action;
  return {
    ...state,
    studyDetail
  };
}

function applyLikeStudy(state, action) {
  const { studyId, isFeed } = action;
  if (isFeed) {
    const { studyFeed } = state;
    const updatedStudyFeed = studyFeed.map(study => {
      if (study.id === studyId) {
        return {
          ...study,
          is_liked: true,
          like_count: study.like_count + 1
        };
      }
      return study;
    });
    return { ...state, studyFeed: updatedStudyFeed };
  } else {
    const { studyDetail } = state;
    const updatedStudyDetail = {
      ...studyDetail,
      like_count: studyDetail.like_count + 1,
      is_liked: true
    };
    return { ...state, studyDetail: updatedStudyDetail };
  }
}

function applyUnlikeStudy(state, action) {
  const { studyId, isFeed } = action;
  if (isFeed) {
    const { studyFeed } = state;
    const updatedStudyFeed = studyFeed.map(study => {
      if (study.id === studyId) {
        return {
          ...study,
          is_liked: false,
          like_count: study.like_count - 1
        };
      }
      return study;
    });
    return { ...state, studyFeed: updatedStudyFeed };
  } else {
    const { studyDetail } = state;
    const updatedStudyDetail = {
      ...studyDetail,
      like_count: studyDetail.like_count - 1,
      is_liked: false
    };
    return { ...state, studyDetail: updatedStudyDetail };
  }
}

function applyAddStudyComment(state, action) {
  const { comment } = action;
  const { studyDetail } = state;
  return {
    ...state,
    studyDetail: {
      ...studyDetail,
      study_comments: [...studyDetail.study_comments, comment]
    }
  };
}

function applyUpdateStudyComment(state, action) {
  const { comment } = action;
  const { studyDetail } = state;
  const updateStudyDetail = {
    ...studyDetail,
    study_comments: studyDetail.study_comments.map(find_comment => {
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
    studyDetail: updateStudyDetail
  };
}

function applyDeleteStudyComment(state, action) {
  const { commentId } = action;
  const { studyDetail } = state;
  const updateStudyDetail = {
    ...studyDetail,
    study_comments: studyDetail.study_comments.filter(
      comment => comment.id !== commentId
    )
  };
  return { ...state, studyDetail: updateStudyDetail };
}

const actionCreators = {
  getStudyFeed,
  getStudyDetail,
  likeStudy,
  unlikeStudy,
  commentStudy,
  updateCommentStudy,
  deleteCommentStudy
};

// exports

export { actionCreators };

// default reducer export

export default reducer;
