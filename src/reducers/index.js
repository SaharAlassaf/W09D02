import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import sign from "./sign";
import task from "./task";

const reducers = combineReducers({ sign });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
