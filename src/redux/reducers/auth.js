const initialState = {
  isLogged: false,
  userName: '',
  password: '',
  isAdmin: false,
  address: null,
  phone: null,
  cartCount: 0,
  selectedItems: []
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case "SET_USER_DATA":
      return {
        ...state,
        isLogged: payload.login !== null && payload.login ? true : false,
        userName: payload.login,
        password: payload.password,
        isAdmin: payload.login !== null && payload.login.includes('admin') ? true : false,
        address: payload.address,
        phone: payload.phone,
      };
    case "SET_NEW_PASSWORD":
      return {
        ...state,
        password: payload.newPassword
      };
    case "SET_NEW_LOGIN":
      return {
        ...state,
        userName: payload.newLogin
      };
    case "SET_ADDITIONAL_INFO":
      return {
        ...state,
        address: payload.address,
        phone: payload.phone
      };
    case "SET_CART_COUNT":
      return {
        ...state,
        cartCount: payload.newCartCount
      };
    case "SET_SELECTED_ITEMS":
      return {
        ...state,
        selectedItems: payload.selectedItems
      }
    default:
      return state;
  }
}

export default authReducer;
