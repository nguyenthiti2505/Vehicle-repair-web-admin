import { combineReducers } from "redux";
import { userReducer } from "./userRedux/reducer";

const reducers = combineReducers({
  userReducer,
});

export default reducers;
