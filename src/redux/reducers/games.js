const initialState = {
  gamesArr: []
};

const gamesReducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case "SET_GAMES_DATA":
      return {
        ...state,
        gamesArr: payload.gamesArr
      };
    default:
      return state;
  }
}

export default gamesReducer;
