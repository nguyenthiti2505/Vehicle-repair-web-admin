import * as Types from './types'

const initialSate = {
  loading: false,
  token: "",
  user: null,
  message: ''
}

export const authReducer = (state = initialSate, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...initialSate,
        loading: true
      }
    case Types.LOGIN_SUCCEEDED:
      return {
        ...initialSate,
        token: action.payload.token,
        loading: false
      }
    case Types.LOGIN_FAILED:
      return {
        ...initialSate,
        message: action.payload.message,
        loading: false
      }

    case Types.FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case Types.FETCH_PROFILE_SUCCEEDED:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      }
    case Types.FETCH_PROFILE_FAILED:
      return {
        ...initialSate,
        message: action.payload.message,
        loading: false
      }
    case Types.LOGOUT:
      return {
        ...initialSate
      }
    default:
      return state
  }
}