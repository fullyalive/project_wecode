// imports

// actions

// action creators

// api actions

function getFeed() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch("/lectures/", {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => response.json())
      .then(json => console.log(json));
  };
}

// initial state

const initialState = {
  feed: []
};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// reducer functions

const actionCreators = {
  getFeed
};

// exports

export { actionCreators };

// default reduer export

export default reducer;
