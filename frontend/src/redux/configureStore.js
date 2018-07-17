import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "redux/modules/user";
import banners from "redux/modules/banners";
import lectures from "redux/modules/lectures";
import studygroups from "redux/modules/studygroups";
import { i18nState } from "redux-i18n";

const env = process.env.NODE_ENV;

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  user,
  banners,
  lectures,
  studygroups,
  routing: routerReducer,
  i18nState
});

let store = initialState =>
  createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

export { history };

export default store();
