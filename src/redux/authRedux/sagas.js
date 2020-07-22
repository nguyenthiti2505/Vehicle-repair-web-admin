import { put, takeLatest } from 'redux-saga/effects'
import * as Types from './types'
import { callApi } from '../../utils/apiCaller'
// import { fetchProfileRequest } from './actions'

function* loginAsync({ payload }) {
  try {
    const { phoneNumber, password } = payload
    const response = yield callApi('account/login', 'POST', { phoneNumber, password })
    const token = response.data
    localStorage.setItem("_token", token)
    yield put({ type: Types.LOGIN_SUCCEEDED, payload: { token } })
    // yield put(fetchProfileRequest())
  } catch (error) {
    yield put({ type: Types.LOGIN_FAILED, payload: { message: error?.response?.data || "Có lỗi xảy ra, vui lòng thử lại" } })
  }
}

function* fetchProfileAsync() {
  try {
    const token = localStorage.getItem("_token")
    if (token) {
      const response = yield callApi(`account/me`, 'GET', null, token)
      const user = response.data
      localStorage.setItem("_user", JSON.stringify(user))
      yield put({ type: Types.FETCH_PROFILE_SUCCEEDED, payload: { user } })
    } else {
      yield put({ type: Types.FETCH_PROFILE_FAILED, payload: { message: "Token not found or expried" } })
    }
  } catch (error) {
    localStorage.removeItem("_token")
    localStorage.removeItem("_user")
    yield put({ type: Types.FETCH_PROFILE_FAILED, payload: { message: "Token not found or expried" } })
  }
}

export const watchAuthSaga = [
  takeLatest(Types.LOGIN_REQUEST, loginAsync),
  takeLatest(Types.FETCH_PROFILE_REQUEST, fetchProfileAsync)
]