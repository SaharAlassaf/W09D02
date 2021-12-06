import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import sign from "./sign";
import tasks from "./tasks";

const reducers = combineReducers({ sign, tasks });

const store = () => {
  return createStore(reducers, composeWithDevTools());
};

export default store();
