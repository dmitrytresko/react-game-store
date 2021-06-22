export const SET_USER_DATA = "SET_USER_DATA";
export const SET_NEW_PASSWORD = "SET_NEW_PASSWORD";
export const SET_NEW_LOGIN = "SET_NEW_LOGIN";
export const SET_ADDITIONAL_INFO = "SET_ADDITIONAL_INFO";
export const SET_CART_DATA = "SET_CART_DATA";
// export const SET_CART_COUNT = "SET_CART_COUNT";
// export const SET_SELECTED_ITEMS = "SET_SELECTED_ITEMS";

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

export const setCartData = payload => ({
  type: SET_CART_DATA,
  payload
});

// export const setCartCount = payload => ({
//   type: SET_CART_COUNT,
//   payload
// });

// export const setSelectedItems = payload => ({
//   type: SET_SELECTED_ITEMS,
//   payload
// });


