import { put, takeLatest } from 'redux-saga/effects'
import * as Types from './types'
import { callApi } from '../../utils/apiCaller'

function* fetchStationsSaga({ payload }) {
  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNWE2Y2FlMzAtZmUyOS00MDZhLWJlYTgtZjM0MTFlODcxNzMzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU1ODI4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.xbHaI2XcaoHPDSh24NrJwe_c9WY9Cv8ZLJA7j6CNsKA"
    const response = yield callApi('stations', 'GET', null, token)
    yield put({ type: Types.FETCH_STATIONS_SUCCEEDED, payload: response.data })
  } catch (error) {
    console.log("function*fetchStationsSaga -> error", error)
    yield put({ type: Types.FETCH_STATIONS_FAILED })
  }
}

export const watchStationSaga = [
  takeLatest(Types.FETCH_STATIONS_REQUEST, fetchStationsSaga)
]