import * as Types from './types'

export function fetchUsers(prams = {}) {
  return {
    type: Types.FETCH_USERS_REQUEST,
    payload: prams
  }
}