// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_STUDYFEED = "SET_STUDYFEED";
const SET_STUDYDETAIL = "SET_STUDYDETAIL";
const ADD_STUDYCOMMENTT = "ADD_STUDYCOMMENTT";
const LIKE_STUDY = "LIKE_STUDY";
const UNLIKE_STUDY = "UNLIKE_STUDY";

// action creators

function setStudyFeed(studyFeed) {
  return {
    type: SET_STUDYFEED,
    studyFeed
  };
}

function setStudyDetail(studyDetail) {
  return {
    type: SET_STUDYDETAIL,
    studyDetail
  };
}

function doLikeStudy(studyId) {
  return {
    type: LIKE_STUDY,
    studyId
  };
}

function doUnLikeStudy(studyId) {
  return {
    type: UNLIKE_STUDY,
    studyId
  };
}

function addComment(studyId, comment) {
  return {
    type: ADD_STUDYCOMMENTT,
    studyId,
    comment
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

function likeStudy(studyId) {
  return (dispatch, getState) => {
    dispatch(doLikeStudy(studyId));
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
        dispatch(doUnLikeStudy(studyId));
      }
    });
  };
}

function unlikeStudy(studyId) {
  return (dispatch, getState) => {
    dispatch(doUnLikeStudy(studyId));
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
        dispatch(doLikeStudy(studyId));
      }
    });
  };
}

function commentStudy(studyId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/studygroups/${studyId}/commnets/`, {
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
          dispatch(addComment(studyId, json));
        }
      });
  };
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_STUDYFEED:
      return applySetStudyFeed(state, action);
    case SET_STUDYDETAIL:
      return applySetStudyDetail(state, action);
    case LIKE_STUDY:
      return applyLikeStudy(state, action);
    case UNLIKE_STUDY:
      return applyUnlikeStudy(state, action);
    case ADD_STUDYCOMMENTT:
      return applyAddStudyComment(state, action);
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
  }
}

function applyLikeStudy(state, action) {
  const { studyId } = action;
  const { studyFeed } = state;
  const updatedFeed = studyFeed.map(study => {
    if (study.id === studyId) {
      return { ...study, is_liked: true, like_count: study.like_count + 1 };
    }
    return study;
  });
  return { ...state, studyFeed: updatedFeed };
}

function applyUnlikeStudy(state, action) {
  const { studyId } = action;
  const { studyFeed } = state;
  const updatedFeed = studyFeed.map(study => {
    if (study.id === studyId) {
      return {
        ...study,
        is_liked: false,
        like_count: study.like_count - 1
      };
    }
    return study;
  });
  return { ...state, studyFeed: updatedFeed };
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

const actionCreators = {
  getStudyFeed,
  getStudyDetail,
  likeStudy,
  unlikeStudy,
  commentStudy,
};

// exports

export { actionCreators };

// default reducer export

export default reducer;
