const initialState = {
  isLogged: false,
  userName: null,
  password: null
};

const loggedReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userName: payload.login,
        password: payload.password,
        isLogged: payload.login !== null && payload.login ? true : false
      };
    default:
      return state;
  }
}

export default loggedReducer;
