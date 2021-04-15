const initialState = {
  isLogged: false,
  userName: null,
  password: null
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userName: payload.login,
        password: payload.password,
        isLogged: payload.login !== null && payload.login ? true : false
      };
    case "SET_NEW_PASSWORD":
      return {
        ...state,
        password: payload.newPassword
      }
    case "SET_NEW_LOGIN":
      return {
        ...state,
        userName: payload.newLogin
      }
    default:
      return state;
  }
}

export default authReducer;
