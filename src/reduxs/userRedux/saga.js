import callAPI from "../../utils/callAPI";
import { put, takeLatest, call } from "redux-saga/effects";
import * as types from "./action";

export function* fetchUser() {
  try {
    var users = yield call(() =>
      callAPI(
        "api/account/users",
        "GET",
        null,
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiOWRmNGFjYTctYzE0MC00YTI4LWJlYzctZDliYjk2NGJiZjQxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTQxNzM1MjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.EsBsD1YrAq8OGwqXvxwiauJIao9cHfZnYqMase5xFZw"
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTE1OTgxMTEwIiwianRpIjoiNjI2NWI3ZmUtZDI1Zi00NTIwLWI2YTQtMjMxMjY4YjA3ZDA1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIwOTE1OTgxMTEwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXIgQWRtaW4iLCJleHAiOjE1OTU4NDc2OTIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzMzMSJ9.15JytNoC3R8ccMUKXYrqwowv74eTDpqDJ4hpotbdip8"
      )
    );
    console.log("DATA saga", users.data.sources);
    yield put(types.fetchUserSuccess(users.data.sources));
  } catch (error) {
    console.log("Error", error);
  }
}

export const watchUsersSaga = [takeLatest("FETCH_USER", fetchUser)];
