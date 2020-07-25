import { all } from 'redux-saga/effects'
import { watchStationSaga } from './stationRedux/sagas'
import { watchUserSaga } from './userRedux/sagas'
import { watchAuthSaga } from './authRedux/sagas';

export default function* rootSaga() {
  yield all([
    ...watchStationSaga,
    ...watchUserSaga,
    ...watchAuthSaga
  ]);
}