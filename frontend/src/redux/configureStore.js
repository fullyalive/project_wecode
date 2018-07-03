import { createStore, combineReducers } from "redux";
import users from "./modules/users";

const reducer = combineReducers({
  users
});

let store = initialStore => createStore(reducer);

export default store();
