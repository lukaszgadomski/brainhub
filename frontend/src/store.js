import { createStore, combineReducers } from "redux";
import { reducer } from "redux-form";

export default createStore(combineReducers({ form: reducer }));
