export const SET_USER_DATA = "SET_USER_DATA";
export const SET_NEW_PASSWORD = "SET_NEW_PASSWORD";
export const SET_NEW_LOGIN = "SET_NEW_LOGIN";
export const SET_ADDITIONAL_INFO = "SET_ADDITIONAL_INFO";

export const setUserData = payload => ({
  type: SET_USER_DATA,
  payload
});

export const setNewPassword = payload => ({
  type: SET_NEW_PASSWORD,
  payload
});

export const setNewLogin = payload => ({
  type: SET_NEW_LOGIN,
  payload
});

export const setAdditionalInfo = payload => ({
  type: SET_ADDITIONAL_INFO,
  payload
});


