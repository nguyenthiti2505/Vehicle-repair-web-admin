import * as Types from './types'

export function loginRequest(prams = {}) {
  return {
    type: Types.LOGIN_REQUEST,
    payload: prams
  }
}

export function fetchProfileRequest(prams = {}) {
  return {
    type: Types.FETCH_PROFILE_REQUEST,
    payload: prams
  }
}

export function changePasswordRequest(prams = {}) {
  return {
    type: Types.CHANGE_PASSWORD_REQUEST,
    payload: prams
  }
}

export function logoutRequest(prams = {}) {
  return {
    type: Types.LOGOUT,
    payload: prams
  }
}