export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESSED = "FETCH_USER_SUCCESSED";
export const FETCH_USER_FAILED = "FETCH_USER_FAILED";

export const fetchUser = () => {
  return { type: FETCH_USER };
};

export const fetchUserSuccess = (data) => {
  console.log("data222222222", data);
  return {
    type: FETCH_USER_SUCCESSED,
    data,
  };
};
