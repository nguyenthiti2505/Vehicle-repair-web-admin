import * as type from "./action";

var initialState = {
  users: [],
};
export const userReducer = (state = initialState, action) => {
  console.log("state", action.data);

  switch (action.type) {
    case type.FETCH_USER:
      return Object.assign({}, state);
    case type.FETCH_USER_SUCCESSED:
      console.log("user", action.payload);
      return { ...state, users: action.data };
    default:
      return state;
  }
};
