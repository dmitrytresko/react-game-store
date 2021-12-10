const initialState = {
  isLogged: false,
  userName: '',
  password: '',
  isAdmin: false,
  address: null,
  phone: null,
  cartCount: 0,
  selectedItems: [],
  currentGame: null
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
        cartCount: payload.cartCount,
        selectedItems: payload.selectedItems
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
    case "SET_CART_DATA":
      return {
        ...state,
        cartCount: payload.newCartCount,
        selectedItems: payload.selectedItems
      };
    case "SET_CURRENT_GAME":
      return {
        ...state,
        currentGame: payload.currentGame,
      };
    default:
      return state;
  }
}

export default authReducer;
