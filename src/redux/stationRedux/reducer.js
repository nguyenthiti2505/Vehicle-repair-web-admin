import * as Types from './types'

const initialSate = {
  fetching: false,
  data: null,
  errors: [],
  message: ''
}

export const stationReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Types.FETCH_STATIONS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case Types.FETCH_STATIONS_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        fetching: false
      }
    case Types.FETCH_STATIONS_FAILED:
      return {
        ...state,
        errors: action.payload.errors || [],
        message: action.payload.message || "",
        fetching: false
      }
    default:
      return state
  }
}