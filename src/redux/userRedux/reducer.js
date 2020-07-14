import * as Types from './types'

const initialSate = {
  fetching: false,
  data: null,
  errors: [],
  message: ''
}

export const userReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Types.FETCH_USERS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case Types.FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        fetching: false
      }
    case Types.FETCH_USERS_FAILED:
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