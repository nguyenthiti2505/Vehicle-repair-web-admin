import * as Types from './types'

const initialSate = {
  fetching: false,
  data: null,
  errors: [],
  message: ''
}

export const authReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case Types.LOGIN_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        fetching: false
      }
    case Types.LOGIN_FAILED:
      return {
        ...state,
        errors: action.payload.errors || [],
        message: action.payload.message || "",
        fetching: false
      }

    case Types.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case Types.FETCH_PROFILE_SUCCEEDED:
      return {
        ...state,
        data: action.payload,
        fetching: false
      }
    case Types.FETCH_PROFILE_FAILED:
      return {
        ...state,
        errors: action.payload.errors || [],
        message: action.payload.message || "",
        fetching: false
      }
    
      case Types.CHANGE_PASSWORD_REQUEST:
        return {
          ...state,
          fetching: true
        }
      case Types.CHANGE_PASSWORD_SUCCEEDED:
        return {
          ...state,
          data: action.payload,
          fetching: false
        }
      case Types.CHANGE_PASSWORD_FAILED:
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