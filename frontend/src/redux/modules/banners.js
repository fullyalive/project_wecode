// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_BANNER_FEED = "SET_BANNER_FEED";

// action creators

function setBannerFeed(bannerFeed) {
  return {
    type: SET_BANNER_FEED,
    bannerFeed
  };
}

// API actions

function getBannerFeed() {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch("/api/banners/", {
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
        dispatch(setBannerFeed(json));
      });
  };
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BANNER_FEED:
      return applySetBannerFeed(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetBannerFeed(state, action) {
  const { bannerFeed } = action;
  return {
    ...state,
    bannerFeed
  };
}

const actionCreators = {
  getBannerFeed
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
