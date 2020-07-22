import { put, takeLatest } from 'redux-saga/effects'
import * as Types from './types'
import { callApi } from '../../utils/apiCaller'

function* fetchOrdersSaga({ payload }) {
  try {
    const { pageIndex, pageSize, fromDate, toDate } = payload
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNWE2Y2FlMzAtZmUyOS00MDZhLWJlYTgtZjM0MTFlODcxNzMzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU1ODI4MzcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.xbHaI2XcaoHPDSh24NrJwe_c9WY9Cv8ZLJA7j6CNsKA"

    let url = `dashboard/order?offset=${pageIndex || 1}&limit=${pageSize || 10}`

    if (fromDate && toDate) {
      url += `&fromDate=${fromDate}&toDate=${toDate}`
      
    }
    const response = yield callApi(url, 'GET', null, token)
    yield put({ type: Types.FETCH_ORDERS_SUCCEEDED, payload: response.data })
  } catch (error) {
    console.log("function*fetchOrdersSaga -> error", error)
    yield put({ type: Types.FETCH_ORDERS_FAILED, payload: {} })
  }
}

export const watchStationSaga = [
  takeLatest(Types.FETCH_ORDERS_REQUEST, fetchOrdersSaga)
]