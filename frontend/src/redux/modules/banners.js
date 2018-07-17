// imports

import { actionCreators as userActions } from "redux/modules/user";

// actions

const SET_BANNERFEED = "SET_BANNERFEED";

// action creators

function setBannerFeed(bannerFeed) {
  return {
    type: SET_BANNERFEED,
    bannerFeed
  };
}

// API actions

function getBannerFeed() {
  return (dispatch, getState) => {
    const {
      user: { token, isLoggedIn }
    } = getState();
    fetch("/banners/", {
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
    case SET_BANNERFEED:
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
