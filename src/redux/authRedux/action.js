import * as Types from './types'

export function fetchStations(prams = null) {
  return {
    type: Types.FETCH_AUTH_REQUEST,
    payload: prams
  }
}