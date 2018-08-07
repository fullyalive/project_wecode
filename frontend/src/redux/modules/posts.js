// imports

import { actionCreators as userActions } from "redux/modules/user";
import { push } from "react-router-redux";

// actions

const SET_POST_FEED = "SET_POST_FEED";
const SET_POST_DETAIL = "SET_POST_DETAIL";
const CREATE_POST = "CREATE_POST";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";
const UNLIKE_POST = "UNLIKE_POST";
const ADD_POST_COMMENT = "ADD_POST_COMMENT";
const UPDATE_POST_COMMENT = "UPDATE_POST_COMMENT";
const DELETE_POST_COMMENT = "DELETE_POST_COMMENT";

// action creators

function setPostFeed(postFeed) {
  return {
    type: SET_POST_FEED,
    postFeed
  };
}

function setPostDetail(postDetail) {
  return {
    type: SET_POST_DETAIL,
    postDetail
  };
}

function doCreatePost(title, post_type, description) {
  return {
    type: CREATE_POST,
    title,
    post_type,
    description
  };
}

function doUpdatePost(postId, title, post_type, description) {
  return {
    type: UPDATE_POST,
    postId,
    title,
    post_type,
    description
  };
}

function doDeletePost(postId, title, post_type, description) {
  return {
    type: DELETE_POST,
    postId,
    title,
    post_type,
    description
  };
}

function doLikePost(postId, isFeed) {
  return {
    type: LIKE_POST,
    postId,
    isFeed
  };
}

function doUnlikePost(postId, isFeed) {
  return {
    type: UNLIKE_POST,
    postId,
    isFeed
  };
}

function addPostComment(postId, comment) {
  return {
    type: ADD_POST_COMMENT,
    postId,
    comment
  };
}

function updatePostComment(postId, commentId, comment) {
  return {
    type: UPDATE_POST_COMMENT,
    postId,
    commentId,
    comment
  };
}

function deletePostComment(postId, commentId) {
  return {
    type: DELETE_POST_COMMENT,
    postId,
    commentId
  };
}

// API actions

function getPostFeed(type, page) {
  return async (dispatch, getState) => {
    if (type === "popular") {
      fetch("/posts/popular/", {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          dispatch(setPostFeed(json));
        });
    } else {
      fetch(`/posts/?page=${page}&type=${type}`, {
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(json => {
          dispatch(setPostFeed(json));
        });
    }
  };
}

function getPostDetail(postId) {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch(`/posts/${postId}`, {
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
        dispatch(setPostDetail(json));
      });
  };
}

function createPost(title, post_type, description) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch("/posts/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        post_type,
        description
      })
    })
      .then(response => {
        console.log(response);
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        if (json.description) {
          dispatch(doCreatePost(title, post_type, description));
          dispatch(
            push({
              pathname: `/community/${post_type}/1`,
              state: {
                loading: true
              }
            })
          );
        }
      })
      .catch(err => console.log(err));
  };
}

function updatePost(postId, title, post_type, description) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/posts/${postId}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        post_type,
        description
      })
    })
      .then(response => {
        console.log(response);
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        if (json.description) {
          dispatch(doUpdatePost(title, post_type, description));
          dispatch(
            push({
              pathname: `/community/${post_type}/1`,
              state: {
                loading: true
              }
            })
          );
        }
      })
      .catch(err => console.log(err));
  };
}

function deletePost(postId, title, post_type, description) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/posts/${postId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        console.log(response);
        if (response.status === 401) {
          dispatch(userActions.logout());
        } else {
          dispatch(doDeletePost(postId, title, post_type, description));
          dispatch(
            push({
              pathname: `/community/${post_type}/1`,
              state: {
                loading: true
              }
            })
          );
        }
      })
      .catch(err => console.log(err));
  };
}

function likePost(postId, isFeed) {
  return (dispatch, getState) => {
    dispatch(doLikePost(postId, isFeed));
    const {
      user: { token, isLoggedIn }
    } = getState();
    // 후에 수정 - 비로그인 유저가 라이크 누르면 로그인 페이지로 가도록
    fetch(isLoggedIn ? `/posts/${postId}/likes/` : null, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doUnlikePost(postId, isFeed));
      }
    });
  };
}

function unlikePost(postId, isFeed) {
  return (dispatch, getState) => {
    dispatch(doUnlikePost(postId, isFeed));
    const {
      user: { token }
    } = getState();
    fetch(`/posts/${postId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doLikePost(postId, isFeed));
      }
    });
  };
}

function commentPost(postId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/posts/${postId}/comments/`, {
      // fetch(
      //   isLoggedIn ? `/posts/${postId}/comments/` : `/rest-auth/login/`,
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
          dispatch(addPostComment(postId, json));
          console.log(json.message);
        }
      });
  };
}

