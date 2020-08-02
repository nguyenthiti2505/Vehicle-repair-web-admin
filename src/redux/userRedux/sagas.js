import { put, takeLatest } from "redux-saga/effects";
import * as Types from "./types";
import { callApi } from "../../utils/apiCaller";

function* fetchUersSaga({ payload }) {
  try {
    const { pageIndex, pageSize, fromDate, toDate } = payload;
    const token = localStorage.getItem("_token");
    let url = `dashboard/users?offset=${pageIndex || 1}&limit=${
      pageSize || 10
    }`;
    if (fromDate && toDate) {
      url += `&fromDate=${fromDate}&toDate=${toDate}`;
    }
    const response = yield callApi(url, "GET", null, token);
    yield put({ type: Types.FETCH_USERS_SUCCEEDED, payload: response.data });
  } catch (error) {
    yield put({ type: Types.FETCH_USERS_FAILED, payload: {} });
  }
}

export const watchUserSaga = [
  takeLatest(Types.FETCH_USERS_REQUEST, fetchUersSaga),
];
