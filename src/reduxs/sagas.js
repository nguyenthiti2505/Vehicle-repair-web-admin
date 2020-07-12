import { all } from "redux-saga/effects";
import { watchUsersSaga } from "./userRedux/saga";

export default function* rootSaga() {
  yield all([...watchUsersSaga]);
}
