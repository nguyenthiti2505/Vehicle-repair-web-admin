import { combineReducers } from "redux";
import { authReducer } from "./authRedux/reducer";
import { stationReducer } from "./stationRedux/reducer";
import { userReducer } from "./userRedux/reducer";
import { changeState } from "./appRedux/reducer";
import { orderReducer } from "./orderRedux/reducer";

export default combineReducers({
  auth: authReducer,
  app: changeState,
  user: userReducer,
  station: stationReducer,
  order: orderReducer,
});
