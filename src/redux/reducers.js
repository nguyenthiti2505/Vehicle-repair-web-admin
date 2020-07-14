import { combineReducers } from 'redux';
import { stationReducer } from './stationRedux/reducer'
import { userReducer } from './userRedux/reducer'
import { changeState } from './appRedux/reducer'

export default combineReducers({
  user: userReducer,
  station: stationReducer,
  app: changeState
})