function updateCommentPost(postId, commentId, message) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/posts/${postId}/comments/${commentId}/`, {
      // fetch(
      //   isLoggedIn ? `/posts/${postId}/comments/` : `/rest-auth/login/`,
      //   {
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
          dispatch(updatePostComment(postId, commentId, json));
        }
      });
  };
}
function deleteCommentPost(postId, commentId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`/posts/${postId}/comments/${commentId}/`, {
      // fetch(
      //   isLoggedIn ? `/posts/${postId}/comments/` : `/rest-auth/login/`,
      //   {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (response.status === 204) {
        dispatch(deletePostComment(postId, commentId));
      }
    });
  };
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POST_FEED:
      return applySetPostFeed(state, action);
    case SET_POST_DETAIL:
      return applySetPostDetail(state, action);
    case CREATE_POST:
      return applyCreatePost(state, action);
    case UPDATE_POST:
      return applyUpdatePost(state, action);
    case DELETE_POST:
      return applyDeletePost(state, action);
    case LIKE_POST:
      return applyLikePost(state, action);
    case UNLIKE_POST:
      return applyUnlikePost(state, action);
    case ADD_POST_COMMENT:
      return applyAddPostComment(state, action);
    case UPDATE_POST_COMMENT:
      return applyUpdatePostComment(state, action);
    case DELETE_POST_COMMENT:
      return applyDeletePostComment(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetPostFeed(state, action) {
  const { count, next, previous, results } = action.postFeed;
  return {
    ...state,
    count,
    next,
    previous,
    postFeed: results
  };
}

function applySetPostDetail(state, action) {
  const { postDetail } = action;
  return {
    ...state,
    postDetail
  };
}

function applyCreatePost(state, action) {
  const { title, post_type, description } = action;
  return {
    ...state,
    title,
    post_type,
    description
  };
}

function applyUpdatePost(state, action) {
  const { title, post_type, description } = action;
  return {
    ...state,
    postDetail: { title, post_type, description }
  };
}

function applyDeletePost(state, action) {
  return {
    ...state
  };
}

function applyLikePost(state, action) {
  const { postId, isFeed } = action;
  if (isFeed) {
    const { postFeed } = state;
    const updatedPostFeed = postFeed.map(post => {
      if (post.id === postId) {
        return { ...post, is_liked: true, like_count: post.like_count + 1 };
      }
      return post;
    });
    return { ...state, postFeed: updatedPostFeed };
  } else {
    const { postDetail } = state;
    const updatedPostDetail = {
      ...postDetail,
      like_count: postDetail.like_count + 1,
      is_liked: true
    };
    return { ...state, postDetail: updatedPostDetail };
  }
}

function applyUnlikePost(state, action) {
  const { postId, isFeed } = action;
  if (isFeed) {
    const { postFeed } = state;
    const updatedPostFeed = postFeed.map(post => {
      if (post.id === postId) {
        return { ...post, is_liked: false, like_count: post.like_count - 1 };
      }
      return post;
    });
    return { ...state, postFeed: updatedPostFeed };
  } else {
    const { postDetail } = state;
    const updatedPostDetail = {
      ...postDetail,
      like_count: postDetail.like_count - 1,
      is_liked: false
    };
    return { ...state, postDetail: updatedPostDetail };
  }
}

function applyAddPostComment(state, action) {
  const { comment } = action;
  const { postDetail } = state;
  return {
    ...state,
    postDetail: {
      ...postDetail,
      post_comments: [...postDetail.post_comments, comment]
    }
  };
}

function applyUpdatePostComment(state, action) {
  const { comment } = action;
  const { postDetail } = state;
  const updatepostDetail = {
    ...postDetail,
    post_comments: postDetail.post_comments.map(find_comment => {
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
    postDetail: updatepostDetail
  };
}

function applyDeletePostComment(state, action) {
  const { commentId } = action;
  const { postDetail } = state;
  const updatepostDetail = {
    ...postDetail,
    post_comments: postDetail.post_comments.filter(
      comment => comment.id !== commentId
    )
  };
  return {
    ...state,
    postDetail: updatepostDetail
  };
}

const actionCreators = {
  getPostFeed,
  getPostDetail,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  updateCommentPost,
  deleteCommentPost
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
