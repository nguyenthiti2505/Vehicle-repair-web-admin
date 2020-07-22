import * as Types from './types'

export function loginRequest(prams = null) {
  return {
    type: Types.LOGIN_REQUEST,
    payload: prams
  }
}

export function fetchProfileRequest(prams = null) {
  return {
    type: Types.FETCH_PROFILE_REQUEST,
    payload: prams
  }
}

export function changePasswordRequest(prams = null) {
  return {
    type: Types.CHANGE_PASSWORD_REQUEST,
    payload: prams
  }
}